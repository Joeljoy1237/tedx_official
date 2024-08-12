import Razorpay from "razorpay";
export const POST = async (request) => {
  const { count, offer, lastPrice } = await request.json();

  const razorpay = new Razorpay({
    key_id: process.env.RAZOR_KEY_ID,
    key_secret: process.env.RAZOR_KEY_SECRET,
  });

  if (lastPrice !== 1200 * count - 1200 * count * (offer / 100)) {
    return new Response(JSON.stringify({ message: "Security Compromise" }), {
      status: 403,
    });
  }

  const options = {
    amount: lastPrice * 100,
    currency: "INR",
    receipt: "#receipt",
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);
    return new Response(JSON.stringify(response));
  } catch (err) {
    console.log(err);

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
