import { mailOptions, transporter } from "@/config/nodemailer";
import User from "@/lib/models/User";
import InvitedAdmin from "@/lib/models/InvitedAdmin";
import { connectToDB } from "@/lib/mongoDB";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export const POST = async (request: any) => {
  const data = await request.json();

  try {
    await connectToDB();

    const email = data.email;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new NextResponse("Email is already in use", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(data.password, 5);
    const newUser = new User({
      ...data,
      password: hashedPassword,
    });
    await newUser.save();

    return new NextResponse("successfully registered", { status: 200 });
  } catch (error) {
    console.log("Error saving user", error);
    return new NextResponse('error while register', { status: 500 });
  }




  // try {
  //   await newUser.save();
  //   await InvitedAdmin.findOneAndDelete({ email });

  //   const emailVerificationToken = Math.round(Math.random() * 100000);

  //   const values = {
  //     email,
  //     emailVerificationToken,
  //     subject: "Please verify your email",
  //     message: `Hello,<br/>We have sent you this email in response to your request to verify your email on kodevz.<br/>your verification code is : `
  //   };

  //   const emailContent = generateEmailContent(values);

  //   await transporter.sendMail({
  //     ...mailOptions,
  //     to: [email], // Set the recipient email dynamically
  //     ...emailContent,
  //     subject: values.subject,
  //   });

  //   await User.findOneAndUpdate(
  //     { email },
  //     {
  //       emailVerificationToken,
  //     }
  //   );

  //   return new NextResponse("email sent", { status: 200 });
  // } catch (err: any) {
  //   console.log("Error saving user", err);
  //   return new NextResponse(err, { status: 500 });
  // }
};
