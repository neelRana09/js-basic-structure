const joi = require("joi");

const saveUserSchema = joi.object().keys({
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().optional(),
});

const loginSchema = joi.object().keys({
  password: joi.string().required(),
  email: joi.string().required(),
});

module.exports = { saveUserSchema, loginSchema };