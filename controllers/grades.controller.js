const service = require('../services/grades.service');
const createError = require('http-errors');

const getOptions = require('../utils/options');

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
      const userId = parseInt(req.params.userId);
      const grades = await service.getAll({ options, data: { userId } });

      res.status(200).json(grades);
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }

  static async getOne(req, res, next) {
    try {
      const gradeId = parseInt(req.params.gradeId);
      const grade = await service.getOne({ data: { gradeId } });

      res.status(200).json(grade);
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }

  static async updateOne(req, res, next) {
    try {
      const gradeId = parseInt(req.params.gradeId);
      const grade = await service.updateOne({
        data: { gradeId, ...req.body, teacherId: req.user.id },
      });

      res.status(200).json(grade);
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }

  static async deleteOne(req, res, next) {
    try {
      const gradeId = parseInt(req.params.gradeId);
      await service.deleteOne({ data: { gradeId } });

      res.status(204).send();
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }
}

module.exports = gradeController;
