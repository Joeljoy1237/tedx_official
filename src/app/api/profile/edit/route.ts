import User from "@models/User";
import { connectToDB } from "@utils/database";
import { NextRequest, NextResponse } from "next/server"; // Assuming you're using Next.js

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const { userId, firstName, lastName, organisation }: { userId: string; firstName: string; lastName: string; organisation: string; } = await request.json();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "Please Enter the userId" }),
        { status: 404 }
      );
    }

    await connectToDB();

    const user = await User.findOne({
      _id: userId,
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.organisation = organisation;
    await user.save();

    return new NextResponse(JSON.stringify({ message: "Edit Successful" }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
};
