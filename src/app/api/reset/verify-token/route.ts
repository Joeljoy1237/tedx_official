import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDB } from "@utils/database";
import User from "@models/User";

// Define types for the request body
interface VerifyTokenRequest {
  token: string;
}

// Define types for the response
interface ResponsePayload {
  message: string;
  desc?: string;
}

export const POST = async (request: NextRequest) => {
  try {
    // Connect to the database
    await connectToDB();

    // Extract and validate the token from the request body
    const { token }: VerifyTokenRequest = await request.json();
    if (!token) {
      return NextResponse.json({
        message: "Missing token",
        desc: "The request must include a valid token.",
      } as ResponsePayload, { status: 400 });
    }

    // Verify the token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    } catch {
      return NextResponse.json({
        message: "Invalid or expired token",
        desc: "The provided token is either invalid or has expired.",
      } as ResponsePayload, { status: 400 });
    }

    // Find the user associated with the token
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        desc: "No user was found associated with the provided token.",
      } as ResponsePayload, { status: 404 });
    }

    // Check if the token has already been used
    if (user.resetTokenUsed) {
      return NextResponse.json({
        message: "Token already used",
        desc: "The token has already been used and cannot be reused.",
      } as ResponsePayload, { status: 400 });
    }

    // Return a success response if everything is valid
    return NextResponse.json({
      message: "Token is valid",
      desc: "The token is valid and can be used for further operations.",
    } as ResponsePayload, { status: 200 });
  } catch (error: any) {
    console.error("Error verifying token:", error);

    // Handle unexpected errors
    return NextResponse.json({
      message: "Internal server error",
      desc: `An unexpected error occurred: ${error.message}`,
    } as ResponsePayload, { status: 500 });
  }
};
