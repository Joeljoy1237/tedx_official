import { appendToSheet } from "@utils/googlesheets";

export const POST = async (request) => {
  const { name, message, email, phone } = await request.json();

  if (!message) {
    return new Response(
      JSON.stringify({
        message: "Message is required !!",
      }),
      { status: 404 }
    );
  }

  if (!name) {
    return new Response(
      JSON.stringify({
        message: "Name is required !!",
      }),
      { status: 404 }
    );
  }

  if (!email) {
    return new Response(
      JSON.stringify({
        message: "Email is required !!",
      }),
      { status: 404 }
    );
  }
  if (!phone) {
    return new Response(
      JSON.stringify({
        message: "Phone is required !!",
      }),
      { status: 404 }
    );
  }

  const values = [name, message, email, phone];
  try {
    const response = await appendToSheet("Sheet1!A2", [values]);
    return new Response(
      JSON.stringify({
        message: "Thank you 😁",
        desc: "We will soon be in touch",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      { status: 500 }
    );
  }
};
