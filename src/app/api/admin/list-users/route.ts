import User from "@models/User"; // Assuming you have a User model
import { connectToDB } from "@utils/database";

export const POST = async (request: Request) => {
  try {
    // Connect to the database
    await connectToDB();

    // Extract the startDate and endDate from the request body
    const { startDate, endDate } = await request.json();

    // Create a filter object
    const filter: any = {};

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Fetch users from the User collection based on the filter
    const users = await User.find(filter).exec();

    // If no users are found, return a 404 status
    if (!users || users.length === 0) {
      return new Response(JSON.stringify({ message: "No users found" }), { status: 404 });
    }

    // Return the user data in JSON format
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (err) {
    // Log any errors to the console
    console.error("Database query error:", err);

    // Return a 500 Internal Server Error status if something goes wrong
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
};
