import { useFormInput } from "../../hooks/useFormInput";
import type { EmployeesDepartments } from "../../data/employeesAndDepartments";
import "./addEmployee.css"

export function AddEmployeeForm({
    departments,
    addEmployee,
}: {
    departments: string[];
    addEmployee: (employee: EmployeesDepartments) => void
}) {
    const {name, setName, department, setDepartment, error, validateForm } = useFormInput();

    const formSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isValid = validateForm({
            nameValidator: (value) => 
                value.trim().length < 3 ? "Name must be longer than 3 characters." : null,
            departmentValidator: (value) => 
                departments.includes(value) ? "Please select a department" : null ,
        });

        if(!isValid) {
            return;
        }
      
        addEmployee({name, department});

    };

    return(
        <form onSubmit={formSubmit} className="addEmployee">
            <h3>Add Employee</h3>
            <div className="inputField">
                <label>Employee Name:</label>
                    <input
                        type="text"
                        className="textbox"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
            </div>
            <div className="inputField">
                <label>Department:</label>
                    <select
                        value={department}
                        onChange={(event) => setDepartment(event.target.value)}
                    >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept} value={dept}>
                                {dept}
                            </option>
                        ))}
                    </select>
            </div>

            <div>
                {error?.name && <p>{error.name}</p>}
                {error?.department && <p>{error.department}</p>}   
            </div>
            <input type="submit" className="submitButton"
            disabled={!name || !department}
            />

        </form>
    )
}