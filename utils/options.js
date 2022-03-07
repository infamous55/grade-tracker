module.exports = (req) => {
  const options = {};

  if (req.query.sort === 'asc' || req.query.sort === 'desc')
    options.sort = req.query.sort;

  const take = parseInt(req.query.take);
  const skip = parseInt(req.query.skip);

  if (!isNaN(take)) {
    options.take = take;
    options.skip = isNaN(skip) ? 0 : skip;
  }

  return options;
};
