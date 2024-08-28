// app/api/admin/support-tickets/route.ts

import SupportTicket from "@models/SupportTicket";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react"; // Import getSession for authorization

// PUT API route to update a support ticket
export const PUT = async (request: NextRequest): Promise<NextResponse> => {
  try {
    // Check if the user is authenticated and has admin privileges
    // const session = await getSession({ req: request as any }); // Casting request to `any` for getSession
    // if (!session || !session.user?.isAdmin) {
    //   return new NextResponse(
    //     JSON.stringify({ message: "Unauthorized" }),
    //     { status: 403 }
    //   );
    // }

    // Extract the request body
    const { _id: ticketId, status, reply } = await request.json();

    // if (!ticketId || !status || !reply) {
    //   return new NextResponse(
    //     JSON.stringify({ message: "Ticket ID, status, and reply are required" }),
    //     { status: 400 }
    //   );
    // }

    // Find and update the support ticket
    const updatedTicket = await SupportTicket.findByIdAndUpdate(
      ticketId,
      { status, reply, updatedAt: new Date() },
      { new: true } // Return the updated ticket
    ).exec();

    if (!updatedTicket) {
      return new NextResponse(
        JSON.stringify({ message: "Ticket not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify(updatedTicket),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    console.error("Error updating support ticket:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};
