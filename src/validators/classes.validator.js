const Joi = require('joi');

const createClass = Joi.object({
  yearId: Joi.number().integer().positive().required(),
  number: Joi.number().integer().positive().required(),
  letter: Joi.string().length(1).uppercase().required(),
});

const updateClass = Joi.object({
  yearId: Joi.number().integer().positive().optional(),
  number: Joi.number().integer().positive().optional(),
  letter: Joi.string().length(1).uppercase().optional(),
}).min(1);

module.exports = {
  createClass,
  updateClass,
};
