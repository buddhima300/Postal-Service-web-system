const express = require("express");
const {
  loginController,
  signupController,
  sessionController,
} = require("../controllers/auth.controll");
const { keyGenerator } = require("../controllers/uuid.control");

const authRouter = express.Router();

authRouter.post("/signin", loginController);
authRouter.post("/signup", signupController);
authRouter.get("/session", sessionController);

module.exports = authRouter;
