import Booking from "@models/Booking";
import User from "@models/User";
import { connectToDB } from "@utils/database"

export const POST = async (request: any) => {
    try {
        await connectToDB();
        const { id } = await request.json();

        const user = await User.findOne({ _id: id });
        const booking = await Booking.findOne({ userId: id });
        const group = !booking ? [] : booking?.group;
        console.log(booking)
        console.log(group)
        if (!user) {
            return new Response(JSON.stringify({ message: "User not Found", desc: "Redirecting to login page" }), { status: 404 });
        }
        return new Response(JSON.stringify({ user, group }), { status: 200 });


    } catch (e) {
        console.log(e);

        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}