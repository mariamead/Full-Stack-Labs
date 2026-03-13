import type { FrontendRole } from "@shared/types/frontend-Role";
import { organizationData } from "../../../data/leadershipManagement";

export const getallRoles = async(): Promise<FrontendRole[]> => {
    return structuredClone(organizationData);
};

export const createRole = async(roleData: {
    firstName: string,
    lastName: string,
    role: string
}): Promise<FrontendRole> => {
    try {
        const newRole: FrontendRole = {
              id: (organizationData.length + 1).toString(),
              ...roleData
            };
        
        // add to local "database"
        organizationData.push(newRole);
        
        return structuredClone(newRole);
    } catch (error: unknown) {
        throw error;
    }
}