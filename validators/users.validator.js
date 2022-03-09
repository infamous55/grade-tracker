const Joi = require('joi');

const createUser = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().alphanum().min(1).max(60).required(),
  password: Joi.string().min(1).max(128).required(),
  role: Joi.string().valid('STUDENT', 'TEACHER', 'ADMIN').optional(),
  classId: Joi.number().integer().optional(),
});

const updateUser = Joi.object({
  email: Joi.string().email().optional(),
  name: Joi.string().alphanum().min(1).max(60).optional(),
  password: Joi.string().min(1).max(128).optional(),
  role: Joi.string().valid('STUDENT', 'TEACHER', 'ADMIN').optional(),
  classId: Joi.number().integer().optional(),
}).min(1);

module.exports = {
  createUser,
  updateUser,
};
