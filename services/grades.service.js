const createError = require('http-errors');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime');

const prisma = require('../utils/prisma');

class gradesService {
  static async createOne({ data }) {
    try {
      const student = await prisma.user.findUnique({
        where: { id: data.studentId },
      });
      if (!student) throw createError.Conflict('Student Does Not Exist');
      else if (student.role !== 'STUDENT')
        throw createError.Conflict('Not A Student');

      const grade = await prisma.grade.create({ data });
      return grade;
    } catch (e) {
      if (createError.isHttpError(e)) throw e;
      else if (
        e instanceof PrismaClientKnownRequestError &&
        e.code === 'P2003'
      ) {
        console.log(e);
        if (e.meta.field_name === 'Grade_semesterId_fkey (index)')
          throw createError.Conflict('Semester Does Not Exist');
        else if (e.meta.field_name === 'Grade_disciplineId_fkey (index)')
          throw createError.Conflict('Discipline Does Not Exist');
      } else throw createError.InternalServerError();
    }
  }

  static async getAll({ options }) {
    try {
      const grades = await prisma.grade.findMany({
        skip: options.skip,
        take: options.take,
        orderBy: { id: options.sort },
      });
      return grades;
    } catch (e) {
      throw createError.InternalServerError();
    }
  }

  static async getOne({ data }) {
    try {
      const grade = await prisma.grade.findUnique({
        where: { id: data.id },
      });
      if (!grade) throw createError.NotFound('Grade Not Found');

      return grade;
    } catch (e) {
      if (createError.isHttpError(e)) throw e;
      else throw createError.InternalServerError();
    }
  }

  static async updateOne({ data }) {
    try {
      if (data.studentId) {
        const student = await prisma.user.findUnique({
          where: { id: data.studentId },
        });
        if (!student) throw createError.Conflict('Student Does Not Exist');
        else if (student.role !== 'STUDENT')
          throw createError.Conflict('Not A Student');
      }

      const grade = await prisma.grade.update({
        where: { id: data.id },
        data,
      });
      return grade;
    } catch (e) {
      if (createError.isHttpError(e)) throw e;
      else if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
        throw createError.NotFound('Grade Not Found');
      else if (
        e instanceof PrismaClientKnownRequestError &&
        e.code === 'P2003'
      ) {
        if (e.meta.field_name === 'Grade_semesterId_fkey (index)')
          throw createError.Conflict('Semester Does Not Exist');
        else if (e.meta.field_name === 'Grade_disciplineId_fkey (index)')
          throw createError.Conflict('Discipline Does Not Exist');
      } else throw createError.InternalServerError();
    }
  }

  static async deleteOne({ data }) {
    try {
      await prisma.grade.delete({ where: { id: data.id } });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
        throw createError.NotFound('Grade Not Found');
      throw createError.InternalServerError();
    }
  }
}

module.exports = gradesService;
