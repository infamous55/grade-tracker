const jwt = require('../utils/jwt');
const createError = require('http-errors');

const prisma = require('../utils/prisma');

function auth(role = ['STUDENT', 'TEACHER', 'ADMIN']) {
  return async (req, res, next) => {
    if (!req.headers.authorization) {
      return next(createError.Unauthorized('Missing Access Token'));
    }

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return next(createError.Unauthorized('Invalid Access Token'));
    }

    try {
      const { payload } = await jwt.verifyAccessToken(token);
      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
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
      if (!user) return next(createError.Unauthorized('Unauthorized'));

      if (
        (typeof role === 'string' && role === user.role) ||
        (Array.isArray(role) && role.includes(user.role))
      ) {
        req.user = user;
        next();
      } else return next(createError.Forbidden('Missing Permissions'));
    } catch (e) {
      if (createError.isHttpError(e)) next(e);
      else next(createError.InternalServerError());
    }
  };
}

module.exports = auth;
