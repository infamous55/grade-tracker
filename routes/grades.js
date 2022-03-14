const router = require('express').Router();
const grades = require('../controllers/grades.controller');
const auth = require('../middlewares/auth');
const schema = require('../validators/grades.validator');
const validate = require('../middlewares/validate');

router.use(auth(['TEACHER', 'ADMIN']));

router.post('/', validate(schema.createGrade), grades.createOne);
router.get('/', grades.getAll);
router.get('/:id', grades.getOne);
router.put('/:id', validate(schema.updateGrade), grades.updateOne);
router.delete('/:id', grades.deleteOne);

module.exports = router;
