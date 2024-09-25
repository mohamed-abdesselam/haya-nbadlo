import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export async function getSeSSion() {
    return await getServerSession(authOptions);
}

export async function getCurrentUser() {
    try {
        const session = await getSeSSion();

        if (!session?.user?.email) {
            return null;
        }

        await connectToDB();
        const currentUser = await User.findOne({ email: session.user.email });

        if (!currentUser) {
            return null;
        }
        // Convert ObjectId to string
        const admin = {
            _id: currentUser._id.toString(),
            email: currentUser.email,
            password: currentUser.password,
            name: currentUser.name,
            phone: currentUser.phone,
            gender: currentUser.gender,
            specialty: currentUser.specialty,
            class: currentUser.class,
            exchangeRequest: currentUser.exchangeRequest.map((e:any) => e.toString()),
            superAdmin: currentUser.superAdmin,
            resetPasswordToken: currentUser.resetPasswordToken,
            resetPasswordTokenExpiry: currentUser.resetPasswordTokenExpiry,
            emailVerified: currentUser.emailVerified,
            emailVerificationToken: currentUser.emailVerificationToken,
            permissions: {
                AddProducts: currentUser.permissions.AddProducts,
                ReplyToOrders: currentUser.permissions.ReplyToOrders,
                AddAdmins: currentUser.permissions.AddAdmins,
                CustomizeWebsite: currentUser.permissions.CustomizeWebsite,
                SeeStatistics: currentUser.permissions.SeeStatistics,
            },
            createdAt: currentUser.createdAt,
            updatedAt: currentUser.updatedAt,
        }

        return admin;

    } catch (error) {
        console.log('error while getting current user', error);
        return null;
    }
}
