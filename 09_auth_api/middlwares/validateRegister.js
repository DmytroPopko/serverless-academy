const { requestDB } = require("../db/connection");

const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  return regex.test(password);
};
const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const validateRegister = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .send({ success: false, error: "All fields must be filled" });
    return;
  }

  if (!validatePassword(password)) {
    res.status(400).send({
      success: false,
      error:
        "The password must contain at least one lowercase letter, one uppercase letter, one number and be at least 8 characters long.",
    });
    return;
  }

  if (!validateEmail(email)) {
    res.status(400).send({
      success: false,
      error: "The entered Email does not correspond to the format of the email address",
    });
    return;
  }

  const client = await requestDB();

  const exists = await client.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  client.end(console.log("Disconnected from DB!"));
  if (exists.rows.length > 0) {
    res
      .status(409)
      .send({ success: false, error: "A user with this email already exists" });
    return;
  }

  next();
};

module.exports = validateRegister;