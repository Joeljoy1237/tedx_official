import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// Create email transporter using nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail', // You can use any email service like Gmail, Outlook, etc.
  auth: {
    user: process.env.EMAIL, // Your email from environment variables
    pass: process.env.EMAIL_PASSWORD, // Your email password
  },
});

export async function POST(request: Request): Promise<Response> {
  try {
    const { email, firstName, lastName } = await request.json();

    // Validate that all necessary fields are provided
    if (!email || !firstName || !lastName) {
      return new Response(
        JSON.stringify({ message: 'All fields are required (email, firstName, lastName)' }),
        { status: 400 }
      );
    }

    // Email options
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Your TEDxCCET Ticket Confirmation',
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
              max-width: 700px;
              margin: auto;
              background-color: #333;
              padding: 20px;
              border-radius: 10px;
            }
            .header {
              text-align: center;
              padding: 20px;
              background-color: #eb0028;
              border-radius: 10px;
            }
            .header h1 {
              color: #ffffff;
              margin: 0;
            }
            .content {
              padding: 20px;
            }
            .content h2 {
              color: #eb0028;
            }
            .footer {
              text-align: center;
              padding: 20px;
              margin-top: 20px;
              background-color: #000000;
              border-radius: 10px;
              color: #ffffff;
            }
            .footer a {
              color: #eb0028;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="wrap">
              <div class="header">
                <h1><span class="tedx-text red">TEDx</span><span class="ccet-text">CCET</span></h1>
                <p>Your Ticket Confirmation</p>
              </div>
              <div class="content">
                <h2 class="name">Dear ${firstName} ${lastName},</h2>
                <p>Thank you for registering for <b><span class="tedx-text">TEDx</span><span class="ccet-text">CCET</span></b>! We're thrilled to have you join us.</p>
                <p>Please log in to access your tickets in the "My Tickets" section.</p>
              </div>
              <div class="footer">
                <p>Contact us: <a href="mailto:tedxsupport@carmelcet.in">tedxsupport@carmelcet.in</a></p>
                <p>Visit our website: <a href="https://www.tedxccet.in">www.tedxccet.in</a></p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });
  } catch (error:any) {
    return new Response(JSON.stringify({ message: 'Failed to send email', error: error.message }), { status: 500 });
  }
}
