import Ticket from "@models/Ticket";
import { connectToDB } from "@utils/database";
import Razorpay from "razorpay";
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server"; // Assuming you're using Next.js
import { generatePDF } from "@utils/CreateTicket";

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

      for (const data of group) {
        // Generate PDF
        const mailOptions = {
          from: process.env.EMAIL,
          to: data.email,
          subject: "Your TEDxCCET Ticket Confirmation",
          html: `
            <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #000000;
                  color: #00000;
                }
                .container {
                  width: 90%;
                  margin: auto;
                  max-width: 600px;
                  border-radius: 10px;
                  padding: 20px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h2 {
                  color: #ffffff;
                }
                p {
                  margin: 0 0 10px;
                  color: #ffffff;
                }
                .footer {
                  text-align: center;
                  margin-top: 20px;
                  padding-top: 20px;
                  border-top: 1px solid #ffffff;
                }
                .footer a {
                  color: #ffffff;
                  text-decoration: none;
                  margin: 0 10px;
                }
                .footer p {
                  margin: 5px 0;
                }
                .sponsor {
                  margin-top: 20px;
                  color: #ffffff;
                  font-weight: bold;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h2>Dear ${data.firstName},</h2>
                <p>Thank you for registering and completing your payment for TEDxCCET. We're thrilled to have you join us for this exciting event!</p>
                <p>You can find your event tickets and additional details in your profile on our registration platform. Simply log in to your account and navigate to the "My Tickets" section to access and download your tickets.</p>
                <p>Should you have any questions or require further assistance, please do not hesitate to reach out to us at <a href="mailto:tedxsupport@carmelcet.in">tedxsupport@carmelcet.in</a>.</p>
                <p>We look forward to welcoming you to TEDxCCET!</p>
                <div class="footer">
                  <p>For support, contact us at <a href="mailto:tedxsupport@carmelcet.in">tedxsupport@carmelcet.in</a></p>
                  <p>Follow us on social media:</p>
                  <p>
                    <a href="https://facebook.com/tedxccet" target="_blank">Facebook</a> |
                    <a href="https://twitter.com/tedxccet" target="_blank">Twitter</a> |
                    <a href="https://instagram.com/tedxccet" target="_blank">Instagram</a>
                  </p>
                  <p class="sponsor">Sponsored by: [Your Sponsors]</p>
                </div>
              </div>
            </body>
            </html>
          `,
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
      }

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