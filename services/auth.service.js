const { PrismaClient } = require('@prisma/client');
const { PrismaClientKnownRequestError } = require('@prisma/client/runtime');
const prisma = new PrismaClient();

const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const createError = require('http-errors');
const jwt = require('../utils/jwt');

class authService {
  static async register(data) {
    try {
      data.password = await bcrypt.hash(data.password, 8);
      const user = await prisma.user.create({ data });

      const tokenIdentifier = uuidv4();
      const hashedTokenIdentifier = await bcrypt.hash(tokenIdentifier, 8);

      const refreshToken = await jwt.signRefreshToken({
        userId: user.id,
        tokenIdentifier,
      });
      const accessToken = await jwt.signAccessToken({ userId: user.id });

      await prisma.user.update({
        where: { id: user.id },
        data: { tokenIdentifier: hashedTokenIdentifier },
      });

      return { accessToken, refreshToken };
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002')
        throw createError.Conflict('User Already Exists');
      else throw createError.InternalServerError();
    }
  }

  static async login(data) {
    try {
      const { email, password } = data;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) throw createError.NotFound('User Not Found');

      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) throw createError.Unauthorized('Invalid Credentials');

      const tokenIdentifier = uuidv4();
      const hashedTokenIdentifier = await bcrypt.hash(tokenIdentifier, 8);

      const refreshToken = await jwt.signRefreshToken({
        userId: user.id,
        tokenIdentifier,
      });
      const accessToken = await jwt.signAccessToken({ userId: user.id });

      await prisma.user.update({
        where: { id: user.id },
        data: { tokenIdentifier: hashedTokenIdentifier },
      });

      return { accessToken, refreshToken };
    } catch (e) {
      if (createError.isHttpError(e)) throw e;
      else throw createError.InternalServerError();
    }
  }

  static async refresh(data) {
    try {
      const { refreshToken } = data;
      const { payload } = await jwt.verifyRefreshToken(refreshToken);

      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: { tokenIdentifier: true },
      });
      if (!user) throw createError.NotFound('User Not Found');

      const checkToken = await bcrypt.compare(
        payload.tokenIdentifier,
        user.tokenIdentifier
      );
      if (!checkToken) throw createError.BadRequest('Invalid Refresh Token');

      const accessToken = await jwt.signAccessToken({ userId: payload.userId });

      return { accessToken };
    } catch (e) {
      if (createError.isHttpError(e)) throw e;
      else throw createError.InternalServerError();
    }
  }
}

module.exports = authService;
