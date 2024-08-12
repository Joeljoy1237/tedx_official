import CryptoJS from "crypto-js";
export const POST = async (request) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await request.json();
    // console.log(await request.json());
    console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature);

    const generateKey = CryptoJS.HmacSHA256(
      `${razorpay_order_id}|${razorpay_payment_id}`,
      process.env.RAZOR_KEY_SECRET
    ).toString(CryptoJS.enc.Hex);
    console.log(generateKey);

    if (generateKey !== razorpay_signature) {
      return new Response(
        JSON.stringify({ message: "Payment Unsucessful" }, { status: 404 })
      );
    }
    return new Response(
      JSON.stringify({ message: "Payment sucessful" }, { status: 200 })
    );
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Internal server Error" }), {
      status: 500,
    });
  }
};
