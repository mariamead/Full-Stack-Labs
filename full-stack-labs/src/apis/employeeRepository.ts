import { employees } from "./employeesAndDepartments";
import type { EmployeesDepartments } from "./employeesAndDepartments";

type Departments = Record<string, string[]>;

export function fetchAllEmployees(): EmployeesDepartments[] {
    return[...employees];
}

//Grouping data here: Employees by their departments 
export async function fetchEmployeesByDepartments(): Promise<Departments> {
    const departments: Departments = {};

    employees.forEach(employee => {
        if(!departments[employee.department]) {
            //makes empty array
            departments[employee.department] = [];
        }
        // Adds each employee to their designated department
        departments[employee.department].push(employee.name)
    });
    return departments;
}

export async function createEmployee(
    newEmployee: EmployeesDepartments
): Promise<EmployeesDepartments> {
    if(employees.some(employee => employee.name === newEmployee.name)) {
        throw new Error("Employee already exists.")
    } else {
        employees.push(newEmployee);
    }

    return newEmployee; 
}