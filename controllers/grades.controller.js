const service = require('../services/grades.service');
const createError = require('http-errors');

const getOptions = require('../utils/options');
const getId = require('../utils/id');

class gradeController {
  static async createOne(req, res, next) {
    try {
      const grade = await service.createOne({
        data: { ...req.body, teacherId: req.user.id },
      });
      res.status(201).json(grade);
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }

  static async getAll(req, res, next) {
    try {
      const options = getOptions(req);
      const grades = await service.getAll({ options });

      res.status(200).json(grades);
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }

  static async getOne(req, res, next) {
    try {
      const id = getId(req);
      const grade = await service.getOne({ data: { id } });

      res.status(200).json(grade);
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }

  static async updateOne(req, res, next) {
    try {
      const id = getId(req);
      const grade = await service.updateOne({
        data: { id, ...req.body, teacherId: req.user.id },
      });

      res.status(200).json(grade);
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

module.exports = gradeController;
