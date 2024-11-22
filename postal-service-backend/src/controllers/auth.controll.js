const uuid = require("uuid");
//get the NODE-RSA library to encrypt using RSA algorithm
var NodeRSA = require("node-rsa");

// importing access managing package to add user token
var jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.model");

// control the signup of the user
exports.signupController = async (req, res) => {
  try {
    const { username, email } = req.body;

    // Check if a user with the same username or email already exists
    const existingUser = await userModel.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username or Email already exists. Please try another.",
      });
    }

    const uniqueId = uuid.v4();
    // console.log(uniqueId);
    const key = new NodeRSA({ b: 2048 });
    //Create Private and Public keys
    // Export keys in PEM format
    const publicKey = key.exportKey("public"); // Store this public key in the database
    const privateKey = key.exportKey("private"); // Store this private key in the database

    // console.log(privateKey, publicKey);
    // Create a new instance for encryption using the public key
    // const encryptor = new NodeRSA(publicKey, "public");

    // // Encrypt a message
    // const encrypted = encryptor.encrypt("This is a secret message", "base64");
    // console.log("Encrypted:", encrypted);

    // // Create a new instance for decryption using the private key
    // const decryptor = new NodeRSA(privateKey, "private");

    // // Decrypt the message
    // const decrypted = decryptor.decrypt(encrypted, "utf8");
    // console.log("Decrypted:", decrypted);

    // create new user in the database
    const addUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      confirm_password: req.body.confirmPassword,
      enc_key: uniqueId,
      public_key: publicKey,
      private_key: privateKey, // store the private key in the database
    });

    await userModel.create(addUser);

    res.status(200).json(addUser);
  } catch (error) {
    console.log("error is : ", error);
  }
};

// in here we will control the login of the user

exports.loginController = async (req, res) => {
  //creating the try catch block to handle the errors instead of using js promises
  try {
    // taking the values from the user
    const { email, password } = req.body;
    // await untill the response coming for the request
    //checking the user from email
    var user = await userModel.findOne({ email: email });

    // check whether user is available
    if (user) {
      if (user.password === password) {
        //now check user password and response password
        //then issue web token to access managment
        var token = jwt.sign(
          { id: user.id, email: user.email }, //when sign in we pass the objects in the data
          process.env.JWT_SECRET, // secondly we pass the secret key in the .env file
          { expiresIn: "15m" } // setup access token expires in 15 mins
        );
        // console.log(token);
        res.status(200).json({
          accessToken: token, //we send the token when sending a response
          user: {
            userName: user.username,
            email: user.email,
            primaryKey: user.enc_key,
            publicKey: user.public_key,
            privateKey: user.private_key,
          }, // sending the users objects as parameters with the token to identify users
        });
      } else {
        res.status(401).json("check your password"); // if the user entered password is incorrect
      }
    } else {
      res.status(401).json("check your email"); //if the user entered email was incorrect
    }

    //then check whether user enter value and database values are same
  } catch (error) {
    console.log("error has occured during the login", error);
    res.status(500).json({ error: error });
  }
};

//controlling the session by token
exports.sessionController = (req, res) => {
  // get the token from the request headers according to user
  const token = req.headers.authorization.split(" ")[1];
  //  console.log(token); // check by printing the token and it is splitted from the space to identify the key

  //if there is no token, return 403 error (Error code for user not authorized to perform the operation)
  if (!token) {
    return res.status(403).json("Access denied, no token found");
  }
  //verify the token
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      // attach the user info to request
      req.user = decoded;
      res.status(200).json("Valid session");
    } catch (error) {
      res.status(403).json("Invalid or expired token");
    }
  }
};
