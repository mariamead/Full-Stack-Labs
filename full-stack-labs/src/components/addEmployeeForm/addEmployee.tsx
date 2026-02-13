import type { EmployeesDepartments } from "../../apis/employeesAndDepartments";
import { useFormInput } from "../../hooks/useFormInput";
import "./addEmployee.css"
import {validateDepartment, validateName} from "../../services/employeeService";

export function AddEmployeeForm({
    departments,
    EmployeeList,
    addEmployee,
}: {
    departments: string[];
    EmployeeList: EmployeesDepartments[],
    addEmployee: (employee: EmployeesDepartments) => Promise<string | EmployeesDepartments | null>;
}) {
    const name = useFormInput(validateName);
    const department = useFormInput(validateDepartment);

    const formSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validateName = name.validateForm();
        const validateDepartment = department.validateForm();

        name.setMessage(validateName.message ?? null);
        department.setMessage(validateDepartment.message ?? null);

        if(!validateName.isValid || !validateDepartment.isValid) {
            return;
        }
        const duplicate = EmployeeList.some(
            emp => emp.name === name.value 
        )

        if(duplicate) {
            name.setMessage(`Employee ${name.value} already exists.`);
            return;
        }
       
        await addEmployee(
            {name: name.value, department: department.value},
        );

        name.setValue("");
        department.setValue("");
    };

    return(
        <form onSubmit={formSubmit} className="addEmployee">
            <h3>Add Employee</h3>
            <div className="inputField">
                <label>Employee Name:</label>
                    <input
                        type="text"
                        className="textbox"
                        value={name.value}
                        onChange={name.onChange}
                    />
                    {name.message && <p className="error">{name.message}</p>}
            </div>
            <div className="inputField">
                <label>Department:</label>
                    <select
                        value={department.value}
                        onChange={department.onChange}
                    >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept} value={dept}>
                                {dept}
                            </option>
                        ))}
                    </select>
                    {department.message && <p className="error">{department.message}</p>}
            </div>

            <input type="submit" className="submitButton"
            />

        </form>
    )
}