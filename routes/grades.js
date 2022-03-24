const router = require('express').Router({ mergeParams: true });
const grades = require('../controllers/grades.controller');
const auth = require('../middlewares/auth');
const schema = require('../validators/grades.validator');
const validate = require('../middlewares/validate');
const { param } = require('express-validator');
const { handleParameterErrors } = require('../middlewares/errors.js');

const gradeIdValidation = [
  param('gradeId').isInt({ min: 1 }),
  handleParameterErrors(),
];

router.post(
  '/',
  auth(['TEACHER', 'ADMIN']),
  validate(schema.createGrade),
  grades.createOne
);
router.get('/', auth(), grades.getAll);
router.get('/:gradeId', auth(), gradeIdValidation, grades.getOne);
router.put(
  '/:gradeId',
  auth(['TEACHER', 'ADMIN']),
  gradeIdValidation,
  validate(schema.updateGrade),
  grades.updateOne
);
router.delete(
  '/:gradeId',
  auth(['TEACHER', 'ADMIN']),
  gradeIdValidation,
  grades.deleteOne
);

module.exports = router;
