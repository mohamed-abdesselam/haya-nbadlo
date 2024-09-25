import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectToDB } from '@/lib/mongoDB';
import User from '@/lib/models/User';
import { mailOptions, transporter } from '@/config/nodemailer';

const generateEmailContent = (data:any) => {
  const htmlData = `<p style="font-size: 14px; text-align: left;">${data.message}</p> <a href=${data.resetLink} target="_blank" style="display: block; padding: 15px 40px; line-height: 120%; text-decoration: none;">Reset Password</a>`;

  return {
    html: `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}@media screen and (max-width: 525px){.wrapper{width: 100% !important; max-width: 100% !important;}.responsive-table{width: 100% !important;}.padding{padding: 10px 5% 15px 5% !important;}.section-padding{padding: 0 15px 50px 15px !important;}}.form-container{margin-bottom: 24px; padding: 20px; border: 1px dashed #ccc;}.form-heading{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 18px; margin: 0 0 8px; padding: 0;}.form-answer{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; margin: 0 0 24px; padding: 0;}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style> </head> <body style="margin: 0 !important; padding: 0 !important; background: #fff"> <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px;  max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " ></div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding" > <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > <h2>${data.subject}</h2> <div class="form-container">${htmlData}</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>`,
  };
};

const generateUniqueToken = async () => {
  let token;
  let tokenExists = true;

  while (tokenExists) {
    token = crypto.randomBytes(32).toString("base64url");
    const userWithToken = await User.findOne({ resetPasswordToken: token });
    if (!userWithToken) {
      tokenExists = false;
    }
  }

  return token;
};

export const POST = async (req: Request) => {
  try {
    const { email } = await req.json();

    if (!email) {
      return new NextResponse('Please insert your email', { status: 400 });
    }

    await connectToDB();

    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const resetPasswordToken = await generateUniqueToken();
    const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

    await User.findOneAndUpdate(
      { email },
      {
        resetPasswordToken,
        resetPasswordTokenExpiry: expiryDate,
      }
    );


    const values = {
      email,
      resetLink: `${process.env.NEXT_PUBLIC_SITE_URL}/en/reset-password?token=${resetPasswordToken}`,
      subject: "Please reset your password",
      message: `Hello,<br/>We have sent you this email in response to your request to reset your password on kodevz.<br/>To reset your password, please follow the link below:`
    };

    const emailContent = generateEmailContent(values);

    await transporter.sendMail({
      ...mailOptions,
      to: [email], // Set the recipient email dynamically
      ...emailContent,
      subject: values.subject,
    });

    return new NextResponse("Email sent successfully", { status: 200 });

  } catch (err) {
    console.error('Error sending email:', err);
    return new NextResponse('Error sending email', { status: 400 });
  }
};
