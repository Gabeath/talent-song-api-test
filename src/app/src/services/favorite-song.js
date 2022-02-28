import { Op } from 'sequelize';

import FavoriteSongRepository from '@db/repositories/favorite-song';

import BusinessError, { FavoriteSongCodeError } from '@utilities/errors/business';

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
}
