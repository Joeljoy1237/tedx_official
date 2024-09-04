import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import Booking from '@models/Booking';

// Create email transporter using nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: Request): Promise<Response> {
  try {
    const { email, firstName, lastName, bookingId, personId } = await request.json();

    if (!email || !firstName || !lastName || !bookingId || !personId) {
      return new Response(
        JSON.stringify({ message: 'All fields are required (email, firstName, lastName, bookingId, personId)' }),
        { status: 400 }
      );
    }

    const booking = await Booking.findById(bookingId);
    booking.confirmationMailSent = true
    await booking.save();

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
        background-image: url('https://firebasestorage.googleapis.com/v0/b/tedxccet.appspot.com/o/assets%2FWhatsApp%20Image%202024-08-17%20at%2007.35.16.jpeg?alt=media&token=8fc04ca9-dce3-4f01-97b7-c015b5074743');
        background-size: cover;
        background-position: center;
        border-radius: 10px;
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
        padding: 30px 20px;
        background-image: url('https://firebasestorage.googleapis.com/v0/b/tedxccet.appspot.com/o/assets%2FWhatsApp%20Image%202024-08-17%20at%2007.41.38.jpeg?alt=media&token=7a3519c0-690c-47c8-b686-7d972bf82534');
        background-size: cover;
        color: #ffffff;
        border-radius: 10px;
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
      .content h2 {
        color: #eb0028;
        margin-top: 0;
      }
      .content p {
        color: #ffffff;
        line-height: 1.6;
      }
         .red {
          color: #eb0028;
        }
      .download-button {
        display: inline-block;
        padding: 0px 20px;
        margin-top: 20px;
        background-color: #eb0028;
        color: #ffffff;
        font-weight: bold;
        border-radius: 5px;
        text-decoration: none;
      }
      .download-button-wrap {
        text-decoration: none;
        color: #ffffff;
      }
      .footer {
        background-color: #000000;
        padding: 20px;
        border-top: 1px solid #333333;
        text-align: center;
        border-radius: 10px;
      }
      .footer a {
        color: #eb0028;
        text-decoration: none;
      }
      .footer p {
        margin: 5px 0;
        color: #ffffff;
      }
      .sponsors-section {
        margin: 30px 0;
        text-align: center; /* Center the logos horizontally */
      }
      .sponsor-logo {
        display: inline-block;
        margin: 10px 15px;
        vertical-align: middle; /* Ensures logos are vertically aligned */
      }
      .sponsor-title {
        font-size: 16px;
        margin-bottom: 10px;
        color: #ffffff;
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
          <h2>Dear ${firstName} ${lastName},</h2>
          <p>
            Thank you for investing your time and trust in us! We look forward to having
            you join us at this exciting event, where we aim to inspire, engage, and
            share groundbreaking ideas.
          </p>
          <p>Kindly download your ticket by clicking the button below:</p>
          <a class="download-button" href="https://tedxccet.in/tickets/${bookingId}/${personId}" target="_blank">
          <p class="download-button-wrap">
            Download Ticket
            </p>
          </a>
          <p>
            For any queries, contact <a href="mailto:tedxsupport@carmelcet.in" style="color: #eb0028;">tedxsupport@carmelcet.in</a>.
          </p>

          <!-- Sponsors Section -->
          <div class="sponsors-section">
            <div class="sponsor-title">Title Sponsor:</div>
            <img class="sponsor-logo" src="https://tedxccet.in/_next/image?url=%2Fsponsors%2Fal-muqtadir.png&w=256&q=75" alt="Title Sponsor" width="120">

            <div class="sponsor-title">Banking Partner:</div>
            <img class="sponsor-logo" src="https://tedxccet.in/_next/image?url=%2Fsponsors%2Ffederalbanklogo.png&w=256&q=75" alt="Banking Partner" width="120">

            <div class="sponsor-title">Co-Sponsors:</div>
            <img class="sponsor-logo" src="https://tedxccet.in/_next/image?url=%2Fsponsors%2Flichfl.png&w=256&q=75" alt="Co-Sponsor" width="80">
            <img class="sponsor-logo" src="https://tedxccet.in/_next/image?url=%2Fsponsors%2Fobcydians.png&w=256&q=75" alt="Co-Sponsor" width="80">
            <img class="sponsor-logo" src="https://tedxccet.in/_next/image?url=%2Fsponsors%2Falmiya.jpg&w=256&q=75" alt="Co-Sponsor" width="80">
            <img class="sponsor-logo" src="https://tedxccet.in/_next/image?url=%2Fsponsors%2Faudiomatrix.jpg&w=256&q=75" alt="Co-Sponsor" width="80">
          </div>
        </div>
        <div class="footer">
          <p>
            Contact: <a href="mailto:tedxsupport@carmelcet.in">tedxsupport@carmelcet.in</a> | WhatsApp:
            <a href="https://wa.me/917907247909" style="color: #eb0028;">+91 79072 47909</a>
          </p>
          <p>© 2024 TEDxCCET</p>
        </div>
      </div>
    </div>
  </body>
</html>

      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: 'Failed to send email', error: error.message }), { status: 500 });
  }
}
