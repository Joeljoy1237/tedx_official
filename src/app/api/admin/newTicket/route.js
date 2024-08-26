export async function POST(request) {
  const { firstName, lastName, email, organisation, designation } =
    await request.json();
  if (!firstName || !lastName || !email || !organisation || !designation) {
    new Response(JSON.stringify({ message: "Enter all required details" }), {
      status: 400,
    });
    try {
    } catch (err) {
      console.log(err);
      new Response(JSON.stringify({ message: "Internal Server Error" }), {
        status: 500,
      });
    }
  }
}
