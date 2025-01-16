"use server";
import connectDb from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";

async function addProperty(formData) {
  //access al values from amenities and images
  //whatever the name property is in the form data
  //getAll is for multiple values, get is for single values
  await connectDb();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("You must be logged in to add a property");
  }

  const { userId } = sessionUser; //destructure the userId from the sessionUser object

  const amenities = formData.getAll("amenities");
  console.log("Amenities:", amenities);
  const images = formData.getAll("images").filter((image) => image.name !== "");

  const properyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("street"),
      city: formData.get("city"),
      state: formData.get("state"),
      zipcode: formData.get("zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities,
    rates: {
      nightly: formData.get("rates.nightly"),
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
    images,
  };

  //upload images to cloudinary
  const imageUrls = [];
  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    //convert the image to base64
    const base64Image = imageData.toString("base64");
    //make request to cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Image}`,
      {
        folder: "propertypulse",
      }
    );
    imageUrls.push(result.secure_url);
  }
  properyData.images = imageUrls;
  const newProperty = new Property(properyData);
  await newProperty.save();

  revalidatePath("/", "layout");
  redirect(`/properties/${newProperty._id}`);
}
export default addProperty;
