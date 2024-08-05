import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import User from "@models/User";
import { connectToDB } from "@utils/database";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const resetRequest = async (request) => {
  try {
    connectToDB();
    const { email } = await request.json();
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Email not found");
    }
    if (user.resetCount >= 3) {
      return new Response(JSON.stringify({ message: "Failed" }), {
        status: 501,
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    }); //Generate Token
    const resetPassUrl = `http://localhost:3000/reset/${token}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset your TedxCCET Password",
      html: `
        <a href = ${resetPassUrl}>Click here</a>
        `,
    };
    user.resetTokenUsed = false;
    user.resetCount = user.resetCount || 0 + 1;
    await user.save();

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("error here");

        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    return new Response(JSON.stringify({ message: "sucess" }), { status: 200 });
  } catch (err) {
    console.log(err);
  }
};

export { resetRequest as POST };
