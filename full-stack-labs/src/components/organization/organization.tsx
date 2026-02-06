import type { Role } from "../../apis/leadershipManagement";
import { useState } from "react";
import "./organization.css";

export function OrganizationList(
    {
        organization,
    }:
    {
        organization: Role[]
    }
) {
    const [organizationList] = useState<Role[]>(organization);

    return (
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
    );
};
