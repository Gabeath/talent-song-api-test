import db from '@db/database';

import PersistenceError from '@utilities/errors/persistence';

export const FavoriteSongEntity = db.models.FavoriteSong;

export default class FavoriteSongRepository {
  static async create(user, options) {
    let response = null;

    try {
      response = FavoriteSongEntity.build(user);

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
      response = await FavoriteSongEntity.findOne(options);
    } catch (err) {
      throw new PersistenceError(err);
    }
    return response;
  }

  static async selectAll(options) {
    let response = null;
    try {
      response = await FavoriteSongEntity.findAll(options);
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
      response = await FavoriteSongEntity.findAndCountAll(options);
    } catch (err) {
      throw new PersistenceError(err);
    }
    return response;
  }

  static async updateById(id, user, options) {
    let response = null;
    try {
      response = await FavoriteSongEntity.update(user, {
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
      response = await FavoriteSongEntity.destroy({
        where: { id },
        transaction: options ? options.transaction : null,
      });
    } catch (err) {
      throw new PersistenceError(err);
    }
    return response;
  }
}
