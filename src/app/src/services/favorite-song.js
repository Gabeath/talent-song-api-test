import { Op } from 'sequelize';

import FavoriteSongRepository from '@db/repositories/favorite-song';

import BusinessError, { FavoriteSongCodeError, ValidationCodeError } from '@utilities/errors/business';

export default class FavoriteSongService {
  static async create(favoriteSong, userId) {
    let response = null;

    const favoriteSongSaved = await FavoriteSongRepository.selectOne({
      where: {
        songName: favoriteSong.songName,
        artist: favoriteSong.artist,
        album: favoriteSong.album,
      },
    });

    if (favoriteSongSaved) {
      throw new BusinessError(FavoriteSongCodeError.SONG_ALREADY_REGISTERED);
    }

    const favoriteSongCreated = await FavoriteSongRepository.create({
      userId,
      songName: favoriteSong.songName,
      artist: favoriteSong.artist,
      album: favoriteSong.album,
    });

    response = {
      favoriteId: favoriteSongCreated.favoriteId,
      songName: favoriteSongCreated.songName,
      artist: favoriteSongCreated.artist,
      album: favoriteSongCreated.album,
    };

    return response;
  }

  static async getMineFavorites(searchParameters, userId) {
    let response = null;

    response = await FavoriteSongRepository.selectAll({
      where: {
        userId,
        ...(searchParameters.artist && {
          artist: { [Op.iLike]: `%${searchParameters.artist}%` },
        }),
        ...(searchParameters.album && {
          album: { [Op.iLike]: `%${searchParameters.album}%` },
        }),
        ...(searchParameters.songName && {
          songName: { [Op.iLike]: `%${searchParameters.songName}%` },
        }),
      },
      attributes: { exclude: ['userId'] },
    });

    return response;
  }

  static async updateById(favoriteId, favoriteSong, userId) {
    let response = null;

    if (!favoriteSong.songName
      && !favoriteSong.artist
      && !favoriteSong.album) {
      throw new BusinessError(ValidationCodeError.INSUFFICIENT_PARAMS);
    }

    const favoriteSongSaved = await FavoriteSongRepository.selectOne({
      where: { favoriteId, userId },
    });

    if (!favoriteSongSaved) {
      throw new BusinessError(FavoriteSongCodeError.FAVORITE_SONG_NOT_FOUND);
    }

    const favoriteSongUpdated = await FavoriteSongRepository.updateById(favoriteSongSaved.favoriteId, {
      ...(favoriteSong.songName && { songName: favoriteSong.songName }),
      ...(favoriteSong.artist && { artist: favoriteSong.artist }),
      ...(favoriteSong.album && { album: favoriteSong.album }),
    });

    response = {
      songName: favoriteSongUpdated.songName,
      artist: favoriteSongUpdated.artist,
      album: favoriteSongUpdated.album,
    };

    return response;
  }

  static async deleteById(favoriteId, userId) {
    const favoriteSongSaved = await FavoriteSongRepository.selectOne({
      where: { favoriteId, userId },
    });

    if (!favoriteSongSaved) {
      throw new BusinessError(FavoriteSongCodeError.FAVORITE_SONG_NOT_FOUND);
    }

    await FavoriteSongRepository.deleteById(favoriteSongSaved.favoriteId);
  }
}
