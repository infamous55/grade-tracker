const router = require('express').Router();
const classes = require('../controllers/classes.controller');
const auth = require('../middlewares/auth');
const schema = require('../validators/classes.validator');
const validate = require('../middlewares/validate');

router.use(auth('ADMIN'));

router.post('/', validate(schema.createClass), classes.createOne);
router.get('/', classes.getAll);
router.get('/:id', classes.getOne);
router.put('/:id', validate(schema.updateClass), classes.updateOne);
router.delete('/:id', classes.deleteOne);

module.exports = router;
