const service = require('../services/users.service');
const createError = require('http-errors');

const getOptions = require('../utils/options');
const getId = require('../utils/id');

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
      const id = getId(req);
      const user = await service.getOne({ data: { id } });

      res.status(200).json(user);
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }

  static async updateOne(req, res, next) {
    try {
      const id = getId(req);
      const user = await service.updateOne({ data: { id, ...req.body } });

      res.status(200).json(user);
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }

  static async updateCurrent(req, res, next) {
    try {
      const id = req.user.id;
      const user = await service.updateOne({ data: { id, ...req.body } });

      res.status(200).json(user);
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }

  static async deleteOne(req, res, next) {
    try {
      const id = getId(req);
      await service.deleteOne({ data: { id } });

      res.status(204).send();
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }
}

module.exports = usersController;
