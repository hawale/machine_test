require("dotenv").config();
const jwt = require("jsonwebtoken");

const getToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET);
};

module.exports = {
  getToken,
};
