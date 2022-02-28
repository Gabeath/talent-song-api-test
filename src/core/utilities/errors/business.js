import ExtendableError from './extendable-error';

export default class BusinessError extends ExtendableError {
  constructor(code, options) {
    super((options && options.msg) || null);
    this.code = code;
    this.options = options;
  }
}

export const FavoriteSongCodeError = {
  FAVORITE_SONG_NOT_FOUND: 'favorite_song_not_found',
  SONG_ALREADY_REGISTERED: 'song_already_registered',
};

export const ValidationCodeError = {
  INSUFFICIENT_PARAMS: 'insufficient_params',
};

export const UserCodeError = {
  EMAIL_ALREADY_REGISTERED: 'email_already_registered',
  USER_NOT_FOUND: 'user_not_found',
};
