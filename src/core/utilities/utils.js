import crypto from 'crypto';

import Constants from '@utilities/constants';

// eslint-disable-next-line import/prefer-default-export
export function cryptPassword(password) {
  return crypto.pbkdf2Sync(
    password,
    Constants.password.secretPassword,
    Constants.password.iterations,
    Constants.password.keylen,
    Constants.password.digest,
  ).toString('hex');
}
