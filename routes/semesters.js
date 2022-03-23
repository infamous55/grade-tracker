const router = require('express').Router();
const semesters = require('../controllers/semesters.controller');
const auth = require('../middlewares/auth');
const schema = require('../validators/semesters.validator');
const validate = require('../middlewares/validate');
const { param } = require('express-validator');
const { handleParameterErrors } = require('../middlewares/errors.js');

router.use(auth('ADMIN'));

router.post('/', validate(schema.createSemester), semesters.createOne);
router.get('/', semesters.getAll);
router.get(
  '/:semesterId',
  param('semesterId').isInt({ min: 1 }),
  handleParameterErrors(),
  semesters.getOne
);
router.put(
  '/:semesterId',
  param('semesterId').isInt({ min: 1 }),
  handleParameterErrors(),
  validate(schema.updateSemester),
  semesters.updateOne
);
router.delete(
  '/:semesterId',
  param('semesterId').isInt({ min: 1 }),
  handleParameterErrors(),
  semesters.deleteOne
);

module.exports = router;
