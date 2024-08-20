import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server"; // Assuming you're using Next.js

interface RequestBody {
  count: number;
  offer: number;
  lastPrice: number;
}

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    // Parse the request body
    const { count, offer, lastPrice }: RequestBody = await request.json();
    if (!count || !offer || !lastPrice) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid input data" }),
        { status: 400 }
      );
    }

    // Initialize Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZOR_KEY_ID as string,
      key_secret: process.env.RAZOR_KEY_SECRET as string,
    });

    // Create an order
    const options = {
      amount: lastPrice * 100, // Amount in paise
      currency: "INR",
      receipt: "#receipt",
      payment_capture: 1,
    };

    const response = await razorpay.orders.create(options);
    return new NextResponse(JSON.stringify(response), { status: 200 });

  } catch (err: any) {
    console.error("Error creating order:", err);

    // Handle specific error types
    if (err instanceof SyntaxError) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid JSON format" }),
        { status: 400 }
      );
    } else if (err.code === "ECONNREFUSED") {
      return new NextResponse(
        JSON.stringify({ message: "Connection refused by Razorpay" }),
        { status: 502 }
      );
    } else if (err.name === "RazorpayError") {
      return new NextResponse(
        JSON.stringify({ message: "Error from Razorpay: " + err.message }),
        { status: 500 }
      );
    } else if (err.name === "TypeError") {
      return new NextResponse(
        JSON.stringify({ message: "Type error: " + err.message }),
        { status: 500 }
      );
    } else {
      return new NextResponse(
        JSON.stringify({ message: "Internal Server Error" }),
        { status: 500 }
      );
    }
  }
};
