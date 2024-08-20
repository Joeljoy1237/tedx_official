import SupportTicket from "@models/SupportTicket";
import { NextRequest, NextResponse } from "next/server";

// POST API route to create a support ticket
export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    // Parse the request body
    const { name, email, mobNo, subject, issue, userId } = await request.json();

    // Validate input
    if (!name || !email || !mobNo || !subject || !issue) {
      return new NextResponse(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }

    // Create a new support ticket
    const newTicket = new SupportTicket({
      userId,
      name,
      email,
      mobNo,
      subject,
      issue,
      status: 'open', // Default status
    });

    // Save the ticket to the database
    await newTicket.save();

    return new NextResponse(
      JSON.stringify({ message: "Support ticket created successfully", desc: "Our team will connect with you shortly" }),
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error handling support ticket:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error: " + error.message }),
      { status: 500 }
    );
  }
};
