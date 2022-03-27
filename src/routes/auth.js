const router = require('express').Router();
const user = require('../controllers/auth.controller');
const schema = require('../validators/auth.validator');
const validate = require('../middlewares/validate');

router.post('/login', validate(schema.login), user.login);
router.post('/refresh', validate(schema.refresh), user.refresh);

module.exports = router;
