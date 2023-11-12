const jwt = require("jsonwebtoken");
const { requestDB } = require("../db/connection");
const { SECRET_KEY } = process.env;

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || token === "") {
    res.status(401).send({ success: false, error: "Not authorized" });

    return;
  }

  try {
    const { email } = jwt.verify(token, SECRET_KEY);

    const client = await requestDB();
    const exists = await client.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    client.end(console.log("Disconnected from DB!"));

    const { accesstoken, refreshtoken } = exists.rows[0];

    if (!exists.rows.length > 0 || !accesstoken) {
      res.status(401).send({ success: false, error: "Not authorized" });
      return;
    }

    if (accesstoken === token || refreshtoken === token) {
      next();
    } else {
      res.status(401).send({ success: false, error: "Not authorized" });
    }
  } catch {
    res.status(401).send({ success: false, error: "Not authorized" });
  }
};

module.exports = {
  authMiddleware,
};
