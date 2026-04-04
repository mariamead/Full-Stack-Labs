import { useState, useEffect } from "react";
import type { FrontendEmployeeDepartments as EmployeesDepartments } from "@shared/types/frontend-EmployeeDepartments";
import { employees } from "../../../../backend/src/data/employeesAndDepartments";
import { AddEmployeeForm } from "../addEmployeeForm/addEmployee";
import { addEmployee as addEmployeeService } from "../../services/employeeService";
import { fetchAllEmployees } from "../../apis/employeeRepository";
import { useAuth } from "@clerk/clerk-react";

type Departments = Record<string, string[]>;

function EmployeeList() {
    const [employeeList, setEmployeeList] = useState<EmployeesDepartments[]>(employees);
    const { isSignedIn, isLoaded, getToken } = useAuth();

    useEffect(() => {
        console.log("useEffect running to fetch employees");
        const loadEmployees = async () => {
        try {
            const data = await fetchAllEmployees();
            setEmployeeList(data);
        } catch (error) {
            console.error("Failed to fetch employees:", error);
        }
        };
        loadEmployees();
    }, []);

    if (!isLoaded) return <div> Loading....</div>;
    
    const addEmployee = async (
        employee: EmployeesDepartments
    ): Promise<string | EmployeesDepartments> => {
        try{
            if ( !isSignedIn) return "You must be signed in";

            const token = await getToken();
            if(!token) throw new Error("User is not authenticated.")

            const result = await addEmployeeService(employee, token);

            if (typeof result === "string") {
                return result;
            }

            //setEmployeeList(prev => [...prev, result]);
            setEmployeeList(prev => [...prev, result]);

            return result;
            
        } catch (error: unknown) {
            if (error instanceof Error) {
                return error.message;
            }
            return "An unexpected error occurred";
        }
    };

    // Grouping employees by department
    const departments: Departments = {};
    employeeList
    .filter(employee => employee.department &&
         employee.department.trim() !== "" &&
        employee.department.toLowerCase() !== "unassigned")
    .forEach(employee => {;
        if(!departments[employee.department]) {
            //makes empty array
            departments[employee.department] = [];
        }
        departments[employee.department].push(employee.name);
    });

    return(
        <>
            {isSignedIn ? (
                <AddEmployeeForm
                    EmployeeList={employeeList}
                    addEmployee={addEmployee}
                    departments={Object.keys(departments)}
                />
            ): (
                <div className="login-to-add">
                    <p>Please Login To Add Employees</p>
                </div>
            )}
    
            {/* Key: Departments with an array of employees to be displayed in a list*/}
            {Object.entries(departments).map(([departmentName, employees]) => (
                <section className="department" key={departmentName}>
                    <h2>{departmentName}</h2>
                    <ul>
                        {employees.map((name) => (
                            <li key={`${name}-${departmentName}`}>{name}</li>
                        ))}
                    </ul>
                </section>
            ))}

        </>
    );
}

export default EmployeeList;