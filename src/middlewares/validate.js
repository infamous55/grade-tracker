const createError = require('http-errors');
const Joi = require('joi');

function validate(validator) {
  return async (req, res, next) => {
    try {
      const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
      };

      const validatedBody = await validator.validateAsync(req.body, options);
      req.body = validatedBody;

      next();
    } catch (e) {
      if (Joi.isError(e)) return next(createError(422, { message: e.message }));
      else next(createError.InternalServerError());
    }
  };
}

module.exports = validate;
