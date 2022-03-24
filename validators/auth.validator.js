const Joi = require('joi');

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(1).max(128).required(),
});

const refresh = Joi.object({
  refreshToken: Joi.string().required(),
});

module.exports = {
  login,
  refresh,
};
