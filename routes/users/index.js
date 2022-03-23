const router = require('express').Router();

router.use('/', require('./users'));
router.use('/:userId/grades', require('./grades'));

module.exports = router;
