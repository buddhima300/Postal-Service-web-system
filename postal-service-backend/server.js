require("dotenv").config();
//importing the express js to create rest API s
var express = require("express");
//importing the middleware- body parser to read the objects as json format
var bodyParser = require("body-parser");

//importing the cors to gain access
var cors = require("cors");

//establishing the mongoose database connection
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/postoffice";

const connection = async () => {
  try {
    await mongoose.connect(url);
    console.log("database connection is successful");
  } catch (error) {
    console.log("error: ", error);
  }
};
connection(); //calling the database connection

const authRouter = require("./src/routes/auth.route");
const uploadRoute = require("./src/routes/upload.route");
const encryptRoute = require("./src/routes/encryption.route");
var app = express();
app.use(express.json());

//following will directed to the routing of the authenication
app.use("/auth", cors(), authRouter);
// following are directed to the routes of encryption and decryptions
app.use("/api", cors(), uploadRoute);
app.use("/api", cors(), encryptRoute);

// Serve static files from the 'uploads' directory so that files can be accessed via URL
app.use("/uploads", express.static("uploads"));

//creating the server
const PORT = process.env.PORT;
app.listen(PORT, function () {
  console.log(`Express App running at http://127.0.0.1:${PORT}/`);
});
