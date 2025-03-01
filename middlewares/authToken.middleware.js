const jwt = require("jsonwebtoken");
require("dotenv").config();
const { USER_TOKEN_SECRET } = require("../configs/constants.config");

const authenticateUserToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(400).json({ success: false, message: "No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Extract the actual token after "Bearer"
  if (!token) {
    return res.status(401).json({ success: false, message: "Invalid token format." });
  }

  jwt.verify(token, USER_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ success: false, message: "Invalid token." });
    }
    req.user = decoded;
    //console.log(req.user)
    next();
  });
};

module.exports = { authenticateUserToken };
