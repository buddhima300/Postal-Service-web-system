const express = require("express");
const {
  uploadController,
  extractController,
  getExtractedText,
  uploadController2,
} = require("../controllers/upload.controller");

const uploadRoute = express.Router();

uploadRoute.post("/upload", uploadController);
uploadRoute.post("/upload2", uploadController2);
uploadRoute.get("/extracted", getExtractedText);

module.exports = uploadRoute;
