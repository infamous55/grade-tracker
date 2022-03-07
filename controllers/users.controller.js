const service = require('../services/users.service');
const createError = require('http-errors');

const getOptions = require('../utils/options');

class usersController {
  static async createOne(req, res, next) {
    try {
      const user = await service.createOne({ data: req.body });
      res.status(201).json(user);
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }

  static async getAll(req, res, next) {
    try {
      const options = getOptions(req);
      const users = await service.getAll({ options });

      res.status(200).json({ users });
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }

  static async getOne(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) throw createError.BadRequest('Invalid User Id');

      const user = await service.getOne({ data: { id } });

      res.status(200).json(user);
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }
}

module.exports = usersController;
