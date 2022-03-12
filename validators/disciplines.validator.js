const Joi = require('joi');

const createDiscipline = Joi.object({
  name: Joi.string().min(1).max(60).required(),
});

const updateDiscipline = createDiscipline;

module.exports = {
  createDiscipline,
  updateDiscipline,
};
