import Booking from "@models/Booking";
import { connectToDB } from "@utils/database";
import mongoose from "mongoose";

export const GET = async (request, { params }) => {
  try {
    // Connect to the database
    await connectToDB();

    // Check if the ticketId and groupId are valid Object IDs
    if (!mongoose.Types.ObjectId.isValid(params.ticketId) || !mongoose.Types.ObjectId.isValid(params.groupId)) {
      return new Response(JSON.stringify({ message: "Invalid ID format" }), {
        status: 400,
      });
    }

    // Find the ticket by ID
    const ticket = await Booking.findOne({ _id: params.ticketId });

    if (!ticket) {
      return new Response(JSON.stringify({ message: "Ticket not found" }), {
        status: 404,
      });
    }

    // Find the group member by ID within the ticket's group array
    const person = ticket.group.find((group) => group._id.equals(params.groupId));

    if (!person) {
      return new Response(JSON.stringify({ message: "Group member not found" }), {
        status: 404,
      });
    }

    // Return the userId and the found group member's details
    return new Response(
      JSON.stringify({ userId: ticket.userId, person }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: "Server error", error: error.message }), {
      status: 500,
    });
  }
};
