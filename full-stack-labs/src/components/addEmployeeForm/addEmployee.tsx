import type { EmployeesDepartments } from "../../apis/employeesAndDepartments";
import { useFormInput } from "../../hooks/useFormInput";
import "./addEmployee.css"

export function AddEmployeeForm({
    departments,
    addEmployee,
}: {
    departments: string[];
    addEmployee: (employee: EmployeesDepartments) => Promise<string | EmployeesDepartments | null>;
}) {
    const name = useFormInput();
    const department = useFormInput();

    const formSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validateName = name.validateForm(
            value => value.trim() === "" ? "Please Enter a Employee Name." : null
        );
        const validateDepartment = department.validateForm(
            value => value === "" ? "Please Select a Department." : null
        );

        if(!validateName.isValid || !validateDepartment.isValid) {
            return;
        }
        
        await addEmployee({name: name.value, department: department.value});


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
            disabled={!name.value || !department.value}
            />

        </form>
    )
}