const Joi = require('joi');

const createUser = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().alphanum().min(1).max(60).required(),
  password: Joi.string().min(1).max(128).required(),
  role: Joi.string().valid('STUDENT', 'TEACHER', 'ADMIN').optional(),
  classId: Joi.number().integer().optional(),
});

module.exports = {
  createUser,
};
