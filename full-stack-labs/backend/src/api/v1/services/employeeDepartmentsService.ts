import type { FrontendEmployeeDepartments } from "@shared/types/frontend-EmployeeDepartments";
import prisma  from "../../../../prisma/client";
import { AppError } from "../errors/errors";

export const getAllEmployees = async(): Promise<FrontendEmployeeDepartments[]> => {
    try{
      const allEmployeeDepartments = await prisma.employee.findMany({
        include: {
          department: true,
        },
      });

      return allEmployeeDepartments.map((employee: { name: string; department: { name: string} | null}) => ({
        name: employee.name,
        department: employee.department?.name || "unassigned"
      }))
    } catch (error: unknown) {
      if(error instanceof AppError) {
        throw error;
      }
      console.error("Error fetching employees and departments.");
      throw new Error("Failed to fetch Employees and Departments.")
    }

}

export const createEmployee = async(employeeData: {
    name: string,
    department: string
}): Promise<FrontendEmployeeDepartments> => {
    try {
      const newEmployee = await prisma.employee.upsert({
        where: { name: employeeData.name },
        update: {
          department: {
            connect: { name: employeeData.department}
          }
        },
        create: {
          name: employeeData.name,
          department: {
            connect: { name: employeeData.department}
          }
        },
        include: {
          department: true
        }
      });

      return {
        name: newEmployee.name,
        department: newEmployee.department?.name || "unassignable"
      }

  } catch (error: unknown) {
    console.error("Error in creating an employee:", error)
     throw new Error(`Could not link employee to department: ${employeeData.department}`);
  }
    
}