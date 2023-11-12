const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const requestDB = require("../db/connection");

const registration = async (email, password) => {
  try {
    const payload = {
      email: email,
    };

    const hashPassword = await bcrypt.hash(password, 10);
    const newAccessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    const newRefreshToken = jwt.sign(payload, SECRET_KEY);
    const query = `INSERT INTO users (accesstoken, refreshtoken, email, password) VALUES ($1, $2, $3, $4)`;
    const values = [newAccessToken, newRefreshToken, email, hashPassword];
    const client = await requestDB();
    await client.query(query, values);
    const newUser = await client.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    client.end(console.log("disconnected from DB!"));

    res.status(201).send({
      message: "the user is registered",
      success: true,
      data: {
        id: newUser.rows[0].id,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (e) {
    throw e;
  }
};

const login = async (email, password) => {
  const client = await requestDB();
  const exists = await client.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  const payload = {
    email: email,
  };
  const newAccessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  const newRefreshToken = jwt.sign(payload, SECRET_KEY);

  const query = `UPDATE users
   SET accesstoken = $1,
      refreshtoken = $2
  WHERE email = $3;`;
  await client.query(query, [newAccessToken, newRefreshToken, email]);

  client.end(console.log("disconnected from DB!"));

  res.status(200).send({
    message: "user logged in successfully",
    success: true,
    data: {
      id: exists.rows[0].id,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    },
  });
};

module.exports = {
  registration,
  login,
};
