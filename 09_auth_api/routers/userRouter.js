const express = require("express");
const router = express.Router();

const {
    asyncWrapper,
  } = require("../helpers/apiHelpers");

const { getCurrentUser } = require("../controllers/getController");

router.get("/me",  asyncWrapper(getCurrentUser)); 

module.exports = { userRouter: router };