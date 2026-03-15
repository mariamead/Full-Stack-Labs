import { Request, Response, NextFunction } from "express";
import { successResponse, errorResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as organizationRoleService from "../services/organizationRoleService";

export const getAllRoles = async(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const roles = await organizationRoleService.getallRoles();
        res.status(HTTP_STATUS.OK).json(
            successResponse(roles, "Roles retrieved successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
};

export const createRole = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { firstName, lastName, role } = req.body;

        if(!firstName || !lastName || !role) {
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                errorResponse("Missing required role fields")
            );
        } else {
            const newEmployee = await organizationRoleService.createRole({
                firstName,
                lastName,
                role
        });
            res.status(HTTP_STATUS.CREATED).json(
                successResponse(newEmployee, "New role created successfully.")
            );
        }
    } catch (error: unknown) {
        next(error);
    }
};