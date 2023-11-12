const express = require("express");

const validateLogin = require("../middlwares/validateLogin");
const validateRegister = require("../middlwares/validateRegister");

const router = express.Router();

const {
  asyncWrapper,
} = require("../helpers/apiHelpers");

const {
    registrationController,
    loginController
  } = require("../controllers/authController");

router.post("/sign-up", validateRegister, asyncWrapper(registrationController));
router.post("/sign-in", validateLogin, asyncWrapper(loginController));

module.exports = { authRouter: router };
