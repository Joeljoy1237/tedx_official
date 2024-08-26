import Booking from "@models/Booking";
import { connectToDB } from "@utils/database";

export async function GET(): Promise<Response> {
  try {
    await connectToDB();
    const purchased = await Booking.find({});

    if (purchased) {
      return new Response(JSON.stringify(purchased), { status: 200 });
    }

    return new Response(JSON.stringify({ message: "No booking data found" }), {
      status: 404,
    });
  } catch (err) {
    console.error("Error fetching booking data:", err);

    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Internal Server Error",
      }),
      { status: 500 }
    );
  }
}
