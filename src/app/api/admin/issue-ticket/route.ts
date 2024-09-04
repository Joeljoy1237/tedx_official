import Booking from "@models/Booking";
import Ticket from "@models/Ticket";
import User from "@models/User";
import { connectToDB } from "@utils/database";
import nodemailer from "nodemailer"; // Import nodemailer
import { NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const POST = async (request: Request) => {
    try {
        // Connect to the database
        await connectToDB();

        // Extract data from the request body
        const { userId, amount, isStudent } = await request.json();

        // Check if the required fields are provided
        if (!userId || !amount) {
            return new NextResponse(
                JSON.stringify({ message: "Missing required fields" }),
                { status: 400 }
            );
        }

        // Fetch the user details
        const user = await User.findById(userId);
        if (!user) {
            return new NextResponse(
                JSON.stringify({ message: "User not found" }),
                { status: 404 }
            );
        }
        
        // Fetch the ticket and update it
        const ticket = await Ticket.findById("66bcdf73381f6901e8ed2532");
        if (!ticket) {
            return new NextResponse(
                JSON.stringify({ message: "Ticket not found" }),
                { status: 404 }
            );
        }
        
        // Prepare user details for the group array
        const userGroup = {
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email,
            isStudent: isStudent || false,
            organisation: user.organisation || "",
            designation: user.designation || "",
            checkedIn: false,
            ticketId: "",
        };
        
        // Update ticket details
        ticket.ticketSold = (ticket.ticketSold || 0) + 1;
        ticket.ticketRemaning = (ticket.ticketRemaning || 0) - 1;
        userGroup.ticketId = `TEDXCCET/2024/${("00" + ticket.ticketSold).slice(-3)}`;
        user.isBought = true;
        await user.save();
        await ticket.save();

        // Create a new booking
        const booking = new Booking({
            userId,
            orderId: "By Manual",
            paymentId: "By Manual",
            referal_code: "NILL",
            count: 1,
            confirmationMailSent:true,
            amount,
            group: [userGroup],
        });

        // Save the booking to the database
        await booking.save();

        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: "Your TEDxCCET Ticket Confirmation",
            html: `
            <html>
            <head>
                <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                    background-color: #000000;
                    color: #ffffff;
                }
                .container {
                    width: 100%;
                    max-width: 800px;
                    margin: auto;
                    background-image: url('https://firebasestorage.googleapis.com/v0/b/tedxccet.appspot.com/o/assets%2FWhatsApp%20Image%202024-08-17%20at%2007.35.16.jpeg?alt=media&token=8fc04ca9-dce3-4f01-97b7-c015b5074743');
                    background-size: cover;
                    background-position: center;
                    border-radius: 10px;
                    overflow: hidden;
                    padding: 20px;
                }
                .wrap {
                    width: 100%;
                    max-width: 600px;
                    margin: auto;
                    background-color: rgba(0, 0, 0, 0.8);
                    padding: 20px;
                    text-align: center;
                    border-radius: 10px;
                }
                .header {
                    background-image: url('https://firebasestorage.googleapis.com/v0/b/tedxccet.appspot.com/o/assets%2FWhatsApp%20Image%202024-08-17%20at%2007.41.38.jpeg?alt=media&token=7a3519c0-690c-47c8-b686-7d972bf82534');
                    background-size: cover;
                    background-position: center;
                    padding: 30px 20px;
                    border-radius: 10px;
                    text-align: center;
                    color: #ffffff;
                }
                .header h1 {
                    font-size: 24px;
                    font-weight: bold;
                    margin: 0;
                    color: #ffffff;
                }
                .header p {
                    font-family: 'Brush Script MT', cursive;
                    font-size: 36px;
                    margin: 10px 0 0;
                }
                .content {
                    padding: 20px;
                }
                .content h2 {
                    color: #eb0028;
                    margin-top: 0;
                }
                .content p {
                    margin: 0 0 15px;
                    color: #fff;
                    line-height: 1.6;
                }
                .content .tedx-text {
                    font-weight: bold;
                    color: #eb0028;
                }
                .content .ccet-text {
                    font-weight: bold;
                    color: #ffffff;
                }
                .social-links {
                    text-align: center;
                    margin: 20px 0;
                }
                .social-links a {
                    margin: 0 10px;
                    text-decoration: none;
                    color: #ffffff;
                    font-weight: bold;
                }
                .social-links a:hover {
                    text-decoration: underline;
                }
                .footer {
                    background-color: #000000;
                    padding: 20px;
                    text-align: center;
                    border-top: 1px solid #333333;
                    border-radius: 10px;
                }
                .footer a {
                    color: #eb0028;
                    text-decoration: none;
                    margin: 0 10px;
                }
                .footer p {
                    margin: 5px 0;
                    color: #fff;
                }
                .red {
                    color: #eb0028;
                }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="wrap">
                        <div class="header">
                            <h1><b><span class="tedx-text red">TEDx</span><span class="ccet-text">CCET</span></b></h1>
                            <p>Your Ticket Confirmation</p>
                        </div>
                        <div class="content">
                            <h2>Dear ${user?.firstName} ${user?.lastName},</h2>
                            <p>Thank you for registering and completing your payment for <b><span class="tedx-text">TEDx</span><span class="ccet-text">CCET</span></b>. We're thrilled to have you join us for this exciting event!</p>
                            <p>You can find your event tickets and additional details in your profile on our registration platform. Simply log in to your account and navigate to the "My Tickets" section to access and download your tickets.</p>
                            <p>Should you have any questions or require further assistance, please do not hesitate to reach out to us at <a href="mailto:tedxsupport@carmelcet.in" style="color: #eb0028;">tedxsupport@carmelcet.in</a>.</p>
                            <p>We look forward to welcoming you to <b><span class="tedx-text">TEDx</span><span class="ccet-text">CCET</span></b>!</p>
                        </div>
                        <div class="social-links">
                            <a href="https://www.facebook.com/people/TEDx-CCET/61563436965963/" target="_blank">Facebook</a> |
                            <a href="https://linkedin.com/in/tedxccet/" target="_blank">LinkedIn</a> |
                            <a href="https://instagram.com/tedxccet" target="_blank">Instagram</a>
                        </div>
                        <div class="footer">
                            <p>For support, contact us at <a href="mailto:tedxsupport@carmelcet.in">tedxsupport@carmelcet.in</a> or via WhatsApp: <a href="https://wa.me/917907247909" style="color: #eb0028;">+91 79072 47909</a></p>
                            <p>Visit our website: <a href="https://www.tedxccet.in" target="_blank">www.tedxccet.in</a></p>
                            <p><a href="#">Terms and Conditions</a> | <a href="#">Privacy Policy</a> | <a href="#">Refund Policy</a></p>
                            <p>© Copyright 2024 | Crafted by TEDxCCET</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            `,
        };

        // Send the email
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

        // Return the newly created booking
        return new NextResponse(
            JSON.stringify(booking),
            { status: 201 }
        );
    } catch (err) {
        console.error("Error creating booking:", err);
        return new NextResponse(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500 }
        );
    }
};
