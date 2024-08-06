import jwt from "jsonwebtoken";
import { connectToDB } from "@utils/database";
import User from "@models/User";

export const POST = async (request) => {
  const { token } = await request.json();
  console.log(token);
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  connectToDB();

  const user = await User.findOne({ _id: decode.userId });

  if (user && !user.resetTokenUsed) {
    return new Response("Valid", { status: 202 });
  }

  return new Response("Invalid", { status: 400 });
};
