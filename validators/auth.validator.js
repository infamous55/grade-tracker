const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().alphanum().min(1).max(60).required(),
  password: Joi.string().min(1).max(128).required(),
  role: Joi.string().valid('STUDENT', 'TEACHER', 'ADMIN').optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(1).max(128).required(),
});

const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

module.exports = {
  register: registerSchema,
  login: loginSchema,
  refresh: refreshSchema,
};
