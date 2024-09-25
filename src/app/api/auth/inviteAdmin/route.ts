import User from "@/lib/models/User";
import InvitedAdmin from "@/lib/models/InvitedAdmin";
import { connectToDB } from "@/lib/mongoDB";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export const POST = async (req: Request) => {
    const currentUser = await getCurrentUser();
    // console.log(currentUser);


    if (!currentUser || (!currentUser.superAdmin && !currentUser.permissions.AddAdmins)) {
        return NextResponse.json({ message: 'Access denied' }, { status: 401 });
    }

    try {
        const data = await req.json();

        await connectToDB()

        const existingAdmin = await User.findOne({ email: data.email })
        if (existingAdmin) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }
        const existingAdminInInvetdList = await InvitedAdmin.findOne({ email: data.email })
        if (existingAdminInInvetdList) {
            await InvitedAdmin.findOneAndUpdate(
                { email: data.email },
                data
            )
        } else {
            await InvitedAdmin.create(data);
        }

        return NextResponse.json({ message: 'User invited successfully' }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'error while adding admin' }, { status: 500 })
    }
}