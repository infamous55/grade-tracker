const router = require('express').Router({ mergeParams: true });
const grades = require('../../controllers/grades.controller');
const auth = require('../../middlewares/auth');
const schema = require('../../validators/grades.validator');
const validate = require('../../middlewares/validate');

const redirect = (req, res) => {
  res.redirect(`/grades/${req.params.gradeId}`);
};

router.get('/', auth(), grades.getAll);
router.get('/:gradeId', redirect);
router.put('/:gradeId', validate(schema.updateGrade), redirect);
router.delete('/:gradeId', redirect);

module.exports = router;
