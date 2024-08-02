import User from "@models/User";
import { connectToDB } from "@utils/database";
import CryptoJS from "crypto-js";

export const POST = async (request: any) => {
    const { email, password } = await request.json();
    try {
        await connectToDB()
        const existUser = await User.findOne({ email });
        const encryptedData = CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET_KEY!).toString();
        if (existUser) {
            return new Response("User exist", { status: 409 });
        } else {
            const newUser = new User({ email: email, password: encryptedData })
            await newUser.save();
            return new Response(JSON.stringify(newUser), { status: 201 })
        }




    } catch (err) {
        console.error(err);
    }
}


