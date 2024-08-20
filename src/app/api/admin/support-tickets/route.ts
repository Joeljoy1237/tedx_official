import SupportTicket from "@models/SupportTicket";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react"; // Import getSession for authorization

// GET API route to retrieve all support tickets for admin
export const GET = async (request: NextRequest): Promise<NextResponse> => {
  try {
    // Check if the user is authenticated and has admin privileges
    // const session = await getSession({ req: request as any }); // Casting request to `any` for getSession
    // if (!session || !session.user?.isAdmin) {
    //   return new NextResponse(
    //     JSON.stringify({ message: "Unauthorized" }),
    //     { status: 403 }
    //   );
    // }

    // Fetch all support tickets
    const tickets = await SupportTicket.find({}).exec();
    console.log(tickets);

    return new NextResponse(
      JSON.stringify(tickets),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    console.error("Error retrieving support tickets:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};
