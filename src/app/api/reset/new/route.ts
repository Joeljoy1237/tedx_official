import User from "@models/User";
import { connectToDB } from "@utils/database";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import { NextRequest, NextResponse } from "next/server"; // Assuming you're using Next.js

interface ResetPasswordRequestBody {
  password: string;
  confirmPassword: string;
  token: string;
}

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    // Connect to the database
    await connectToDB();

    // Extract the necessary data from the request body
    const { password, confirmPassword, token }: ResetPasswordRequestBody = await request.json();

    // Basic validations to ensure all required fields are present
    if (!password || !confirmPassword || !token) {
      return new NextResponse(
        JSON.stringify({
          message: "Missing required fields",
          desc: "The request must include password, confirmPassword, and token fields.",
        }),
        { status: 400 }
      );
    }

    // Check if the password and confirm password fields match
    if (password !== confirmPassword) {
      return new NextResponse(
        JSON.stringify({
          message: "Passwords do not match",
          desc: "The password and confirmPassword fields must match.",
        }),
        { status: 400 }
      );
    }

    // Verify the JWT token to ensure it is valid and not expired
    let decode: { userId: string };
    try {
      decode = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    } catch (err) {
      return new NextResponse(
        JSON.stringify({
          message: "Invalid or expired token",
          desc: "The provided token is either invalid or has expired.",
        }),
        { status: 400 }
      );
    }

    // Find the user associated with the decoded token's userId
    const user = await User.findOne({ _id: decode.userId });
    if (!user) {
      return new NextResponse(
        JSON.stringify({
          message: "User not found",
          desc: "No user was found associated with the provided token.",
        }),
        { status: 404 }
      );
    }

    // Check if the reset token has already been used
    if (user.resetTokenUsed) {
      return new NextResponse(
        JSON.stringify({
          message: "Reset token already used",
          desc: "The reset token has already been used and cannot be reused.",
        }),
        { status: 400 }
      );
    }

    // Encrypt the new password using a secret key for security
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.CRYPTO_SECRET_KEY as string
    ).toString();

    // Update the user's password, mark the reset token as used, and set tokenUsed to true
    user.password = encryptedPassword;
    user.resetTokenUsed = true;
    user.resetCount = (user.resetCount || 0) + 1;
    user.tokenUsed = true; // Mark token as used

    // Save the updated user details to the database
    await user.save();

    // Return a success response indicating the password reset was successful
    return new NextResponse(
      JSON.stringify({
        message: "Password reset successful",
        desc: "The password has been reset successfully.",
      }),
      { status: 200 }
    );
  } catch (error: any) {
    // Log the error for debugging purposes
    console.error("Error resetting password:", error);

    // Return a generic error response if something goes wrong
    return new NextResponse(
      JSON.stringify({
        message: "Internal server error",
        desc: `An error occurred while processing the request: ${error.message}`,
      }),
      { status: 500 }
    );
  }
};
