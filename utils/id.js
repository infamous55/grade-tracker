const createError = require('http-errors');

module.exports = (req) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) throw createError.BadRequest('Invalid Id');

  return id;
};
