import Booking from "@models/Booking";
import { connectToDB } from "@utils/database";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { ticketId: string, groupId: string } }
) => {
  try {
    console.log(params.ticketId);
    console.log(params.groupId);

    await connectToDB();

    // Find the booking document by ticketId
    const ticket = await Booking.findOne({
      _id: new ObjectId(params.ticketId),
    });

    if (ticket) {
      // Use the `find` method to search the group array for the matching groupId
      const groupMember = ticket.group.find((group: any) =>
        group._id.equals(new ObjectId(params.groupId))
      );

      if (groupMember) {
        return new Response(
          JSON.stringify({ userId: ticket.userId, person: groupMember }),
          { status: 200 }
        );
      }
    }

    return new Response(JSON.stringify({ message: "Invalid Data" }), {
      status: 400,
    });
  } catch (error) {
    console.error("Error fetching ticket or group:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
