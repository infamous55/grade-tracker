const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime');

const prisma = require('../utils/prisma');
const mail = require('../utils/mail');

class usersService {
  static async createOne({ data }) {
    try {
      data.password = await bcrypt.hash(data.password, 8);
      const user = await prisma.user.create({
        data,
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          email: true,
          name: true,
          role: true,
          class: {
            include: {
              year: true,
            },
          },
        },
      });

      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002')
        throw createError.Conflict('User Already Exists');
      else if (e instanceof PrismaClientKnownRequestError && e.code === 'P2003')
        throw createError.Conflict('Class Does Not Exist');
      else throw createError.InternalServerError();
    }
  }

  static async getAll({ options, data }) {
    try {
      const users = await prisma.user.findMany({
        skip: options.skip,
        take: options.take,
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          email: true,
          name: true,
          role: true,
          class: {
            include: {
              year: true,
            },
          },
        },
        where: { classId: data.classId },
        orderBy: { id: options.sort },
      });

      return users;
    } catch (e) {
      throw createError.InternalServerError();
    }
  }

  static async getOne({ data }) {
    try {
      const user = await prisma.user.findUnique({
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          email: true,
          name: true,
          role: true,
          classId: true,
          class: {
            include: {
              year: true,
            },
          },
        },
        where: { id: data.userId },
      });
      if (!user) throw createError.NotFound('User Not Found');

      return user;
    } catch (e) {
      console.log(e);
      if (createError.isHttpError(e)) throw e;
      else throw createError.InternalServerError();
    }
  }

  static async updateOne({ data }) {
    try {
      const { userId } = data;
      delete data.userId;

      if (data.password) data.password = await bcrypt.hash(data.password, 8);
      const user = await prisma.user.update({
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          email: true,
          name: true,
          role: true,
          class: {
            include: {
              year: true,
            },
          },
        },
        where: { id: userId },
        data,
      });

      await mail(
        user.email,
        'Account Updated',
        `Hi ${user.name}, your account information has been updated!`
      );

      return user;
    } catch (e) {
      console.log(e);
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002')
        throw createError.Conflict('Email Already Taken');
      else if (e instanceof PrismaClientKnownRequestError && e.code === 'P2003')
        throw createError.Conflict('Class Does Not Exist');
      else if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
        throw createError.NotFound('User Not Found');
      else throw createError.InternalServerError();
    }
  }

  static async deleteOne({ data }) {
    try {
      await prisma.user.delete({ where: { id: data.userId } });
    } catch (e) {
      console.log(e);

      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
        throw createError.NotFound('User Not Found');
      else if (e instanceof PrismaClientKnownRequestError && e.code === 'P2003')
        throw createError.Conflict('Foreign Key Violation');
      throw createError.InternalServerError();
    }
  }
}

module.exports = usersService;
