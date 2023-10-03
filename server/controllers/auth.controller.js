const userModel = require("../models/User");
const { getToken } = require("../utils/token");
const {
  validateSignup,
  validateLogin,
} = require("../payload-validator/auth-validator");
const bcrypt = require("bcrypt");

async function signup(req, res) {
  try {
    const { error } = validateSignup(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const { userName } = req.body;
    const user = await userModel.findOne({ userName });

    if (user) {
      return res.status(409).send({ error: "User name already exists" });
    }

    await userModel(req.body).save();

    res.status(201).send({ message: "User signup successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const { error } = validateLogin(req.body);

    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const { userName, password } = req.body;
    const user = await userModel.findOne({ userName });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    const token = getToken(user.toObject());
    const userData = { ...user.toObject(), token };
    delete userData.password;
    res
      .status(200)
      .send({ data: userData, message: "User login successfully" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

module.exports = {
  signup,
  login,
};
