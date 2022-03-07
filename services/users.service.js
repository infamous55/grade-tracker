const { PrismaClient } = require('@prisma/client');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime');
const prisma = new PrismaClient();

const bcrypt = require('bcryptjs');
const createError = require('http-errors');

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
        throw createError.Conflict('Invalid Class Id');
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
        where: { id: data.id },
      });
      if (!user) throw createError.NotFound('User Not Found');

      return user;
    } catch (e) {
      if (createError.isHttpError(e)) throw e;
      else throw createError.InternalServerError();
    }
  }
}

module.exports = usersService;
