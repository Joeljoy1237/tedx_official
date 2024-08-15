import Booking from "@models/Booking";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  console.log(params.ticketId);
  console.log(params.groupId);

  await connectToDB();

  const ticket = await Booking.findOne({ _id: params.ticketId });
  console.log(ticket.group);

  if (ticket) {
    ticket.group.forEach((group) => {
      console.log(group);
      if (group._id === params.groupId) {
        return new Response(
          JSON.stringify({ userId: ticket.userId, person: group }),
          { status: 200 }
        );
      }
    });
    return new Response(JSON.stringify({ message: "Invalid Data" }), {
      status: 400,
    });
  }
};
