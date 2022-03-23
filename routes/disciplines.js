const router = require('express').Router();
const disciplines = require('../controllers/disciplines.controller');
const auth = require('../middlewares/auth');
const schema = require('../validators/disciplines.validator');
const validate = require('../middlewares/validate');
const { param } = require('express-validator');
const { handleParameterErrors } = require('../middlewares/errors.js');

router.use(auth('ADMIN'));

router.post('/', validate(schema.createDiscipline), disciplines.createOne);
router.get('/', disciplines.getAll);
router.get(
  '/:disciplineId',
  param('disciplineId').isInt({ min: 1 }),
  handleParameterErrors(),
  disciplines.getOne
);
router.put(
  '/:disciplineId',
  param('disciplineId').isInt({ min: 1 }),
  handleParameterErrors(),
  validate(schema.updateDiscipline),
  disciplines.updateOne
);
router.delete(
  '/:disciplineId',
  param('disciplineId').isInt({ min: 1 }),
  handleParameterErrors(),
  disciplines.deleteOne
);

module.exports = router;
