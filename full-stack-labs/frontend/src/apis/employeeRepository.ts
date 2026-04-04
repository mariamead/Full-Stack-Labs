import type { FrontendEmployeeDepartments as EmployeesDepartments } from "@shared/types/frontend-EmployeeDepartments";

type EmployeeDepartmentsResponseJSON = {message: String, data: EmployeesDepartments[]};
type EmployeeDepartmentResponseJSON = {message: String, data: EmployeesDepartments};


// Base url for backend
// Vite provides this value from the .env file rather than dotenv package
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const EMPLOYEES_ENDPOINT = "/employees";

export async function fetchAllEmployees(sessionToken? : string | null): Promise<EmployeesDepartments[]> {
    const employeeResponse: Response = await fetch(
        `${BASE_URL}${EMPLOYEES_ENDPOINT}`, 
        sessionToken? {
            headers: {
                Authorization: `Bearer ${sessionToken}`,
            }
        } : undefined
    );

    if(!employeeResponse.ok) {
        throw new Error("Failed to fetch employees.")
    }

    const json: EmployeeDepartmentsResponseJSON = await employeeResponse.json();
    return json.data;
}


export async function createEmployee(
    newEmployee: EmployeesDepartments,
    sessionToken: string
): Promise<EmployeesDepartments> {
    const newEmployeeResponse: Response = await fetch(
        `${BASE_URL}${EMPLOYEES_ENDPOINT}`,
        {
            method: "POST",
            body: JSON.stringify({...newEmployee}),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionToken}`
            }
        }
    )
    const json: EmployeeDepartmentResponseJSON = await newEmployeeResponse.json();
    return json.data; 
}