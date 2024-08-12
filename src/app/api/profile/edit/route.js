import User from "@models/User";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  try {
    const { userId, firstName, lastName, organisation } = await request.json();
    if (!userId) {
      return new Response(
        JSON.stringify({ message: "Please Enter the userId" }),
        { status: 404 }
      );
    }
    await connectToDB();

    const user = await User.findOne({
      _id: userId,
    });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }
    user.firstName = firstName;
    user.lastName = lastName;
    user.organisation = organisation;
    await user.save();
    return new Response(JSON.stringify({ message: "Edit Sucessful" }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};
