import { OrganizationList } from "../components/organization/organization";
import { organizationData } from "../apis/leadershipManagement";

export function Organization() {
    return(
        <>
            <main>
                <OrganizationList
                    organization={organizationData}
                 />
            </main>
        </>
    );
}