import type { Role } from "../../apis/leadershipManagement";
import { useState } from "react";
import "./organization.css";
import { AddPersonToOrganization as addPersonService} from "../../services/organizationService";
import { AddToOrganizationForm } from "../addToOrganization/addToOrganization";

export function OrganizationList(
    {
        organization,
    }:
    {
        organization: Role[]
    }
) {
    const [organizationList, setOrganizationList] = useState<Role[]>(organization);

    const AddPerson = async (
        person: Omit<Role, "id">
    ): Promise<string | Role> => {
        try {
            const result = await addPersonService(person);
            
            if (typeof result === "string") {
                return result;
            }

            setOrganizationList(prev => [...prev, result]);
            return result;
        } catch (error: unknown) {
            if(error instanceof Error) {
                return error.message;
            }
            return "An unexpected Error occurred";
        }
    };

    return (
        <>
            <AddToOrganizationForm
                            organization={organizationList}
                            AddPersonToOrganization={AddPerson}
                        />
            <section>
                <h2>Leadership and Management</h2>
                <div className="organizationTable">
                    <table className="o-table">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Role</th>
                            </tr>
                        </thead>

                        <tbody className="organization-tbody">
                            {organizationList.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </section>
        </>
    );
};
