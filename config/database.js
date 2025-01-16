import mongoose from "mongoose";

let connected = false;

const connectDb = async () => {
  mongoose.set("strictQuery", true);

  //If the database is already connected, return the existing connection, and dont connect again
  if (connected) {
    console.log("MongoDB already connected");
    return;
  }

  //Connect to the database
  try {
    //connect yöntemi asenkrondur ve await ile beklenir, bu yüzden try-catch bloğu içine alınır
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Varsayılan 30 saniyeden daha az olabilir
      socketTimeoutMS: 45000,
    });
    connected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDb;
