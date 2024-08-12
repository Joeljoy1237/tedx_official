import Ticket from "@models/Ticket";
import { connectToDB } from "@utils/database";
import Razorpay from "razorpay";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const POST = async (request) => {
  const { userId, count, orderId, group } = await request.json();
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
      const payAmount = paymentData.amount_paid;
      const newTicket = new Ticket({
        userId,
        orderId,
        count,
        payAmount,
        group,
      });
      newTicket.save();

      group.map((data) => {
        const mailOptions = {
          from: process.env.EMAIL,
          to: data.email,
          subject: "TEDxCCET Ticket",
          text: `${data.firstName} ${data.lastName} ${data.organisation}`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.error("Error sending email:", error);
            return new Response(
              JSON.stringify({
                message: "Failed to send reset email",
                desc: "There was an error sending the ticket email. Please try again later or contact support.",
              }),
              { status: 500 }
            );
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      });

      return new Response(JSON.stringify({ message: "Save sucessful" }), {
        status: 200,
      });
    }
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
