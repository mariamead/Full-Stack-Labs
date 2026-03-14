import  type { FrontendRole as Role } from "@shared/types/frontend-Role";
import { useFormInput } from "../../hooks/useFormInput";
import { validateFirstName, validateLastName, validateRole } from "../../services/organizationService";
import "./addOrganization.css"

export function AddToOrganizationForm({
        organization,
        AddPersonToOrganization
}: {
        organization: Role[],
        AddPersonToOrganization: (organization: Role) => Promise<string | Role>
}) {
    const firstName = useFormInput(validateFirstName);
    const lastName = useFormInput(validateLastName);
    const role = useFormInput((role: string) => validateRole(role, organization))

    const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validateFirstName = firstName.validateForm();
        const validateLastName = lastName.validateForm();
        const validateRole = role.validateForm();

        firstName.setMessage(validateFirstName.message ?? null);
        lastName.setMessage(validateLastName.message ?? null);
        role.setMessage(validateRole.message ?? null);

        if(!validateFirstName.isValid || !validateLastName.isValid || !validateRole.isValid) {
            return;
        }
        await AddPersonToOrganization({
            firstName: firstName.value, 
            lastName: lastName.value, 
            role: role.value
        });

        firstName.setValue("");
        lastName.setValue("");
        role.setValue("");
    };

    return(
        <form onSubmit={formSubmit} className="addOrganization">
            <h3>Add To The Organization</h3>
            <div className="inputField">
                <label>First Name:</label>
                <input
                    type="text"
                    className="textbox"
                    value={firstName.value}
                    onChange={firstName.onChange}
                />
                {firstName.message && <p className="error">{firstName.message}</p>}
            </div>
            <div className="inputField">
                <label>Last Name:</label>
                <input
                    type="text"
                    className="textbox"
                    value={lastName.value}
                    onChange={lastName.onChange}
                />
                {lastName.message && <p className="error">{lastName.message}</p>}
            </div>
            <div className="inputField">
                <label>Role:</label>
                <input
                    type="text"
                    className="textbox"
                    value={role.value}
                    onChange={role.onChange}
                />
                {role.message && <p className="error">{role.message}</p>}
            </div>

            <input type="submit" className="submitButton"/>
        </form>
    )
}
