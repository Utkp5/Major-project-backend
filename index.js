const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const logger = require("morgan");


//env
const dotenv = require("dotenv");
dotenv.config();




app.use(express.json());
app.use(cors({origin: true, credentials: true}));
app.use(logger("dev"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: false }));




//database
const dbconfig = require("./Config/dbConfig");
dbconfig();




//just for checking...
app.get("/", function (req, res) {
  return res.status(200).send("Major Project working fine...");
});




app.listen(PORT, function (error) {
  if (error) {
    console.log(`Error in starting server`);
  }
  console.log(`Server started successfully on PORT : ${PORT}`);
});
