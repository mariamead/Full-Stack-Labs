import { useState } from "react";
import type { FrontendEmployeeDepartments as EmployeesDepartments } from "@shared/types/frontend-EmployeeDepartments";
import { employees } from "../../apis/employeesAndDepartments"
import { AddEmployeeForm } from "../addEmployeeForm/addEmployee";
import { addEmployee as addEmployeeService } from "../../services/employeeService";

type Departments = Record<string, string[]>;

function EmployeeList() {
    const [employeeList, setEmployeeList] = useState<EmployeesDepartments[]>(employees);

    const departments: Departments = {};
    employeeList.forEach(employee => {
        if(!departments[employee.department]) {
            //makes empty array
            departments[employee.department] = [];
        }
        departments[employee.department].push(employee.name);
    });
    

    const addEmployee = async (
        employee: EmployeesDepartments
    ): Promise<string | EmployeesDepartments> => {
        try{
            const result = await addEmployeeService(employee);

            if (typeof result === "string") {
                return result;
            }

            setEmployeeList(prev => [
                ...prev.filter(
                    employee => 
                        employee.name !== result.name || employee.department !== result.department),
                    {...result }
            ]);


            return result;
            
        } catch (error: unknown) {
            if (error instanceof Error) {
                return error.message;
            }
            return "An unexpected error occurred";
        }
    };

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