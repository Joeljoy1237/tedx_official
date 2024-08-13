import Ticket from "@models/Ticket";
import { connectToDB } from "@utils/database";
import Razorpay from "razorpay";
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server"; // Assuming you're using Next.js

interface GroupMember {
  firstName: string;
  lastName: string;
  organisation: string;
  email: string;
}

interface RequestBody {
  userId: string;
  count: number;
  orderId: string;
  group: GroupMember[];
}

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const { userId, count, orderId, group }: RequestBody = await request.json();

    const razorpay = new Razorpay({
      key_id: process.env.RAZOR_KEY_ID as string,
      key_secret: process.env.RAZOR_KEY_SECRET as string,
    });

    console.log(orderId);
    const paymentData = await razorpay.orders.fetch(orderId);

    if (
      paymentData.amount === paymentData.amount_paid &&
      paymentData.status === "paid"
    ) {
      await connectToDB();

      const payAmount = paymentData.amount_paid;
      const newTicket = new Ticket({
        userId,
        orderId,
        count,
        payAmount,
        group,
      });
      await newTicket.save();

      group.forEach(async (data) => {
        const mailOptions = {
          from: process.env.EMAIL,
          to: data.email,
          subject: "TEDxCCET Ticket",
          text: `${data.firstName} ${data.lastName} ${data.organisation}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
            // Respond with an error if sending the email fails
            return new NextResponse(
              JSON.stringify({
                message: "Failed to send ticket email",
                desc: "There was an error sending the ticket email. Please try again later or contact support.",
              }),
              { status: 500 }
            );
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      });

      return new NextResponse(JSON.stringify({ message: "Save successful" }), {
        status: 200,
      });
    }

    return new NextResponse(
      JSON.stringify({ message: "Payment Save Unsuccessful" }),
      { status: 400 }
    );
  } catch (err: any) {
    console.error("Internal Server Error:", err);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};
