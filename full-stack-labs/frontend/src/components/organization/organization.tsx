import type { FrontendRole as Role } from "@shared/types/frontend-Role";
import { useState, useEffect } from "react";
import "./organization.css";
import { AddPersonToOrganization as addPersonService} from "../../services/organizationService";
import { AddToOrganizationForm } from "../addToOrganization/addToOrganization";
import { fetchAllOrganization } from "../../apis/organizationRepo";

export function OrganizationList() {
    const [organizationList, setOrganizationList] = useState<Role[]>([]);

    useEffect(() => {
        console.log("useEffect running to fetch employees");
        const loadRoles = async () => {
        try {
            const data = await fetchAllOrganization();
            setOrganizationList(data);
        } catch (error) {
            console.error("Failed to fetch Roles:", error);
        }
        };
        loadRoles();
    }, []);

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
