import type { FrontendRole as Role } from "@shared/types/frontend-Role";
import { organizationData } from "../apis/leadershipManagement";
import type { Validation } from "../hooks/useFormInput";
import { createPerson } from "../apis/organizationRepo";

/**
 * This function validates first name to ensure its longer then 3 characters.
 * @param firstName - The first name text input
 * @returns - True is valid 
 */
export const validateFirstName = (firstName: string): Validation => {
    if(firstName.length < 3) {
        return {isValid: false, message: " First name must be longer than 3 characters."};
    }
    return {isValid: true};
}

/**
 * This function validates last name to ensure it is not blank.
 * @param lastName - The last name text input
 * @returns - True is valid
 */
export const validateLastName = (lastName: string): Validation => {
    if(!lastName) {
        return {isValid: false, message: "Last name cannot be blank"};
    }
    return { isValid: true};
}

export const validateRole = (
    role: string,
    organizationData: Role[]
): Validation => {
    if(!role.trim()) {
        return {isValid: false, message: "Role cannot be blank."}
    }

    const normalize = (role:string) => role.toLowerCase().trim();
    const normalizedRole = normalize(role);

    const isAlreadyOccupied = organizationData.some(
        (person) => normalize(person.role).includes(normalizedRole)
    );
    if(isAlreadyOccupied) {
        return {
            isValid: false,
            message: `The role ${role} is already occupied.`
        };
    }

    return {isValid: true};
}

/**
 * Function to validate the person that will be added to the organization.
 * @param newPerson - new person to be added to the organization
 * @returns - null is all valid
 */
export function validatePerson(
    newPerson: Role
): string | null {
    const { firstName, lastName, role } = newPerson;

    const firstNameCheck = validateFirstName(firstName);
    if(!firstNameCheck.isValid) {
        return firstNameCheck.message ?? "Invalid First Name";
    }

    const lastNameCheck = validateLastName(lastName);
    if(!lastNameCheck.isValid) {
        return lastNameCheck.message ?? "Invalid Last Name."
    }

    const roleCheck = validateRole(role, organizationData);
    if(!roleCheck.isValid) {
        return roleCheck.message ?? "Invalid Role."
    }

    return null;
}

/**
 * Function to add a person to a list of persons in the organization.
 * @param person - The person to be added to the organization
 * @returns - The new created person in the organization data
 */
export async function AddPersonToOrganization(
    person: Omit<Role, "id">
): Promise<Role | string> {
    const error = validatePerson(person);

    if(error) {
        return error;
    }

    const createdPerson = await createPerson(person);
    return createdPerson;
}