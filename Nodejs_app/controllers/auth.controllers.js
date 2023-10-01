const userModel = require("../models/User");
const { getToken } = require("../utils/token");
const {
  validateSingup,
  validateLogin,
} = require("../payload-validator/auth-validator");
const bcrypt = require("bcrypt");

async function singup(req, res) {
  try {
    const { error } = validateSingup(req.body);
    if (error) throw error.details[0].message;

    const { userName } = req.body;
    const user = await userModel.findOne({ userName });

    if (user) throw "User name already exist";

    await userModel(req.body).save();

    res.status(200).send({ message: "User singup successfully" });
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
}

async function login(req, res) {
  try {
    const { error } = validateLogin(req.body);

    if (error) throw error.details[0].message;
    const { userName, password } = req.body;
    const user = await userModel.findOne({ userName });

    if (!user) throw "User not found";
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw "Invalid credentials";
    
    const token = getToken(user.toObject());
    let userData = { ...user.toObject(), token };
    delete userData.password;
    res
      .status(200)
      .send({ data: userData, message: "User login successfully" });
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
}

module.exports = {
  singup,
  login,
};
