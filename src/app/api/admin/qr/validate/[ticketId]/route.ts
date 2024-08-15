import Booking from "@models/Booking";
import { connectToDB } from "@utils/database";
import { ObjectId } from 'mongodb';

interface Params {
  ticketId: string;
}

export const GET = async (request: Request, { params }: { params: Params }) => {
  const ticketId = params.ticketId;

  try {
    await connectToDB();

    if (!ObjectId.isValid(ticketId)) {
      return new Response(JSON.stringify({ message: "Invalid Ticket ID format" }), { status: 400 });
    }

    const ticket = await Booking.findOne({
      "group._id": new ObjectId(ticketId)
    }).exec();

    if (!ticket) {
      return new Response(JSON.stringify({ message: "Ticket not found" }), { status: 404 });
    }

    const groupMember = ticket.group.find((member: any) => member._id.toString() === ticketId);

    if (!groupMember) {
      return new Response(JSON.stringify({ message: "Ticket not found in group" }), { status: 404 });
    }

    return new Response(JSON.stringify(groupMember), { status: 200 });

  } catch (err) {
    console.error("Database query error:", err);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
};
