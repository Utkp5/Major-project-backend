const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const dotenv = require("dotenv");
dotenv.config();

app.get("/", function (req, res) {
  return res.status(200).send("Major Project working fine...");
});

app.listen(PORT, function (error) {
  if (error) {
    console.log(`Error in starting server`);
  }
  console.log(`Server started successfully on PORT : ${PORT}`);
});
