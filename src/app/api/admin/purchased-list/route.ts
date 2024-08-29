import Booking from "@models/Booking";
import { connectToDB } from "@utils/database";

export async function POST(request: Request): Promise<Response> {
  try {
    // Ensure MongoDB connection
    await connectToDB();

    // Fetch all bookings
    const bookings = await Booking.find({}).exec();

    // Check if any bookings were found
    if (bookings.length > 0) {
      return new Response(JSON.stringify(bookings), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        }
      });
    } else {
      return new Response(
        JSON.stringify({ message: "No booking data found" }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
          }
        }
      );
    }
  } catch (err) {
    console.error("Error fetching booking data:", err);

    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Internal Server Error",
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        }
      }
    );
  }
}
