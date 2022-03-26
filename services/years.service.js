const createError = require('http-errors');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime');

const prisma = require('../utils/prisma');

class yearsService {
  static async createOne({ data }) {
    try {
      const year = await prisma.year.create({ data });
      return year;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002')
        throw createError.Conflict('Year Already Exists');
      else throw createError.InternalServerError();
    }
  }

  static async getAll({ options }) {
    try {
      const years = await prisma.year.findMany({
        skip: options.skip,
        take: options.take,
        orderBy: { id: options.sort },
      });
      return years;
    } catch (e) {
      throw createError.InternalServerError();
    }
  }

  static async getOne({ data }) {
    try {
      const year = await prisma.year.findUnique({ where: { id: data.yearId } });
      if (!year) throw createError.NotFound('Year Not Found');

      return year;
    } catch (e) {
      if (createError.isHttpError(e)) throw e;
      else throw createError.InternalServerError();
    }
  }

  static async updateOne({ data }) {
    try {
      const { yearId } = data;
      delete data.yearId;

      const year = await prisma.year.update({
        where: { id: yearId },
        data,
      });
      return year;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002')
        throw createError.Conflict('Year Already Exists');
      else if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
        throw createError.NotFound('Year Not Found');
      else throw createError.InternalServerError();
    }
  }

  static async deleteOne({ data }) {
    try {
      await prisma.year.delete({ where: { id: data.yearId } });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
        throw createError.NotFound('Year Not Found');
      else if (e instanceof PrismaClientKnownRequestError && e.code === 'P2003')
        throw createError.Conflict('Foreign Key Violation');
      throw createError.InternalServerError();
    }
  }
}

module.exports = yearsService;
