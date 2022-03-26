const router = require('express').Router({ mergeParams: true });
const semesters = require('../controllers/semesters.controller');
const auth = require('../middlewares/auth');
const schema = require('../validators/semesters.validator');
const validate = require('../middlewares/validate');
const { param } = require('express-validator');
const { handleParameterErrors } = require('../middlewares/errors.js');

const semesterIdValidation = [
  param('semesterId').isInt({ min: 1 }),
  handleParameterErrors(),
];

router.post(
  '/',
  auth('ADMIN'),
  validate(schema.createSemester),
  semesters.createOne
);
router.get('/', auth(), semesters.getAll);
router.get('/:semesterId', auth(), semesterIdValidation, semesters.getOne);
router.put(
  '/:semesterId',
  auth('ADMIN'),
  semesterIdValidation,
  validate(schema.updateSemester),
  semesters.updateOne
);
router.delete(
  '/:semesterId',
  auth('ADMIN'),
  semesterIdValidation,
  semesters.deleteOne
);
router.use('/:semesterId/grades', semesterIdValidation, require('./grades'));

module.exports = router;
