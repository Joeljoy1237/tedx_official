import User from "@models/User";
import { connectToDB } from "@utils/database"
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
    try {
        connectToDB();


        const { id } = await request.json();

        const user = await User.findOne({ _id: id });
        if (!user) {
            return NextResponse.json("User not found", { status: 404 });
        }
        return new Response(JSON.stringify(user), { status: 200 });

    } catch (e) {
        console.log(e);

        return NextResponse.json(e, { status: 400 });
    }
}