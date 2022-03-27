const addParams = (req, res, next) => {
  const parameters = [
    'userId',
    'semesterId',
    'disciplineId',
    'classId',
    'yearId',
  ];

  parameters.forEach((parameter) => {
    if (req.params[parameter])
      req.body[parameter] = parseInt(req.params[parameter]);
  });

  next();
};

module.exports = addParams;
