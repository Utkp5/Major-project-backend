import express from "express";
const app = express();
const PORT = process.env.PORT || 5000;
import cors from 'cors'
import morgan  from "morgan";




//env
import dotenv from 'dotenv';
dotenv.config();




app.use(express.json());
app.use(cors({origin: true, credentials: true}));
app.use(morgan("dev"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: false }));




//database
import dbConnect from "./Config/dbConfig.js"
dbConnect();




//just for checking...
app.get("/", function (req, res) {
  return res.status(200).send("Major Project working fine...");
});




//User routes
// const authRoute = require("./Routes/authRoute");
import authRoute from "./Routes/authRoute.js";
app.use("/api",authRoute);
import categoryRoute from "./Routes/categoryRoute.js";
app.use("/api/category",categoryRoute);
import productRoute from "./Routes/productRoute.js";
app.use("/api/product", productRoute);





app.listen(PORT, function (error) {
  if (error) {
    console.log(`Error in starting server`);
  }
  console.log(`Server started successfully on PORT : ${PORT}`);
});
