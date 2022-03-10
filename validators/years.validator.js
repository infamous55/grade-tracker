const JoiImport = require('joi');
const JoiDate = require('@joi/date');

const Joi = JoiImport.extend(JoiDate);

const dateFormats = ['YYYY/MM/DD', 'YYYY-MM-DD', 'DD-MM-YYYY', 'DD/MM/YYYY'];

const createYear = Joi.object({
  startDate: Joi.date().format(dateFormats).required(),
  endDate: Joi.date().format(dateFormats).required(),
});

const updateYear = Joi.object({
  startDate: Joi.date().format(dateFormats).optional(),
  endDate: Joi.date().format(dateFormats).optional(),
}).min(1);

module.exports = {
  createYear,
  updateYear,
};
