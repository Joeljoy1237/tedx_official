import Booking from "@models/Booking";
import Ticket from "@models/Ticket";
import { connectToDB } from "@utils/database";

export async function POST(request: Request): Promise<Response> {
  try {
    // Ensure MongoDB connection
    await connectToDB();

    // Check for content type
    const contentType = request.headers.get('Content-Type');
    if (contentType !== 'application/json') {
      return new Response(
        JSON.stringify({ error: "Content-Type must be application/json" }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
        }
      );
    }

    // Parse request body
    let requestBody;
    try {
      requestBody = await request.json();
    } catch (err) {
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
        }
      );
    }

    const { sortOrder = 'desc' } = requestBody; // Default to 'desc' if not provided

    // Validate sortOrder value
    const validSortOrders = ['asc', 'desc'];
    if (!validSortOrders.includes(sortOrder)) {
      return new Response(
        JSON.stringify({ error: "Invalid sortOrder value" }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
        }
      );
    }

    // Fetch all bookings and ticket statuses
    const bookings = await Booking.find({}).exec();
    const ticketStatus = await Ticket.find({}).exec();

    // Sorting the group array within each booking based on the last three digits of ticketId
    const sortedBookings = bookings
      .map((booking) => {
        const sortedGroup = booking.group.sort((a: any, b: any) => {
          let ticketIdA = a.ticketId ? a.ticketId.slice(-3) : null;
          let ticketIdB = b.ticketId ? b.ticketId.slice(-3) : null;

          // Ensure the ticket IDs are valid and numeric
          ticketIdA = ticketIdA && /^\d+$/.test(ticketIdA) ? parseInt(ticketIdA, 10) : 0;
          ticketIdB = ticketIdB && /^\d+$/.test(ticketIdB) ? parseInt(ticketIdB, 10) : 0;

          // Sort based on the sortOrder
          return (sortOrder === 'desc' ? ticketIdB - ticketIdA : ticketIdA - ticketIdB);
        });

        return { ...booking.toObject(), group: sortedGroup };
      })
      // Sort the entire bookings array based on the first group member's ticketId
      .sort((a, b) => {
        let ticketIdA = a.group[0]?.ticketId ? a.group[0].ticketId.slice(-3) : null;
        let ticketIdB = b.group[0]?.ticketId ? b.group[0].ticketId.slice(-3) : null;

        ticketIdA = ticketIdA && /^\d+$/.test(ticketIdA) ? parseInt(ticketIdA, 10) : 0;
        ticketIdB = ticketIdB && /^\d+$/.test(ticketIdB) ? parseInt(ticketIdB, 10) : 0;

        // Sort based on the sortOrder
        return (sortOrder === 'desc' ? ticketIdB - ticketIdA : ticketIdA - ticketIdB);
      });

    // Debug: Print sorted bookings
    console.log("Bookings after sorting:", JSON.stringify(sortedBookings, null, 2));

    // Check if any bookings or ticket statuses were found
    if (sortedBookings.length > 0 || ticketStatus.length > 0) {
      return new Response(
        JSON.stringify({
          bookings: sortedBookings, // Send sorted bookings data
          ticketStatus: ticketStatus, // Send ticket status data
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "No booking or ticket data found" }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
        }
      );
    }
  } catch (err) {
    console.error("Error fetching booking or ticket data:", err);

    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Internal Server Error",
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      }
    );
  }
}
