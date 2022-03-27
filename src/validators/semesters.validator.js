const Joi = require('joi');

const createSemester = Joi.object({
  yearId: Joi.number().integer().positive().required(),
  number: Joi.number().integer().positive().required(),
});

const updateSemester = Joi.object({
  yearId: Joi.number().integer().positive().optional(),
  number: Joi.number().integer().positive().optional(),
}).min(1);

module.exports = {
  createSemester,
  updateSemester,
};
