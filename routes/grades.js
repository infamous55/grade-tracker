const router = require('express').Router();
const grades = require('../controllers/grades.controller');
const auth = require('../middlewares/auth');
const schema = require('../validators/grades.validator');
const validate = require('../middlewares/validate');
const { param } = require('express-validator');
const { handleParameterErrors } = require('../middlewares/errors.js');

router.use(auth(['TEACHER', 'ADMIN']));

router.post('/', validate(schema.createGrade), grades.createOne);
router.get('/', grades.getAll);
router.get(
  '/:gradeId',
  param('gradeId').isInt({ min: 1 }),
  handleParameterErrors(),
  grades.getOne
);
router.put(
  '/:gradeId',
  param('gradeId').isInt({ min: 1 }),
  handleParameterErrors(),
  validate(schema.updateGrade),
  grades.updateOne
);
router.delete(
  '/:gradeId',
  param('gradeId').isInt({ min: 1 }),
  handleParameterErrors(),
  grades.deleteOne
);

module.exports = router;
