import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongoDB';
import User from '@/lib/models/User';


export const POST = async (req: Request) => {
  try {
    const { email, code } = await req.json();

    await connectToDB();

    const admin = await User.findOne({ email });

    if (!admin) {
      return new NextResponse('User not found', { status: 404 });
    }

    const emailVerificationToken = admin.emailVerificationToken ;

    if (emailVerificationToken !== code) {
        return new NextResponse('Invalid email verification token', { status:400});
    }

    await User.findOneAndUpdate(
      { email },
      {
        emailVerified: true,
        emailVerificationToken: null,
      }
    );

    return new NextResponse("account verified", { status: 200 });

  } catch (err) {
    console.error('Error verifing email', err);
    return new NextResponse('Error verifing email', { status: 400 });
  }
};
