const service = require('../services/classes.service');
const createError = require('http-errors');

const getOptions = require('../utils/options');
const getId = require('../utils/id');

class classController {
  static async createOne(req, res, next) {
    try {
      const createdClass = await service.createOne({ data: req.body });
      res.status(201).json({ ...createdClass });
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }

  static async getAll(req, res, next) {
    try {
      const options = getOptions(req);
      const classes = await service.getAll({ options });

      res.status(200).json(classes);
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }

  static async getOne(req, res, next) {
    try {
      const id = getId(req);
      const selectedClass = await service.getOne({ data: { id } });

      res.status(200).json({ ...selectedClass });
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }

  static async updateOne(req, res, next) {
    try {
      const id = getId(req);
      const updatedClass = await service.updateOne({
        data: { id, ...req.body },
      });

      res.status(200).json({ ...updatedClass });
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

module.exports = classController;
