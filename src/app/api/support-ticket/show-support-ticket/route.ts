import SupportTicket from "@models/SupportTicket";
import { NextRequest, NextResponse } from "next/server";

// GET API route to retrieve support tickets by userId
export const GET = async (request: NextRequest): Promise<NextResponse> => {
  try {
    // Get the userId from the query parameters
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    console.log("user id",userId)

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "User ID is required" }),
        { status: 400 }
      );
    }

    // Find support tickets by userId
    const tickets = await SupportTicket.find({ userId }).exec();
    console.log(tickets)

    return new NextResponse(
      JSON.stringify(tickets),
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    console.error("Error retrieving support tickets:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};
