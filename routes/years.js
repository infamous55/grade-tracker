const router = require('express').Router();
const years = require('../controllers/years.controller');
const auth = require('../middlewares/auth');
const schema = require('../validators/years.validator');
const validate = require('../middlewares/validate');

router.use(auth('ADMIN'));

router.post('/', validate(schema.createYear), years.createOne);
router.get('/', years.getAll);
router.get('/:id', years.getOne);
router.put('/:id', validate(schema.updateYear), years.updateOne);
router.delete('/:id', years.deleteOne);

module.exports = router;
