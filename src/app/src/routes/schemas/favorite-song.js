// eslint-disable-next-line import/prefer-default-export
export const createFavoriteSong = {
  songName: {
    in: 'body',
    isString: true,
    errorMessage: 'invalid_song_name',
  },
  artist: {
    in: 'body',
    isString: true,
    errorMessage: 'invalid_artist',
  },
  album: {
    in: 'body',
    isString: true,
    errorMessage: 'invalid_album',
  },
};

export const updateFavoriteSong = {
  favoriteId: {
    in: 'params',
    isUUID: true,
    errorMessage: 'invalid_id',
  },
  songName: {
    in: 'body',
    isString: true,
    optional: true,
    errorMessage: 'invalid_song_name',
  },
  artist: {
    in: 'body',
    isString: true,
    optional: true,
    errorMessage: 'invalid_artist',
  },
  album: {
    in: 'body',
    isString: true,
    optional: true,
    errorMessage: 'invalid_album',
  },
};

export const deleteFavoriteSong = {
  favoriteId: {
    in: 'params',
    isUUID: true,
    errorMessage: 'invalid_id',
  },
};
