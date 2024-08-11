import Razorpay from "razorpay";
export const GET = async (request, { params }) => {
  const id = params.id;
  console.log(id);
  const razorpay = new Razorpay({
    key_id: process.env.RAZOR_KEY_ID,
    key_secret: process.env.RAZOR_KEY_SECRET,
  });
  try {
    const payment = await razorpay.payments.fetch(id);
    if (payment) {
      return new Response(JSON.stringify(payment), { status: 200 });
    }
    throw new Error("Error");
  } catch (err) {
    console.log(err);
    return new Response("error", { status: 500 });
  }
};
