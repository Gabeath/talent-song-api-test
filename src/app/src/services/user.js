import UserRepository from '@db/repositories/user';

import BusinessError, { UserCodeError } from '@utilities/errors/business';
import { cryptPassword } from '@utilities/utils';

export default class UserService {
  static async create(user) {
    let response = null;

    const userSaved = await UserRepository.selectOne({
      where: { email: user.email },
    });

    if (userSaved) {
      throw new BusinessError(UserCodeError.EMAIL_ALREADY_REGISTERED);
    }

    const passwordEncrypted = cryptPassword(user.password);

    response = await UserRepository.create({
      email: user.email,
      password: passwordEncrypted,
    });

    return response;
  }
}
