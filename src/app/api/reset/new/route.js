import User from "@models/User";
import { connectToDB } from "@utils/database";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
export const POST = async (request) => {
  try {
    connectToDB();
    const { password, token } = await request.json();
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);

    const user = await User.findOne({ _id: decode.userId });
    console.log(user);

    const encryptedData = CryptoJS.AES.encrypt(
      password,
      process.env.CRYPTO_SECRET_KEY
    ).toString();
    user.resetTokenUsed = true;
    user.resetCount = 0;
    user.password = encryptedData;
    await user.save();
    jwt.sign("", process.env.JWT_SECRET);
    return new Response("Reset sucessfull", { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response("Internal server error", { status: 500 });
  }
};
