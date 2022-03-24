const router = require('express').Router();
const disciplines = require('../controllers/disciplines.controller');
const auth = require('../middlewares/auth');
const schema = require('../validators/disciplines.validator');
const validate = require('../middlewares/validate');
const { param } = require('express-validator');
const { handleParameterErrors } = require('../middlewares/errors.js');

const disciplineIdValidation = [
  param('disciplineId').isInt({ min: 1 }),
  handleParameterErrors(),
];

router.post(
  '/',
  auth('ADMIN'),
  validate(schema.createDiscipline),
  disciplines.createOne
);
router.get('/', auth(), disciplines.getAll);
router.get(
  '/:disciplineId',
  auth(),
  disciplineIdValidation,
  disciplines.getOne
);
router.put(
  '/:disciplineId',
  auth('ADMIN'),
  disciplineIdValidation,
  validate(schema.updateDiscipline),
  disciplines.updateOne
);
router.delete(
  '/:disciplineId',
  auth('ADMIN'),
  disciplineIdValidation,
  disciplines.deleteOne
);

module.exports = router;
