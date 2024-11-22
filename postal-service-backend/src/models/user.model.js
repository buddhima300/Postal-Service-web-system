const mongoose = require("mongoose");

//creating the schema to create a model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  confirm_password: String,
  enc_key: String,
  public_key: String,
  private_key: String,
});
const encryptionSchema = new mongoose.Schema({
  username: String,
  reciever_public_key: String,
  algorithm: String,
  encrypted_text: String,
});

//creatin the collection in the mongo db
const userModel = mongoose.model("userModel", userSchema);
//creating the collection in the mongo db for encryption data store
const encryptionModel = mongoose.model("encryptionModel", encryptionSchema);
module.exports = { userModel, encryptionModel };
