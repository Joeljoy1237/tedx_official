import Booking from "@models/Booking";
import { connectToDB } from "@utils/database";
import { NextRequest } from "next/server";
import { ObjectId } from 'mongodb';

interface Params {
  ticketId: string;
}

export const GET = async (
  request: NextRequest,
  { params }: { params: Params }
) => {
  const ticketId = params.ticketId;

  try {
    await connectToDB();
    // Find the ticket
    const ticket = await Booking.findOne({
      group: {
        $elemMatch: {
          _id: ticketId, // Convert ticketId to ObjectId if necessary
        },
      },
    });

    // Handle case where ticket is not found
    if (!ticket) {
      return new Response(JSON.stringify({ message: "Ticket not found" }), {
        status: 404,
      });
    }

    // Find the specific group member


    const groupMember = ticket.group[0];

    // Handle case where the group member is not found
    if (!groupMember) {
      return new Response(
        JSON.stringify({ message: "Group member not found" }),
        { status: 404 }
      );
    }

    // Update the status to true (Checked In)
    groupMember.checkedIn = true;
    await ticket.save();

    return new Response(JSON.stringify({ message: "Checked In" }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error during ticket check-in:", err);
    return new Response(JSON.stringify({ message: "Invalid Ticket" }), {
      status: 500,
    });
  }
};
