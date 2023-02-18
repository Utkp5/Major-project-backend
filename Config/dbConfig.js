import mongoose from "mongoose";
mongoose.set('strictQuery', false);


const dbConnect = async () => {

  try {

    await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected Successfully`);

  } catch (error) {

    console.log(`Error in Connecting to mongoDB ${error}`);

  }
};

// module.exports = dbConnect;
export default dbConnect;
