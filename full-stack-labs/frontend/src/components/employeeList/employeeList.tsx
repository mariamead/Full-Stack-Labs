import { useState, useEffect } from "react";
import type { FrontendEmployeeDepartments as EmployeesDepartments } from "@shared/types/frontend-EmployeeDepartments";
import { employees } from "../../../../backend/src/data/employeesAndDepartments";
import { AddEmployeeForm } from "../addEmployeeForm/addEmployee";
import { addEmployee as addEmployeeService } from "../../services/employeeService";
import { fetchAllEmployees } from "../../apis/employeeRepository";

type Departments = Record<string, string[]>;

function EmployeeList() {
    const [employeeList, setEmployeeList] = useState<EmployeesDepartments[]>(employees);

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
    
    const addEmployee = async (
        employee: EmployeesDepartments
    ): Promise<string | EmployeesDepartments> => {
        try{
            const result = await addEmployeeService(employee);

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
    employeeList.forEach(employee => {;
        if(!departments[employee.department]) {
            //makes empty array
            departments[employee.department] = [];
        }
        departments[employee.department].push(employee.name);
    });

    return(
        <>
              {/*Add Form here*/}
            <AddEmployeeForm
                EmployeeList={employeeList}
                addEmployee={addEmployee}
                departments={Object.keys(departments)}
            />

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