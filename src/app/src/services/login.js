import UserRepository from '@db/repositories/user';

import BusinessError, { UserCodeError } from '@utilities/errors/business';
import { cryptPassword, generateJWT } from '@utilities/utils';

export default class LoginService {
  static async auth({ email, password }) {
    let response = null;
    const passwordEncrypted = cryptPassword(password);

    const user = await UserRepository.selectOne({
      where: {
        email,
        password: passwordEncrypted,
      },
    });

    if (!user) {
      throw new BusinessError(UserCodeError.USER_NOT_FOUND);
    }

    response = {
      token: generateJWT({ userId: user.userId }),
    };

    return response;
  }
}
