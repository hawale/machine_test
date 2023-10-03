const Joi = require("joi");

const signupSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .message(
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*)"
    )
    .required(),
});

const loginSchema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required(),
});

function validateSignup(data) {
  return signupSchema.validate(data);
}
function validateLogin(data) {
  return loginSchema.validate(data);
}

module.exports = {
  validateSignup,
  validateLogin,
};
