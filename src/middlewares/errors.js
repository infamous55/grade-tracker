const { validationResult } = require('express-validator');
const createError = require('http-errors');

function handleParameterErrors() {
  return async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(400, 'Invalid Parameters'));
    }
    next();
  };
}

module.exports = {
  handleParameterErrors,
};
