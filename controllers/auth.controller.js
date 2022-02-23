const auth = require('../services/auth.service');
const createError = require('http-errors');

class authController {
  static async register(req, res, next) {
    try {
      const { accessToken, refreshToken } = await auth.register(req.body);
      res.status(201).json({
        accessToken,
        refreshToken,
      });
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }

  static async login(req, res, next) {
    try {
      const { accessToken, refreshToken } = await auth.login(req.body);
      res.status(200).json({
        accessToken,
        refreshToken,
      });
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }

  static async refresh(req, res, next) {
    try {
      const { accessToken } = await auth.refresh(req.body);
      res.status(200).json({ accessToken });
    } catch (e) {
      next(createError(e.statusCode, e.message));
    }
  }
}

module.exports = authController;
