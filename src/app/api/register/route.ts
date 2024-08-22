// pages/api/register.ts
import User from "@models/User";
import nodemailer, { Transporter } from "nodemailer";
import { connectToDB } from "@utils/database";
import CryptoJS from "crypto-js";

const transporter: Transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const POST = async (request: any) => {

    const { firstName, lastName, email, mobile, organisation, designation, password } = await request.json();

    if (!firstName && !lastName && !email && !mobile && !organisation && !password && !designation) {
        return new Response(
            JSON.stringify({ message: "Please fill the required fields" }),
            { status: 400 }
        );
    }

    if (!firstName) {
        return new Response(
            JSON.stringify({ message: "First name is required", desc: "Kindly fill and try again" }),
            { status: 400 }
        );
    }
    if (!lastName) {
        return new Response(
            JSON.stringify({ message: "Last name is required" }),
            { status: 400 }
        );
    } else if (!email) {
        return new Response(
            JSON.stringify({ message: "Email is required" }),
            { status: 400 }
        );
    } else if (!mobile) {
        return new Response(
            JSON.stringify({ message: "Mobile number is required" }),
            { status: 400 }
        );
    } else if (!organisation) {
        return new Response(
            JSON.stringify({ message: "Organisation is required" }),
            { status: 400 }
        );
    } else if (!designation) {
        return new Response(
            JSON.stringify({ message: "Designation is required" }),
            { status: 400 }
        );
    } else if (!password) {
        return new Response(
            JSON.stringify({ message: "Password is required" }),
            { status: 400 }
        );
    }

    try {
        await connectToDB();

        const existUser = await User.findOne({ email });
        if (existUser) {
            return new Response(
                JSON.stringify({ message: "User already exists", desc: "Try another email" }),
                { status: 409 }
            );
        }
        const resetLockUntil = Date.now();
        const encryptedData = CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET_KEY!).toString();
        const newUser = new User({
            firstName,
            lastName,
            email,
            mobile,
            organisation,
            designation,
            password: encryptedData,
            resetLockUntil,
        });
        await newUser.save();


        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Welcome to TEDxCCET - Your Journey Begins!",
            html: `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to TEDxCCET</title>
                <style>
                  body {
                    font-family: 'Helvetica', Arial, sans-serif;
                    background-color: #000000;
                    color: #ffffff;
                    margin: 0;
                    padding: 0;
                  }
                  .container {
                    width: 100%;
                    max-width: 650px;
                    margin: 0 auto;
                    padding: 20px;
                    animation: fadeIn 1s ease-in-out;
                  }
                  .header {
                    background-color: #eb0028;
                    padding: 25px;
                    text-align: center;
                    border-radius: 10px;
                  }
                  .header h1 {
                    color: #ffffff;
                    margin: 0;
                    font-size: 36px;
                    letter-spacing: 2px;
                  }
                  .content {
                    background-color: #ffffff;
                    color: #000000;
                    padding: 25px;
                    border-radius: 10px;
                    margin-top: 20px;
                    line-height: 1.8;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                  }
                  .content h2 {
                    color: #eb0028;
                    font-size: 28px;
                  }
                  .content p {
                    font-size: 16px;
                    margin-bottom: 20px;
                  }
                  .cta {
                    text-align: center;
                    margin: 30px 0;
                  }
                  .btn {
                    display: inline-block;
                    padding: 14px 22px;
                    background-color: #eb0028;
                    color: #ffffff;
                    font-size: 16px;
                    border-radius: 5px;
                    text-decoration: none;
                    font-weight: bold;
                    transition: background-color 0.3s;
                  }
                  .btn:hover {
                    background-color: #c00023;
                  }
                  .quote-box {
                    background-color: #f4f4f4;
                    border-left: 4px solid #eb0028;
                    padding: 15px;
                    margin-top: 30px;
                    font-style: italic;
                    font-size: 18px;
                    color: #555;
                  }
                  .footer {
                    text-align: center;
                    color: #888888;
                    font-size: 12px;
                    margin-top: 40px;
                  }
                  .social-links {
                    margin: 20px 0;
                  }
                  .social-links a {
                    text-decoration: none;
                    color: #ffffff;
                    margin: 0 10px;
                    padding: 8px 16px;
                    background-color: #eb0028;
                    border-radius: 4px;
                    display: inline-block;
                    transition: background-color 0.3s ease;
                  }
                  .social-links a:hover {
                    background-color: #c00023;
                  }
                  @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>Welcome to TEDxCCET!</h1>
                  </div>
                  <div class="content">
                    <h2>Welcome to TEDxCCET, ${firstName}!</h2>
                    <p>
                      We’re excited to have you join the TEDxCCET community! Your account has been successfully created and you’re now ready to dive into a world of ideas worth spreading.
                    </p>
                    <p>
                      At TEDxCCET, you’ll have the opportunity to stay updated on our latest events, discover inspiring talks, and connect with like-minded individuals. We're here to spark meaningful conversations and inspire growth.
                    </p>
                    <p>
                      Stay tuned for upcoming events and exciting opportunities to get involved. Your journey with TEDxCCET is just beginning, and we’re thrilled to have you with us.
                    </p>
                    <p><strong>Welcome aboard!</strong></p>
                    <div class="cta">
                      <a href="https://tedxccet.in/login" class="btn">Access Your Account</a>
                    </div>
                    <div class="quote-box">
                      <p>"The best way to predict the future is to create it." – Abraham Lincoln</p>
                    </div>
                  </div>
                  <div class="footer">
                    <p>Follow us on social media and stay connected:</p>
                    <div class="social-links">
                      <a href="https://www.instagram.com/tedxccet" target="_blank">Instagram</a>
                      <a href="https://www.facebook.com/tedxccet" target="_blank">Facebook</a>
                      <a href="https://www.linkedin.com/company/tedxccet" target="_blank">LinkedIn</a>
                    </div>
                    <p>&copy; 2024 TEDxCCET. All rights reserved.</p>
                  </div>
                </div>
              </body>
              </html>
            `,
          };
          

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error("Error sending email:", error);
            } else {
                console.log("New user mail send to ", email);
            }
        });

        return new Response(
            JSON.stringify({ message: "Registered successfully", desc: "Redirecting to login page", user: newUser }),
            { status: 201 }
        );
    } catch (err: any) {
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
};
