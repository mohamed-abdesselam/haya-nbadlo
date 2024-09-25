import EmailVerificationForm from '@/components/EmailVerificationForm';
import User from '@/lib/models/User';
import { connectToDB } from '@/lib/mongoDB';
import React from 'react';

interface email {
    searchParams: { [key: string]: string | string[] | undefined };
}

const ResetPasswordPage = async ({ searchParams }: email) => {

    if (searchParams.email) {
        
        await connectToDB();
        const admin = await User.findOne({ email: searchParams.email });
        if (admin) {
            return <EmailVerificationForm email={searchParams.email as string} />;
        }
    }

    return <div>Invalid email</div>;

};

export default ResetPasswordPage;
