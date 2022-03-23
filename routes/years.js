const router = require('express').Router();
const years = require('../controllers/years.controller');
const auth = require('../middlewares/auth');
const schema = require('../validators/years.validator');
const validate = require('../middlewares/validate');
const { param } = require('express-validator');
const { handleParameterErrors } = require('../middlewares/errors.js');

router.post('/', auth('ADMIN'), validate(schema.createYear), years.createOne);
router.get('/', auth(), years.getAll);
router.get(
  '/:yearId',
  auth(),
  param('yearId').isInt({ min: 1 }),
  handleParameterErrors(),
  years.getOne
);
router.put(
  '/:yearId',
  auth('ADMIN'),
  param('yearId').isInt({ min: 1 }),
  handleParameterErrors(),
  validate(schema.updateYear),
  years.updateOne
);
router.delete(
  '/:yearId',
  auth('ADMIN'),
  param('yearId').isInt({ min: 1 }),
  handleParameterErrors(),
  years.deleteOne
);

module.exports = router;
