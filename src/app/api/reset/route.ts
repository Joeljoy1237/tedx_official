import jwt from "jsonwebtoken";
import { connectToDB } from "@utils/database";
import User from "@models/User";
import { NextRequest, NextResponse } from "next/server"; // Assuming you're using Next.js

interface JwtPayload {
  userId: string;
}

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const { token }: { token: string } = await request.json();
    console.log(token);

    const decode = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    await connectToDB();

    const user = await User.findOne({ _id: decode.userId });

    if (user && !user.resetTokenUsed) {
      return new NextResponse("Valid", { status: 202 });
    }

    return new NextResponse("Invalid", { status: 400 });
  } catch (error: any) {
    console.error("Error verifying token:", error);
    return new NextResponse("Invalid", { status: 400 });
  }
};
