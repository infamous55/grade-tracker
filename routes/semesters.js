const router = require('express').Router();
const semesters = require('../controllers/semesters.controller');
const auth = require('../middlewares/auth');
const schema = require('../validators/semesters.validator');
const validate = require('../middlewares/validate');

router.use(auth('ADMIN'));

router.post('/', validate(schema.createSemester), semesters.createOne);
router.get('/', semesters.getAll);
router.get('/:id', semesters.getOne);
router.put('/:id', validate(schema.updateSemester), semesters.updateOne);
router.delete('/:id', semesters.deleteOne);

module.exports = router;
