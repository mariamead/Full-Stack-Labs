import { Request, Response, NextFunction } from "express";
import { successResponse, errorResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as employeeDepartmentsService from "../services/employeeDepartmentsService";

export const getAllEmployees = async(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employees = await employeeDepartmentsService.getAllEmployees();
        res.status(HTTP_STATUS.OK).json(
            successResponse(employees, "Employees retrieved successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
};

export const createEmployee = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, department } = req.body;

        if(!name || !department) {
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                errorResponse("Missing required employee fields")
            );
        } else {
            const newEmployee = await employeeDepartmentsService.createEmployee({
                name,
                department
        });
            res.status(HTTP_STATUS.CREATED).json(
                successResponse(newEmployee, "New employee created successfully.")
            );
        }
    } catch (error: unknown) {
        next(error);
    }
};