const router = require('express').Router({ mergeParams: true });
const grades = require('../../controllers/grades.controller');

const redirect = (req, res) => {
  res.redirect(`/grades/${req.params.gradeId}`);
};

router.get('/', grades.getAll);
router.get('/:gradeId', redirect);
router.put('/:gradeId', redirect);
router.delete('/:gradeId', redirect);

module.exports = router;
