const Joi = require('joi');

const createGrade = Joi.object({
  studentId: Joi.number().integer().positive().required(),
  semesterId: Joi.number().integer().positive().required(),
  disciplineId: Joi.number().integer().positive().required(),
  value: Joi.number().precision(2).positive().min(1).max(10).required(),
});

const updateGrade = Joi.object({
  studentId: Joi.number().integer().positive().optional(),
  semesterId: Joi.number().integer().positive().optional(),
  disciplineId: Joi.number().integer().positive().optional(),
  value: Joi.number().precision(2).positive().min(1).max(10).optional(),
}).min(1);

module.exports = {
  createGrade,
  updateGrade,
};
