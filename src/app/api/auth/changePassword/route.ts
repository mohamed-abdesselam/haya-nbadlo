import bcrypt from "bcryptjs";
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoDB';
import User from '@/lib/models/User';

export const POST = async (req:Request) => {

    const { resetPasswordToken, password } = await req.json();

    try {

        await connectToDB();

        const user = await User.findOne({ resetPasswordToken });

        if (!user) {
            return new NextResponse('user not found', { status: 404 });
        }

        const resetPasswordTokenExpiry = user.resetPasswordTokenExpiry;
        if (!resetPasswordTokenExpiry)
            return new NextResponse('token expired', { status: 400 });

        const today = new Date();
        if (today > resetPasswordTokenExpiry) {
            return new NextResponse('token expired', { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 5);


        await User.findOneAndUpdate(
            { resetPasswordToken },
            {
                resetPasswordToken: null,
                resetPasswordTokenExpiry: null,
                password: hashedPassword
            }
        );

        return new NextResponse('password updated successfully', { status: 200 });

    } catch (error) {
        return new NextResponse('error', { status: 500});
    }


}