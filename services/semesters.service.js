const createError = require('http-errors');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime');

const prisma = require('../utils/prisma');

class semestersService {
  static async createOne({ data }) {
    try {
      const semester = await prisma.semester.create({
        data,
        include: { year: true },
      });
      return semester;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002')
        throw createError.Conflict('Semester Already Exists');
      else if (e instanceof PrismaClientKnownRequestError && e.code === 'P2003')
        throw createError.Conflict('Year Does Not Exist');
      else throw createError.InternalServerError();
    }
  }

  static async getAll({ options }) {
    try {
      const semesters = await prisma.semester.findMany({
        skip: options.skip,
        take: options.take,
        include: { year: true },
        orderBy: { id: options.sort },
      });
      return semesters;
    } catch (e) {
      throw createError.InternalServerError();
    }
  }

  static async getOne({ data }) {
    try {
      const semester = await prisma.semester.findUnique({
        where: { id: data.id },
        include: { year: true },
      });
      if (!semester) throw createError.NotFound('Semester Not Found');

      return semester;
    } catch (e) {
      if (createError.isHttpError(e)) throw e;
      else throw createError.InternalServerError();
    }
  }

  static async updateOne({ data }) {
    try {
      const semester = await prisma.semester.update({
        where: { id: data.id },
        include: { year: true },
        data,
      });
      return semester;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002')
        throw createError.Conflict('Semester Already Exists');
      else if (e instanceof PrismaClientKnownRequestError && e.code === 'P2003')
        throw createError.Conflict('Year Does Not Exist');
      else if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
        throw createError.NotFound('Semester Not Found');
      else throw createError.InternalServerError();
    }
  }

  static async deleteOne({ data }) {
    try {
      await prisma.semester.delete({ where: { id: data.id } });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
        throw createError.NotFound('Semester Not Found');
      throw createError.InternalServerError();
    }
  }
}

module.exports = semestersService;
