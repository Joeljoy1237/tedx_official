import Booking from "@models/Booking";
import { connectToDB } from "@utils/database";
import Razorpay from "razorpay";
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import Ticket from "@models/Ticket";
import { customAlphabet } from 'nanoid';
import User from "@models/User";

interface GroupMember {
  firstName: string;
  lastName: string;
  organisation: string;
  email: string;
  referal_code?: string;
  ticketId?: string;
}

interface RequestBody {
  userId: string;
  count: number;
  referal_code?: string;
  paymentId: string;
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

  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const generateId = customAlphabet(alphabet, 9);
  try {
    const { userId, count, referal_code, paymentId, orderId, group }: RequestBody = await request.json();

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

      const refreredUser = await User.findOne({ referal_code: referal_code });
      if (refreredUser) {
        refreredUser.referals.push(userId);
        refreredUser.wallet += 80;
        await refreredUser.save();
      }

      const currentUser = await User.findOne({ _id: userId });
      if (currentUser.referal_code === "") {
        const referal_code = generateId();
        currentUser.isBought = true;
        currentUser.referal_code = referal_code;
        await currentUser.save();
      }

      const ticket = await Ticket.findOne({ _id: "66bcdf73381f6901e8ed2532" });
      group.forEach((groupMember) => {
        ticket.ticketSold = ticket?.ticketSold + 1;
        ticket.ticketRemaning = ticket?.ticketRemaning - 1;
        groupMember.ticketId = `TEDXCCET/2024/${("00" + ticket.ticketSold).slice(-3)}`
      })

      const amount = paymentData.amount_paid;
      const newBooking = new Booking({
        userId,
        orderId,
        paymentId,
        referal_code,
        count,
        amount,
        group,
      });
      await newBooking.save();
      await ticket.save();


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
                  background-color: #f4f4f4;
                  color: #333;
                }
                .container {
                  width: 90%;
                  margin: auto;
                  max-width: 600px;
                  background-color: #ffffff;
                  border-radius: 10px;
                  padding: 20px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                h2 {
                  color: #eb0028;
                  margin-top: 0;
                }
                p {
                  margin: 0 0 15px;
                  color: #333;
                }
                .footer {
                  text-align: center;
                  margin-top: 30px;
                  padding-top: 20px;
                  border-top: 1px solid #eb0028;
                  color: #333;
                }
                .footer a {
                  color: #eb0028;
                  text-decoration: none;
                  margin: 0 10px;
                }
                .footer p {
                  margin: 5px 0;
                }
                .sponsor {
                  margin-top: 20px;
                  color: #333;
                  font-weight: bold;
                }
                .social-links a {
                  margin: 0 5px;
                  text-decoration: none;
                  color: #eb0028;
                  font-weight: bold;
                }
                .social-links a:hover {
                  text-decoration: underline;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h2>Dear ${data.firstName},</h2>
                <p>Thank you for registering and completing your payment for <b>TEDxCCET</b>. We're thrilled to have you join us for this exciting event!</p>
                <p>You can find your event tickets and additional details in your profile on our registration platform. Simply log in to your account and navigate to the "My Tickets" section to access and download your tickets.</p>
                <p>Should you have any questions or require further assistance, please do not hesitate to reach out to us at <a href="mailto:tedxsupport@carmelcet.in">tedxsupport@carmelcet.in</a>.</p>
                <p>We look forward to welcoming you to TEDxCCET!</p>
                <div class="footer">
                  <p>For support, contact us at <a href="mailto:tedxsupport@carmelcet.in">tedxsupport@carmelcet.in</a> or via WhatsApp: <a href="https://wa.me/917907247909">+91 79072 47909</a></p>
                  <p>Follow us on social media:</p>
                  <p class="social-links">
                    <a href="https://www.facebook.com/people/TEDx-CCET/61563436965963/" target="_blank">Facebook</a> |
                    <a href="https://linkedin.com/in/tedxccet/" target="_blank">LinkedIn</a> |
                    <a href="https://instagram.com/tedxccet" target="_blank">Instagram</a>
                  </p>
                  <p>Visit our website: <a href="https://www.tedxccet.in" target="_blank">www.tedxccet.in</a></p>
                  <!-- <p class="sponsor">Sponsored by: [Your Sponsors]</p> -->
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
                message: "Failed to send Tiicket email",
                desc: "There was an error sending the Booking email. Please try again later or contact support.",
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