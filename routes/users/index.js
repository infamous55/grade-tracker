const router = require('express').Router();
const { param } = require('express-validator');
const { handleParameterErrors } = require('../../middlewares/errors.js');

router.use('/', require('./users'));
router.use(
  '/:userId/grades',
  param('userId').isInt({ min: 1 }),
  handleParameterErrors(),
  require('./grades')
);

module.exports = router;
