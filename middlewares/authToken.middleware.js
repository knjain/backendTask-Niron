const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  USER_TOKEN_SECRET,
} = require("../configs/constants.config");

const authenticateUserToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "No token provided." });
  }

  jwt.verify(token, USER_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res
        .status(401)
        .json({ success: false, message: "Invalid token." });
    }
    // console.log(decoded);

    req.user = decoded;
    next();
  });
};
module.exports = {
  authenticateUserToken,
};
