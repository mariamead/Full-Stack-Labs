import type { FrontendEmployeeDepartments } from "../../../../../../shared/types/frontend-EmployeeDepartments";
import { employees } from "../../../data/employeesAndDepartments";

export const getAllEmployees = async(): Promise<FrontendEmployeeDepartments[]> => {
    
    return structuredClone(employees);
}

export const createEmployee = async(employeeData: {
    name: string,
    department: string
}): Promise<FrontendEmployeeDepartments> => {
    try {
    // assign an ID dynamically
    const newEmployee: FrontendEmployeeDepartments = {
      id: (employees.length + 1).toString(),
      ...employeeData
    };

    // add to local "database"
    employees.push(newEmployee);

    return structuredClone(newEmployee);
  } catch (error: unknown) {
    throw error;
  }
    
}