import CryptoJS from "crypto-js";
import { NextRequest, NextResponse } from "next/server"; // Assuming you're using Next.js

interface RequestBody {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    }: RequestBody = await request.json();

    console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature);

    const generatedSignature = CryptoJS.HmacSHA256(
      `${razorpay_order_id}|${razorpay_payment_id}`,
      process.env.RAZOR_KEY_SECRET as string
    ).toString(CryptoJS.enc.Hex);
    console.log(generatedSignature);

    if (generatedSignature !== razorpay_signature) {
      return new NextResponse(
        JSON.stringify({ message: "Payment Unsuccessful" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Payment successful" }),
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error verifying payment:", err);
    return new NextResponse(
      JSON.stringify({ message: "Internal server Error" }),
      { status: 500 }
    );
  }
};
