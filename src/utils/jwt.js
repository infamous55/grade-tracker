const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

module.exports = {
  signAccessToken(payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { payload },
        accessTokenSecret,
        { expiresIn: '15m' },
        (err, token) => {
          if (err) {
            return reject(createError.InternalServerError());
          }
          resolve(token);
        }
      );
    });
  },
  signRefreshToken(payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { payload },
        refreshTokenSecret,
        { expiresIn: '7d' },
        (err, token) => {
          if (err) {
            return reject(createError.InternalServerError());
          }
          resolve(token);
        }
      );
    });
  },
  verifyAccessToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, accessTokenSecret, (err, payload) => {
        if (err) {
          if (err.name === 'JsonWebTokenError' || err.name === 'SyntaxError')
            return reject(createError.Unauthorized('Unauthorized'));
          else if (err.name === 'TokenExpiredError')
            return reject(createError.Unauthorized('Token Expired'));
          else return reject(createError.InternalServerError());
        }
        resolve(payload);
      });
    });
  },
  verifyRefreshToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, refreshTokenSecret, (err, payload) => {
        if (err) {
          if (err.name === 'JsonWebTokenError' || err.name === 'SyntaxError')
            return reject(createError.Unauthorized('Unauthorized'));
          else if (err.name === 'TokenExpiredError')
            return reject(createError.Unauthorized('Token Expired'));
          else return reject(createError.InternalServerError());
        }
        resolve(payload);
      });
    });
  },
};
