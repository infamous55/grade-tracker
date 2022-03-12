const router = require('express').Router();
const disciplines = require('../controllers/disciplines.controller');
const auth = require('../middlewares/auth');
const schema = require('../validators/disciplines.validator');
const validate = require('../middlewares/validate');

router.use(auth('ADMIN'));

router.post('/', validate(schema.createDiscipline), disciplines.createOne);
router.get('/', disciplines.getAll);
router.get('/:id', disciplines.getOne);
router.put('/:id', validate(schema.updateDiscipline), disciplines.updateOne);
router.delete('/:id', disciplines.deleteOne);

module.exports = router;
