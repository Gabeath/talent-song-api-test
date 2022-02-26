import db from '@db/database';

import PersistenceError from '@utilities/errors/persistence';

export const UserEntity = db.models.User;

export default class UserRepository {
  static async create(user, options) {
    let response = null;

    try {
      response = UserEntity.build(user);

      response = await response.save({
        transaction: options ? options.transaction : null,
        returning: true,
      });
    } catch (err) {
      throw new PersistenceError(err);
    }

    return response;
  }

  static async selectOne(options) {
    let response = null;
    try {
      response = await UserEntity.findOne(options);
    } catch (err) {
      throw new PersistenceError(err);
    }
    return response;
  }

  static async selectAll(options) {
    let response = null;
    try {
      response = await UserEntity.findAll(options);
    } catch (err) {
      throw new PersistenceError(err);
    }
    return response;
  }

  static async selectWithPagination(options) {
    let response = null;
    try {
      options = {
        ...options,
        distinct: options.include && options.include.length > 0,
      };
      response = await UserEntity.findAndCountAll(options);
    } catch (err) {
      throw new PersistenceError(err);
    }
    return response;
  }

  static async updateById(id, user, options) {
    let response = null;
    try {
      response = await UserEntity.update(user, {
        where: { id },
        transaction: options ? options.transaction : null,
        returning: true,
      });
      [, [response]] = response;
    } catch (err) {
      throw new PersistenceError(err);
    }
    return response;
  }

  static async deleteById(id, options) {
    let response = null;
    try {
      response = await UserEntity.destroy({
        where: { id },
        transaction: options ? options.transaction : null,
      });
    } catch (err) {
      throw new PersistenceError(err);
    }
    return response;
  }
}
