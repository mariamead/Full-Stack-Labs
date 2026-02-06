import { createEmployee } from "../apis/employeeRepository";
import type { EmployeesDepartments } from "../apis/employeesAndDepartments";

export function validateEmployee(
    name: string,
    department: string
): string | null {
    if (name.length < 3) {
        return "Name must be at least 3 characters.";
    }

    if(!department.includes(department)) {
        return "Please select a valid department.";
    }
    return null;
}

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
