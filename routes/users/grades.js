const router = require('express').Router({ mergeParams: true });
const grades = require('../../controllers/grades.controller');

router.get('/', grades.getAll);
router.get('/:gradeId', (req, res) => {
  res.redirect(`/grades/${req.params.gradeId}`);
});

module.exports = router;
