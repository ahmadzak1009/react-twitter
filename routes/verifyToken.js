const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const header = req.header("Authorization");
  if (!header) return res.status(401).send("access denied");

  const bearer = header.split(" ");
  const token = bearer[1];

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = verifyToken;
