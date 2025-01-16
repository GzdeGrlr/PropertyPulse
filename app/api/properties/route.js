import connectDb from "@/config/database";
import Property from "@/models/Property";

export const GET = async () => {
  try {
    await connectDb();
    const properties = await Property.find({}).lean();
    return new Response(
      JSON.stringify(properties, {
        status: 200,
      })
    );
  } catch (error) {
    return new Response("Something went very", { status: 500 });
  }
};
