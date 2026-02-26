import { employees } from "./employeesAndDepartments";
import type { EmployeesDepartments } from "./employeesAndDepartments";


export function fetchAllEmployees(): EmployeesDepartments[] {
    return structuredClone(employees);
}


export async function createEmployee(
    newEmployee: EmployeesDepartments
): Promise<EmployeesDepartments> {
    if(employees.some(employee => employee.name === newEmployee.name)) {
        throw new Error("Employee already exists.");
    } else {
        employees.push(newEmployee);
    }

    return structuredClone(newEmployee); 
}