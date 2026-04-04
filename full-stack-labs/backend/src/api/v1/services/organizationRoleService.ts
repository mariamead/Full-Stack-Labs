import type { FrontendRole } from "@shared/types/frontend-Role";
import { AppError } from "../errors/errors";
import  prisma  from "../../../../prisma/client";


export const getallRoles = async(): Promise<FrontendRole[]> => {
    try {
        const allRoleData = await prisma.employee.findMany({
            where : {
                role: { isNot: null }
            },
            include: {
                role:true,
            },
        });
        
        const allData: FrontendRole[] = allRoleData.map((employee: {name: string; role: {roleName: string} | null }) => {
            const nameParts = employee.name.trim().split(/\s+/);
            return{
                firstName: nameParts[0] || "",
                lastName: nameParts.length > 1 ? nameParts.slice(1).join(" ") : "",
                role: employee.role?.roleName || "Unassigned"
            };
        })

        return allData;

    } catch (error: unknown) {
        if(error instanceof AppError) {
            throw error;
        }
        console.error("Error fetching roles:", error);
        throw new Error("Failed to fetch Role data");
    }
    
};

export const createRole = async(roleData: {
    firstName: string,
    lastName: string,
    role: string
}): Promise<FrontendRole> => {
    try {
        const fullName = `${roleData.firstName} ${roleData.lastName}`.trim();

        const newRole = await prisma.role.upsert({
            where: {
            
                employeeId: 0 
            },
            update: {}, 
            create: {
                roleName: roleData.role,
                employee: {
                    connectOrCreate: {
                        where: { name: fullName }, 
                        create: { name: fullName }
                    }
                }
            },
            include: {
                employee: true
            }
        });

        return {
            firstName: roleData.firstName,
            lastName: roleData.lastName,
            role: newRole.roleName
        };


    } catch (error: unknown) {
        console.error("Error creating role:", error);
        throw error;

    }
}