import { useState } from "react";
import type { EmployeesDepartments } from "../../apis/employeesAndDepartments";
import { employees } from "../../apis/employeesAndDepartments"
import { AddEmployeeForm } from "../addEmployeeForm/addEmployee";
import { addEmployee as addEmployeeService } from "../../services/employeeService";
import { fetchEmployeesByDepartments } from "../../apis/employeeRepository";


function EmployeeList() {
    const [employeeList, setEmployeeList] = useState<EmployeesDepartments[]>(employees);

    const departments = fetchEmployeesByDepartments(employeeList);

    const addEmployee = async (
        employee: EmployeesDepartments
    ): Promise<string | EmployeesDepartments> => {

        const result = await addEmployeeService(employee);

        if (typeof result === "string") {
            return result;
        }

        setEmployeeList(prev => [...prev, result]);
        return result;
    };

    return(
        <>
              {/*Add Form here*/}
            <AddEmployeeForm
                departments={Object.keys(departments)}
                addEmployee={addEmployee}
            />

            {/* Key: Departments with an array of employees to be displayed in a list*/}
            {Object.entries(departments).map(([departmentName, employees]) => (
                <section className="department" key={departmentName}>
                    <h2>{departmentName}</h2>
                    <ul>
                        {employees.map(name => (
                            <li key={name}>{name}</li>
                        ))}
                    </ul>
                </section>
            ))}

        </>
    );
}

export default EmployeeList;