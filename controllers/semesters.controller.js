const service = require('../services/semesters.service');
const createError = require('http-errors');

const getOptions = require('../utils/options');

class semestersController {
  static async createOne(req, res, next) {
    try {
      const semester = await service.createOne({ data: req.body });
      res.status(201).json(semester);
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }

  static async getAll(req, res, next) {
    try {
      const options = getOptions(req);
      const semesters = await service.getAll({ options });

      res.status(200).json(semesters);
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }

  static async getOne(req, res, next) {
    try {
      const semesterId = parseInt(req.params.semesterId);
      const semester = await service.getOne({ data: { semesterId } });

      res.status(200).json(semester);
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }

  static async updateOne(req, res, next) {
    try {
      const semesterId = parseInt(req.params.semesterId);
      const semester = await service.updateOne({
        data: { semesterId, ...req.body },
      });

      res.status(200).json(semester);
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }

  static async deleteOne(req, res, next) {
    try {
      const semesterId = parseInt(req.params.semesterId);
      await service.deleteOne({ data: { semesterId } });

      res.status(204).send();
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }
}

module.exports = semestersController;
