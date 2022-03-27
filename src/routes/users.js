const router = require('express').Router({ mergeParams: true });
const users = require('../controllers/users.controller');
const auth = require('../middlewares/auth');
const schema = require('../validators/users.validator');
const validate = require('../middlewares/validate');
const { param } = require('express-validator');
const { handleParameterErrors } = require('../middlewares/errors.js');
const addParams = require('../middlewares/params.js');

const userIdValidation = [
  param('userId').isInt({ min: 1 }),
  handleParameterErrors(),
];

router.post(
  '/',
  auth('ADMIN'),
  addParams,
  validate(schema.createUser),
  users.createOne
);
router.get('/', auth(), users.getAll);
router.get('/me', auth(), (req, res) => res.redirect(req.user.id));
router.get('/:userId', auth(), userIdValidation, users.getOne);
router.put(
  '/me',
  auth(),
  validate(schema.updateCurrentUser),
  users.updateCurrent
);
router.put(
  '/:userId',
  auth('ADMIN'),
  userIdValidation,
  validate(schema.updateUser),
  users.updateOne
);
router.delete('/:userId', auth('ADMIN'), userIdValidation, users.deleteOne);
router.use('/:userId/grades', userIdValidation, require('./grades'));

module.exports = router;
