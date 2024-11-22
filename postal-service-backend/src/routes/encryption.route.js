const express = require("express");
const {
  RSAencryptionController,
  decryptionController,
} = require("../controllers/encryption.controller");
const encryptRoute = express.Router();

encryptRoute.post("/encryption", RSAencryptionController);
encryptRoute.post("/decryption", decryptionController);

module.exports = encryptRoute;
