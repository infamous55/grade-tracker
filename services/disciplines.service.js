const createError = require('http-errors');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime');

const prisma = require('../utils/prisma');

class disciplinesService {
  static async createOne({ data }) {
    try {
      const discipline = await prisma.discipline.create({ data });
      return discipline;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002')
        throw createError.Conflict('Discipline Already Exists');
      else throw createError.InternalServerError();
    }
  }

  static async getAll({ options }) {
    try {
      const disciplines = await prisma.discipline.findMany({
        skip: options.skip,
        take: options.take,
        orderBy: { id: options.sort },
      });
      return disciplines;
    } catch (e) {
      throw createError.InternalServerError();
    }
  }

  static async getOne({ data }) {
    try {
      const discipline = await prisma.discipline.findUnique({
        where: { id: data.disciplineId },
      });
      if (!discipline) throw createError.NotFound('Discipline Not Found');

      return discipline;
    } catch (e) {
      if (createError.isHttpError(e)) throw e;
      else throw createError.InternalServerError();
    }
  }

  static async updateOne({ data }) {
    try {
      const { disciplineId } = data;
      delete data.disciplineId;

      const discipline = await prisma.discipline.update({
        where: { id: disciplineId },
        data,
      });
      return discipline;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002')
        throw createError.Conflict('Discipline Already Exists');
      else if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
        throw createError.NotFound('Discipline Not Found');
      else throw createError.InternalServerError();
    }
  }

  static async deleteOne({ data }) {
    try {
      await prisma.discipline.delete({ where: { id: data.disciplineId } });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
        throw createError.NotFound('Discipline Not Found');
      throw createError.InternalServerError();
    }
  }
}

module.exports = disciplinesService;
