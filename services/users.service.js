const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime');

const prisma = require('../utils/prisma');

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

  static async getAll({ options }) {
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
        where: { id: data.userId },
        data,
      });

      return user;
    } catch (e) {
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
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025')
        throw createError.NotFound('User Not Found');
      throw createError.InternalServerError();
    }
  }
}

module.exports = usersService;
