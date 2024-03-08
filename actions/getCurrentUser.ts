import { getServerSession } from "next-auth/next";
import db from "@/libs/db";
import { authOptions } from "@/auth";

export async function getSession() {
    return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
    const session = await getSession();
    try {

        if (!session?.user?.email) {
            return null
        }

        const currentUser = await db.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })

        if (!currentUser) {
            return null
        }

        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null
        };
    } catch (error: any) {
        return null;
    }
}