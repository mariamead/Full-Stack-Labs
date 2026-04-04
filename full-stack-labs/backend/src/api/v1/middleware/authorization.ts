import { User } from "@prisma/client";
import * as userService from "../services/userService";
import { Request, Response, NextFunction } from "express";
import { clerkClient, getAuth } from "@clerk/express";


export const findOrCreateUser = async(
    req: Request,
    _res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const auth = getAuth(req);
        const  userId = auth.userId;

        if(userId) {
            let backendUser: User|null = await userService.getUserById(userId);
            if(!backendUser) {
                const clerkUser = await clerkClient.users.getUser(userId);

                const email = clerkUser.emailAddresses[0]?.emailAddress;
                if(!email) {
                    throw new Error ("User Has not email in Clerk");
                }
                backendUser = await userService.createUser({
                    id: userId,
                    email: email
                });
            }
        }

        req.userId = userId;
        next();

    } catch (error: unknown) {
        next(error);
    }
}