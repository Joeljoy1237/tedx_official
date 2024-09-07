import { connectToDB } from "@utils/database";
import Booking from "@models/Booking";
import { NextRequest, NextResponse } from "next/server"; // Import Next.js types

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    await connectToDB();
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Error connecting to database" }),
      { status: 500 }
    );
  }

  try {
    const tickets = await Booking.aggregate([
      {
        $match: {
          "group.checkedIn": true, // Filter documents where at least one group member is checked in
        },
      },
      {
        $addFields: {
          group: {
            $filter: {
              input: "$group",
              as: "member",
              cond: { $eq: ["$$member.checkedIn", true] }, // Filter only checked-in group members
            },
          },
        },
      },
    ]);

    return new NextResponse(JSON.stringify(tickets), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Error finding users" }),
      { status: 400 }
    );
  }
};
