import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server"; // Assuming you're using Next.js

interface RequestBody {
  count: number;
  offer: number;
  lastPrice: number;
}

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const { count, offer, lastPrice }: RequestBody = await request.json();

    const razorpay = new Razorpay({
      key_id: process.env.RAZOR_KEY_ID as string,
      key_secret: process.env.RAZOR_KEY_SECRET as string,
    });

    // Uncomment this section if you need to re-enable the security check
    // if (lastPrice !== 1200 * count - 1200 * count * (offer / 100)) {
    //   return new NextResponse(
    //     JSON.stringify({ message: "Security Compromise" }),
    //     { status: 403 }
    //   );
    // }

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

    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};
