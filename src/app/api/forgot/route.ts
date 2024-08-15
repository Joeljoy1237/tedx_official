import nodemailer, { Transporter } from "nodemailer";
import jwt from "jsonwebtoken";
import User from "@models/User";
import { connectToDB } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";

const transporter: Transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

interface ResetRequestBody {
  email: string;
}

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    await connectToDB();

    const { email }: ResetRequestBody = await request.json();
    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse(
        JSON.stringify({
          message: "Email not found",
          desc: "Please check the email address you provided and try again.",
        }),
        { status: 404 }
      );
    }

    if (user.resetLockUntil > Date.now() && user.resetCount >= 3) {
      console.log(user.resetLockUntil);
      const timeDifferenceInMilliseconds = user.resetLockUntil - Date.now();
      const timeDifferenceInHours = Math.ceil(timeDifferenceInMilliseconds / (1000 * 60 * 60));
      return new NextResponse(
        JSON.stringify({
          message: "Reset request limit reached",
          desc: `You have reached the maximum number of reset requests try after ${timeDifferenceInHours} hour. Please contact support for further assistance.`,
        }),
        { status: 403 }
      );
    }
    else if (user.resetCount >= 3) {
      user.resetCount = 0;
    }


    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    const resetPassUrl = `https://tedxccet.in/reset-password/${token}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Your TEDxCCET Password",
      text: `Hello ${user?.firstName + " " + user?.lastName},\n\nYou've requested to reset your password for TEDxCCET. Click the following link to reset your password:\n${resetPassUrl}\n\nIf you didn't request a password reset, you can ignore this email.\n\nBest regards,\nThe TEDxCCET Team`,
      html: `
        <div style="background-image: url('https://img.freepik.com/free-vector/cartoon-galaxy-background_23-2148984167.jpg?size=626&ext=jpg&ga=GA1.1.1475327329.1698553788&semt=ais'); background-size: cover; background-position: center; padding: 20px; font-family: 'Arial', sans-serif;">
          <div style="max-width: 600px; margin: auto; background-color: rgba(255, 255, 255, 0.9); border-radius: 10px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); overflow: hidden;">
            <div style="padding: 20px; text-align: center;">
              <p style="font-size: 18px; color: #333; margin-bottom: 20px;">Hello <strong>${user?.firstName + " " + user?.lastName}</strong>,</p>
              <p style="font-size: 16px; color: #333; margin-bottom: 20px;">You've requested to reset your password for TEDxCCET.</p>
              <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Click the following link to reset your password:</p>
              <p style="margin-bottom: 30px;">
                <a href="${resetPassUrl}" style="font-size: 18px; color: #007BFF; text-decoration: none; padding: 10px 20px; border-radius: 5px; background-color: #007BFF; color: #fff; display: inline-block;">Reset Password</a>
              </p>
              <p style="font-size: 16px; color: #333; margin-bottom: 30px;">If you didn't request a password reset, you can ignore this email.</p>
            </div>
            
            <hr style="border: 1px solid #ddd; margin: 40px 0;">

            <div style="text-align: center; margin-bottom: 30px;">
              <img src="https://tedxccet.in/logo.svg" alt="TEDxCCET 2024" style="height: 5rem;">
            </div>

            <div style="padding: 0 20px; text-align: center;">
              <p style="font-size: 18px; color: #333; margin-bottom: 20px;">Thank you for choosing TEDxCCET. We are dedicated to providing exceptional support to our users.</p>
              <p style="font-size: 16px; color: #333; margin-bottom: 20px;">If you have any questions or need further assistance, please don't hesitate to contact our support team at:</p>
              <p style="font-size: 16px; color: #333; margin-bottom: 10px;"><strong>Email:</strong> tedxsupport@carmelcet.in</p>
              <p style="font-size: 16px; color: #333; margin-bottom: 30px;"><strong>Phone:</strong> +91 797247909</p>
            </div>

            <div style="background-color: #D32F2F; color: #fff; padding: 20px; text-align: center;">
              <p style="font-size: 16px; margin: 0;">Best regards,<br>The TEDxCCET Team</p>
              <p style="font-size: 14px; margin-top: 10px;">© 2024 TEDxCCET. All rights reserved.</p>
            </div>
          </div>
        </div>
      `,
    };

    user.resetTokenUsed = false;
    user.resetCount = (user.resetCount || 0) + 1;
    if (user.resetCount >= 3) {
      // Set the lockUntil time to 12 hours from now
      user.resetLockUntil = new Date(Date.now() + 12 * 60 * 60 * 1000); // 12 hours = 43,200,000 milliseconds


    }
    await user.save();

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
        return new NextResponse(
          JSON.stringify({
            message: "Failed to send reset email",
            desc: "There was an error sending the reset email. Please try again later or contact support.",
          }),
          { status: 500 }
        );
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    return new NextResponse(
      JSON.stringify({
        message: "Reset password email sent successfully",
        desc: "Please check your inbox (including spam/junk folders) for the reset email.",
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error handling reset request:", err);
    return new NextResponse(
      JSON.stringify({
        message: "Internal Server Error",
        desc: "An unexpected error occurred. Please try again later.",
      }),
      { status: 500 }
    );
  }
};
