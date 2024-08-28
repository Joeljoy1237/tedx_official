import SupportTicket from "@models/SupportTicket";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer"; // Import nodemailer
import User from "@models/User";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// POST API route to reply to a support ticket
export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    // Parse the request body
    const { userId, ticketId, sender, content, status } = await request.json();

    // Find the user
    const user = await User.findById(userId);
    console.log(user)
    // Validate input
    if (!ticketId || !sender || !content) {
      return new NextResponse(
        JSON.stringify({ message: "Ticket ID, sender, and content are required" }),
        { status: 400 }
      );
    }

    // Ensure sender is either "user" or "support"
    if (!["user", "support"].includes(sender)) {
      return new NextResponse(
        JSON.stringify({ message: "Sender must be either 'user' or 'support'" }),
        { status: 400 }
      );
    }

    // Find the ticket by ID
    const ticket = await SupportTicket.findById(ticketId);
    if (!ticket) {
      return new NextResponse(
        JSON.stringify({ message: "Support ticket not found" }),
        { status: 404 }
      );
    }

    // If the sender is an admin, allow status change
    if (status) {
      // Validate status
      const validStatuses = ["open", "in-progress", "resolved", "closed"];
      if (!validStatuses.includes(status)) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid status" }),
          { status: 400 }
        );
      }
      ticket.status = status;
    }

    // Add the new message to the ticket
    ticket.messages.push({
      sender,
      content,
      timestamp: new Date(),
    });

    // Update the ticket with the new message
    await ticket.save();

    // Prepare email options
    const mailOptions = {
      from: process.env.EMAIL,
      to: user?.email,
      subject: "Support Ticket Update",
      html: `
        <html>
        <body>
          <p>Dear ${user?.firstName} ${user?.lastName},</p>
          <p>We wanted to let you know that there has been an update to your support ticket.</p>
          <div style="
            border: 1px solid #dddddd;
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
          ">
            <p><strong>Message:</strong></p>
            <p>${content}</p>
          </div>
          <p>If you have any further questions or need additional support, please do not hesitate to reach out to us.</p>
          <p>Best regards,<br>TEDxCCET Support Team</p>
        </body>
        </html>
      `,
    };
    

    // Send the email
    if(sender === "support"){
      try {
        await transporter.sendMail(mailOptions);
      } catch (error) {
        console.error("Error sending email:", error);
        return new NextResponse(
          JSON.stringify({
            message: "Failed to send Ticket email",
            desc: "There was an error sending the Booking email. Please try again later or contact support.",
          }),
          { status: 500 }
        );
      }
    }

    return new NextResponse(
      JSON.stringify({ message: "Reply added successfully" }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error handling support ticket reply:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error: " + error.message }),
      { status: 500 }
    );
  }
};
