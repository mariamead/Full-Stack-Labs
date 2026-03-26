import { PrismaClient } from "@prisma/client";
import {departments, employees, roles} from "./seedData";
const prisma = new PrismaClient();

async function main() {
    await prisma.department.createMany({
    data: departments,
    skipDuplicates: true,
    });

    const allDepartments = await prisma.department.findMany();
    const departmentMap = Object.fromEntries(
        allDepartments.map((dept) => [dept.name, dept.id])
    );

    for (const employee of employees) {
        const dept = departments.find(dept => dept.name === employee.departmentName);
        await prisma.employee.create({
            data: {
                name: employee.name,
                departmentId: employee.departmentName
                    ? departmentMap[employee.departmentName]
                    : undefined,
            },
        });
    }

    //Seed roles (attach to employee by name)
    for (const role of roles) {
        const emp = await prisma.employee.findFirst({
            where: { name: role.employeeName },
        });
        if (!emp) throw new Error(`Employee not found: ${role.employeeName}`);
        
        await prisma.role.create({
            data: {
                roleName: role.roleName,
                employeeId: emp.id,
            },
        });
    }


    console.log("Seeding finished!");

}


main().then(
    async() => {
        await prisma.$disconnect()
    }
).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
}); 