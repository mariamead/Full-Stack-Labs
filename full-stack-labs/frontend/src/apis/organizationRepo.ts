import type { FrontendRole as Role } from "@shared/types/frontend-Role";

type RolesResponseJSON = {message: String, data: Role[]};
type RoleResponseJSON = {message: String, data: Role};


// Base url for backend
// Vite provides this value from the .env file rather than dotenv package
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const ROLES_ENDPOINT = "/roles"

export async function fetchAllOrganization(): Promise<Role[]> {
    const roleResponse: Response = await fetch(
        `${BASE_URL}${ROLES_ENDPOINT}`
    );

    if(!roleResponse.ok) {
        throw new Error("Failed to fetch roles.")
    }

    const json: RolesResponseJSON = await roleResponse.json();
    return json.data;
}


export async function createPerson(
    newPerson: Role
): Promise<Role> {
    const newRoleResponse: Response = await fetch(
        `${BASE_URL}${ROLES_ENDPOINT}`,
        {
            method: "POST",
            body: JSON.stringify({...newPerson}),
            headers: {
                "Content-Type": "application/json",
            }
        }
    )
    const json: RoleResponseJSON = await newRoleResponse.json();
    return json.data; 
}

