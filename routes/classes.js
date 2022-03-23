const router = require('express').Router();
const classes = require('../controllers/classes.controller');
const auth = require('../middlewares/auth');
const schema = require('../validators/classes.validator');
const validate = require('../middlewares/validate');
const { param } = require('express-validator');
const { handleParameterErrors } = require('../middlewares/errors.js');

router.post(
  '/',
  auth('ADMIN'),
  validate(schema.createClass),
  classes.createOne
);
router.get('/', auth(), classes.getAll);
router.get(
  '/:classId',
  auth(),
  param('classId').isInt({ min: 1 }),
  handleParameterErrors(),
  classes.getOne
);
router.put(
  '/:classId',
  auth('ADMIN'),
  param('classId').isInt({ min: 1 }),
  handleParameterErrors(),
  validate(schema.updateClass),
  classes.updateOne
);
router.delete(
  '/:classId',
  auth('ADMIN'),
  param('classId').isInt({ min: 1 }),
  handleParameterErrors(),
  classes.deleteOne
);

module.exports = router;
