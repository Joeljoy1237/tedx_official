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
            subject: "Welcome To TEDxCCET",
            text: `Hello ${firstName + " " + lastName},\n\n Welcome to TEDxCCET`,
            html: `
              <h1>Welcome To TEDxCCET</h1>
            `,
        };

        // transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //         console.error("Error sending email:", error);
        //     } else {
        //         console.log("New user mail send to ", email);
        //     }
        // });

        return new Response(
            JSON.stringify({ message: "Registered successfully", desc: "Redirecting to login page", user: newUser }),
            { status: 201 }
        );
    } catch (err: any) {
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
};
