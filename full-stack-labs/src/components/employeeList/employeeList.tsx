import { useState } from "react";
import type { EmployeesDepartments } from "../../apis/employeesAndDepartments";
import { employees } from "../../apis/employeesAndDepartments"
import { AddEmployeeForm } from "../addEmployeeForm/addEmployee";

type Departments = Record<string, string[]>;

function EmployeeList() {
    const [employeeList, setEmployeeList] = useState<EmployeesDepartments[]>(employees);


    const departments: Departments = {};
    employeeList.forEach(employee => {
        if(!departments[employee.department]) {
            //makes empty array
            departments[employee.department] = [];
        }
        // Adds each employee to their designated department
        departments[employee.department].push(employee.name)
    });

    const addEmployee = (employee:EmployeesDepartments): void => {
        setEmployeeList((prev) => [...prev, employee]);
    }

    return(
        <>
              {/*Add Form here*/}
            <AddEmployeeForm
                departments={Object.keys(departments)}
                addEmployee={addEmployee}
            />

            {/* Key: Departments with an array of employees to be displayed in a list*/}
            {Object.entries(departments).map(([departmentName, names]) => (
                <section className="department" key={departmentName}>
                    <h2>{departmentName}</h2>
                    <ul>
                        {names.map(name => (
                            <li key={name}>{name}</li>
                        ))}
                    </ul>
                </section>
            ))}

        </>
    );
}

export default EmployeeList;