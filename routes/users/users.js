const router = require('express').Router();
const users = require('../../controllers/users.controller');
const auth = require('../../middlewares/auth');
const schema = require('../../validators/users.validator');
const validate = require('../../middlewares/validate');
const { param } = require('express-validator');
const { handleParameterErrors } = require('../../middlewares/errors.js');

router.post('/', auth('ADMIN'), validate(schema.createUser), users.createOne);
router.get('/', auth(), users.getAll);
router.get('/me', auth(), (req, res) => res.redirect(req.user.id));
router.get(
  '/:userId',
  auth(),
  param('userId').isInt({ min: 1 }),
  handleParameterErrors(),
  users.getOne
);
router.put(
  '/me',
  auth(),
  validate(schema.updateCurrentUser),
  users.updateCurrent
);
router.put(
  '/:userId',
  auth('ADMIN'),
  param('userId').isInt({ min: 1 }),
  handleParameterErrors(),
  validate(schema.updateUser),
  users.updateOne
);
router.delete(
  '/:userId',
  auth('ADMIN'),
  param('userId').isInt({ min: 1 }),
  handleParameterErrors(),
  users.deleteOne
);

module.exports = router;
