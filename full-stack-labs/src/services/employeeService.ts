import { createEmployee, fetchAllEmployees, fetchEmployeesByDepartments } from "../apis/employeeRepository";
import type { EmployeesDepartments } from "../apis/employeesAndDepartments";
import type { Validation } from "../hooks/useFormInput";


/**
 * Function to validate the name input for the form business logic
 * @param name - Name input from form
 * @returns - True is valid
 */
export const validateName = (name: string): Validation => {
        if (name.length < 3) {
            return { isValid: false, message: "Name must be at least 3 characters." };
        }
        return { isValid: true };
    }

/**
 * This is a function to validate the department selection from the form
 * @param department - Department input
 * @returns True if valid
 */
export const validateDepartment = (department: string): Validation => {
        const allEmployees = fetchAllEmployees();

        const departmentCheck = fetchEmployeesByDepartments(allEmployees);
        const validDepartments = Object.keys(departmentCheck);

        if (department === "" || !validDepartments.includes(department)) {
            return { isValid: false, message: "Please select a valid department." };
        }
        return { isValid: true };
}


/**
 * Function to validate the employee that will be added
 * @param name -input field value from form
 * @param department - input field value from form
 * @returns null if all valid
 */
export function validateEmployee(
    name: string,
    department: string
): string | null {
    const nameCheck = validateName(name);
    if (!nameCheck.isValid) {
        return nameCheck.message ?? "Invalid Name";
    }

    const deptCheck = validateDepartment(department);
    if (!deptCheck.isValid) {
        return deptCheck.message ?? "Invalid Department";
    }
    
     return null;
    
}


/**
 * Function to add an Employee to a list
 * @param employee - The employee to be added to their correct department
 * @returns -The created employee to the component
 */
export async function addEmployee(
    employee: EmployeesDepartments
): Promise<EmployeesDepartments | string> {
    const error = validateEmployee(employee.name, employee.department);

    if(error){
        return error;
    }

    const createdEmployee = await createEmployee(employee);
    return createdEmployee;

}
