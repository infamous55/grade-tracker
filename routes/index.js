const router = require('express').Router();
const createError = require('http-errors');

router.get('/ping', (req, res) => {
  res.status(200).json({ success: true });
});

router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/years', require('./years'));
router.use('/semesters', require('./semesters'));
router.use('/disciplines', require('./disciplines'));
router.use('/classes', require('./classes'));

router.use((req, res, next) => {
  next(createError.NotFound('Route Not Found'));
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = router;
