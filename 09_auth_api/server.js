const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const cors = require("cors");

const app = express();

const { authRouter } = require("./routers/authRouter");
const { userRouter } = require("./routers/userRouter");
const { errorHandler } = require("./helpers/apiHelpers");

PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use("/api/auth", authRouter);
app.use("api/", userRouter);
app.use(errorHandler);

const start = async () => {
  try {
    app.listen(PORT, (err) => {
      if (err) {
        console.error("error at server launch: ", err);
      }
      console.log(`Server works at port ${PORT}!`);
    });
  } catch (err) {
    console.error("error at server launch: ", err);
  }
};

start();
