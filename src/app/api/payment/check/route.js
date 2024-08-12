import Ticket from "@models/Ticket";
import { connectToDB } from "@utils/database";
import Razorpay from "razorpay";

export const POST = async (request) => {
  const { userId, count, orderId } = await request.json();
  const razorpay = new Razorpay({
    key_id: process.env.RAZOR_KEY_ID,
    key_secret: process.env.RAZOR_KEY_SECRET,
  });
  try {
    const paymentData = await razorpay.orders.fetch(orderId);

    if (
      paymentData.amount === paymentData.amount_paid &&
      paymentData.status === "paid"
    ) {
      await connectToDB();
      const newTicket = new Ticket({ userId, count, orderId });
      newTicket.save();
      return new Response(JSON.stringify({ message: "Save sucessful" }), {
        status: 200,
      });
    }
    console.log(paymentData);
    return new Response(
      JSON.stringify({ message: "Payment Save Unsucessful" }),
      {
        status: 400,
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
