const router = require('express').Router();
const auth = require('./auth');
const users = require('./users');
const createError = require('http-errors');

router.get('/ping', (req, res) => {
  res.status(200).json({ success: true });
});

router.use('/auth', auth);
router.use('/users', users);

router.use((req, res, next) => {
  next(createError.NotFound('Route Not Found'));
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = router;
