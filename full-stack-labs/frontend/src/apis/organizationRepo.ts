import { organizationData } from "./leadershipManagement";
import type { FrontendRole as Role } from "@shared/types/frontend-Role";

export function fetchAllOrganization(): Role[] {
    return structuredClone(organizationData);
}

export async function createPerson(
    newPerson: Role
): Promise<Role> {
    if(organizationData.some(org => org.role === newPerson.role)) {
        throw new Error("Role Already Exists");
    } else {
        organizationData.push(newPerson);
    }

    return structuredClone(newPerson);
}
