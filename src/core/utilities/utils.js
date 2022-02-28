import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import Constants from '@utilities/constants';

export function cryptPassword(password) {
  return crypto.pbkdf2Sync(
    password,
    Constants.password.secretPassword,
    Constants.password.iterations,
    Constants.password.keylen,
    Constants.password.digest,
  ).toString('hex');
}

export function generateJWT(payload) {
  return jwt.sign(payload, Constants.jwtSecret, {
    expiresIn: '5h',
  });
}

export function verifyToken(token) {
  return jwt.verify(token, Constants.jwtSecret);
}
