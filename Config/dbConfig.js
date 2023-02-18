const mongoose = require("mongoose");

const dbConnect = async () => {

  try {

    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected Successfully ${conn.connection.host}`);

    useUnifiedTopology: true;
    useNewUrlParser: true;

  } catch (error) {

    console.log(`Error in Connecting to mongoDB ${error}`);
    
  }
};

module.exports = dbConnect;
