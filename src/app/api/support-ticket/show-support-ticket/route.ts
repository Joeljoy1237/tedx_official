import SupportTicket from "@models/SupportTicket";
import { NextRequest, NextResponse } from "next/server";

// POST API route to retrieve support tickets by userId
export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    // Parse the request body to get userId
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "User ID is required" }),
        { status: 400 }
      );
    }

    // Find support tickets by userId
    const tickets = await SupportTicket.find({ userId }).exec();

    return new NextResponse(
      JSON.stringify(tickets),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving support tickets:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};
