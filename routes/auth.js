const router = require('express').Router();
const user = require('../controllers/auth.controller');
const schema = require('../validators/auth.validator');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');

router.post(
  '/register',
  auth('ADMIN'),
  validate(schema.register),
  user.register
);
router.post('/login', validate(schema.login), user.login);
router.post('/refresh', validate(schema.refresh), user.refresh);

module.exports = router;
