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

      let yearId;
      if (req.params.yearId) yearId = parseInt(req.params.yearId);

      const semesters = await service.getAll({ options, data: { yearId } });

      res.status(200).json(semesters);
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }

  static async getOne(req, res, next) {
    try {
      const semesterId = parseInt(req.params.semesterId);
      const semester = await service.getOne({ data: { semesterId } });

      if (req.params.yearId && parseInt(req.params.yearId) !== semester.yearId)
        throw createError.NotFound('Semester Not Found');

      res.status(200).json(semester);
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }

  static async updateOne(req, res, next) {
    try {
      const semesterId = parseInt(req.params.semesterId);

      let semester;
      semester = await service.getOne({ data: { semesterId } });

      if (req.params.yearId && parseInt(req.params.yearId) !== semester.yearId)
        throw createError.NotFound('Semester Not Found');

      semester = await service.updateOne({
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

      const semester = await service.getOne({ data: { semesterId } });
      if (req.params.yearId && parseInt(req.params.yearId) !== semester.yearId)
        throw createError.NotFound('Semester Not Found');

      await service.deleteOne({ data: { semesterId } });

      res.status(204).send();
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }
}

module.exports = semestersController;
