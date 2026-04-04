import { User } from "@prisma/client";
import prisma from "../../../../prisma/client";

export const getUserById = async(id: string): Promise<User | null> => {
    const user: User | null = await prisma.user.findUnique(
        {
            where: { id: id }
        }
    );

    if (!user) {
        return null;
    } else {
        return user;
    }
}

export const createUser = async(userData: { id: string, email: string}): Promise<User> => {
    return await prisma.user.upsert ({
        where: { id: userData.id },
        update: {
            email: userData.email 
        },
        create: {
            id: userData.id,
            email: userData.email,
        },
    });
}