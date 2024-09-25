
import ChangePasswordForm from '../_components/ChangePasswordForm';
import ResetPasswordForm from '../_components/ResetPasswordForm';
import User from '@/lib/models/User';
import { connectToDB } from '@/lib/mongoDB';

interface ResetPasswordPageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
    
    if (searchParams.token) {
        await connectToDB();
        const user = await User.findOne({resetPasswordToken: searchParams.token});
        if (!user) {
            return <div>Invalid token</div>;
        }

        return <ChangePasswordForm resetPasswordToken={searchParams.token as string} />;
    } else {
        return <ResetPasswordForm />;
    }
};

export default ResetPasswordPage;
