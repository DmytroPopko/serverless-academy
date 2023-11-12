const { asyncWrapper } = require("../helpers/apiHelpers");
const { requestDB } = require("../db/connection");

const getCurrentUser = async (req, res) => {
  const { authorization } = req.headers;
  const [bearer, token] = authorization.split(" ");

  const { email } = jwt.verify(token, SECRET_KEY);

  const client = await requestDB();
  const exists = await client.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  client.end(console.log("Disconnected from DB!"));

  res.status(200).send({
    message: "get user",
    success: true,
    data: {
      id: exists.rows[0].id,
      email: exists.rows[0].email,
    },
  });
};

module.exports = {
  getCurrentUser: asyncWrapper(getCurrentUser),
};
