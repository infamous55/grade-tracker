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

      let studentId;
      if (req.user.role === 'STUDENT' && !req.params.studentId)
        studentId = req.user.id;
      else if (
        req.user.role === 'STUDENT' &&
        parseInt(req.params.studentId) !== req.user.id
      )
        throw createError.Forbidden('Missing Permissions');
      else
        req.params.studentId
          ? (studentId = parseInt(req.params.studentId))
          : (studentId = undefined);

      let semesterId;
      if (req.params.semesterId) semesterId = parseInt(req.params.semesterId);

      let disciplineId;
      if (req.params.disciplineId)
        disciplineId = parseInt(req.params.disciplineId);

      const grades = await service.getAll({
        options,
        data: { studentId, semesterId, disciplineId },
      });

      res.status(200).json(grades);
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }

  static async getOne(req, res, next) {
    try {
      const gradeId = parseInt(req.params.gradeId);
      const grade = await service.getOne({ data: { gradeId } });

      if (req.user.role === 'STUDENT' && grade.studentId !== req.user.id)
        throw createError.Forbidden('Missing Permissions');

      if (
        (req.params.studentId &&
          parseInt(req.params.studentId) !== grade.studentId) ||
        (req.params.semesterId &&
          parseInt(req.params.semesterId) !== grade.semesterId) ||
        (req.params.disciplineId &&
          parseInt(req.params.disciplineId) !== grade.disciplineId)
      )
        throw createError.NotFound('Grade Not Found');

      res.status(200).json(grade);
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }

  static async updateOne(req, res, next) {
    try {
      const gradeId = parseInt(req.params.gradeId);

      let grade;
      grade = await service.getOne({ data: { gradeId } });

      if (
        (req.params.studentId &&
          parseInt(req.params.studentId) != grade.studentId) ||
        (req.params.semesterId &&
          parseInt(req.params.semesterId) !== grade.semesterId) ||
        (req.params.disciplineId &&
          parseInt(req.params.disciplineId) !== grade.disciplineId)
      )
        throw createError.NotFound('Grade Not Found');

      grade = await service.updateOne({
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

      const grade = await service.getOne({ data: { gradeId } });
      if (
        (req.params.studentId &&
          parseInt(req.params.studentId) != grade.studentId) ||
        (req.params.semesterId &&
          parseInt(req.params.semesterId) !== grade.semesterId) ||
        (req.params.disciplineId &&
          parseInt(req.params.disciplineId) !== grade.disciplineId)
      )
        throw createError.NotFound('Grade Not Found');

      await service.deleteOne({ data: { gradeId } });

      res.status(204).send();
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }
}

module.exports = gradeController;
