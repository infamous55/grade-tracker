const service = require('../services/classes.service');
const createError = require('http-errors');

const getOptions = require('../utils/options');

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
      const classId = parseInt(req.params.classId);
      const selectedClass = await service.getOne({ data: { classId } });

      res.status(200).json({ ...selectedClass });
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }

  static async updateOne(req, res, next) {
    try {
      const classId = parseInt(req.params.classId);
      const updatedClass = await service.updateOne({
        data: { classId, ...req.body },
      });

      res.status(200).json({ ...updatedClass });
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }

  static async deleteOne(req, res, next) {
    try {
      const classId = parseInt(req.params.classId);
      await service.deleteOne({ data: { classId } });

      res.status(204).send();
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }
}

module.exports = classController;
