require("dotenv").config();
const jwt = require("jsonwebtoken");

const authorizedToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Missing authorization header" });
  }
  const accessToken = authHeader.split(" ")[1];
  if (!accessToken) {
    return res.status(401).json({ message: "Missing access token" });
  }
  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid access token" });
  }
};

module.exports = authorizedToken;
