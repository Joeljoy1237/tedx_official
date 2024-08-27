import Ticket from "@models/Ticket";
import Booking from "@models/Booking";
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<Response> {
  try {
    const { userId, group, count, amount } = await request.json();

    if (!group) {
      return new Response(
        JSON.stringify({ message: "Enter all required details" }),
        {
          status: 400,
        }
      );
    }

    const ticket = await Ticket.findOne({ _id: "66bcdf73381f6901e8ed2532" });

    if (!ticket) {
      return new Response(
        JSON.stringify({ message: "Ticket not found" }),
        { status: 404 }
      );
    }

    group.forEach((groupMember: any) => {
      ticket.ticketSold += 1;
      ticket.ticketRemaning -= 1;
      groupMember.ticketId = `TEDXCCET/2024/${("00" + ticket.ticketSold).slice(-3)}`;
    });

    const newBooking = new Booking({
      userId: userId,
      orderId: "none",
      count: count,
      amount: amount,
      group: group,
    });

    await newBooking.save();
    await ticket.save();

    return new Response(
      JSON.stringify({ message: "Successfully Added" }),
      { status: 200 }
    );

  } catch (err: unknown) {
    console.error(err);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: err instanceof Error ? err.message : "Unknown error occurred",
      }),
      { status: 500 }
    );
  }
}
