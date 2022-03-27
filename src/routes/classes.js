const router = require('express').Router();
const classes = require('../controllers/classes.controller');
const auth = require('../middlewares/auth');
const schema = require('../validators/classes.validator');
const validate = require('../middlewares/validate');
const { param } = require('express-validator');
const { handleParameterErrors } = require('../middlewares/errors.js');

const classIdValidation = [
  param('classId').isInt({ min: 1 }),
  handleParameterErrors(),
];

router.post(
  '/',
  auth('ADMIN'),
  validate(schema.createClass),
  classes.createOne
);
router.get('/', auth(), classes.getAll);
router.get('/:classId', auth(), classIdValidation, classes.getOne);
router.put(
  '/:classId',
  auth('ADMIN'),
  classIdValidation,
  validate(schema.updateClass),
  classes.updateOne
);
router.delete('/:classId', auth('ADMIN'), classIdValidation, classes.deleteOne);
router.use('/:classId/users', classIdValidation, require('./users'));

module.exports = router;
