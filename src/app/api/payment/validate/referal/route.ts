import User from "@models/User";
import { connectToDB } from "@utils/database";

// Define the expected structure of the request body
interface RequestBody {
  referal_code: string;
}

// Define the POST function as a handler for incoming requests
export const POST = async (request: Request): Promise<Response> => {
  try {
    // Parse the JSON body from the request
    const { referal_code }: RequestBody = await request.json();

    // Connect to the database
    await connectToDB();

    // Find the user with the provided referral code
    const referalUser = await User.findOne({ referal_code });

    // If no user is found, return an error response
    if (!referalUser) {
      return new Response(
        JSON.stringify({ message: "Invalid referral code" }),
        { status: 400 }
      );
    }

    // If the user is found, return a success response
    return new Response(
      JSON.stringify({ message: "Valid" }),
      { status: 200 }
    );
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};
