const Joi = require("@hapi/joi");

signUpValidation = data => {
  const regSchema = Joi.object({
    username: Joi.string()
      .required()
      .min(4),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
      .min(6)
  });
  return regSchema.validate(data);
};
loginValidation = data => {
  const logSchema = Joi.object({
    username: Joi.string()
      .required()
      .min(4),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
      .min(6)
  });
  return logSchema.validate(data);
};

module.exports.loginValidation = loginValidation;
module.exports.signUpValidation = signUpValidation;
