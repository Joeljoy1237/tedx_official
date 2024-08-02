import NextAuth from "next-auth";
import CryptoJS from "crypto-js";
import Credentials from "next-auth/providers/credentials";

import User from "@models/User";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        await connectToDB();
        if (credentials === null) return null;

        try {
          const userExist = await User.findOne({ email: credentials?.email });

          if (userExist) {
            const bytes = CryptoJS.AES.decrypt(
              userExist.password,
              process.env.CRYPTO_SECRET_KEY!
            );
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            const isMatch = decryptedData === credentials?.password;
            if (isMatch) {
              console.log(userExist);

              return userExist;
            } else {
              throw new Error("Email or Password is not correct");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session?.user?.email });
      session.user!.id = sessionUser._id.toString();

      return session;
    },
  },
});

export { handler as GET, handler as POST };
