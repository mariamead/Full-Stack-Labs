import { PrismaClient } from "@prisma/client";
import {departments, employees, roles} from "./seedData";
const prisma = new PrismaClient();

async function main() {
    for (const department of departments) {
        await prisma.department.upsert({
        where: { name: department.name },
        update: {},
        create: department,
    });
    }
    ;

    const allDepartments = await prisma.department.findMany();
    const departmentMap = Object.fromEntries(
        allDepartments.map((dept) => [dept.name, dept.id])
    );

    for (const employee of employees) {
        const dept = departments.find(dept => dept.name === employee.departmentName);
        await prisma.employee.upsert({
            where: { name: employee.name },
            update: {
                departmentId: employee.departmentName
                    ? departmentMap[employee.departmentName]
                    : null,
            },
            create: {
                name: employee.name,
                departmentId: employee.departmentName
                    ? departmentMap[employee.departmentName]
                    : null,
            },
        });
    }

    //Seed roles (attach to employee by name)
    for (const role of roles) {
        const employee = await prisma.employee.findUnique({
            where: { name: role.employeeName },
        });
        if (!employee) throw new Error(`Employee not found: ${role.employeeName}`);
        
        await prisma.role.upsert({
            where: { roleName: role.roleName},
            update: {employeeId: employee.id},
            create: {
                roleName: role.roleName,
                employeeId: employee.id,
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