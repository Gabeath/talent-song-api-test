import ExtendableError from './extendable-error';

export default class BusinessError extends ExtendableError {
  constructor(code, options) {
    super((options && options.msg) || null);
    this.code = code;
    this.options = options;
  }
}

export const ValidationCodeError = {
  INVALID_ID: 'invalid_id',
};

export const UserCodeError = {
  EMAIL_ALREADY_REGISTERED: 'email_already_registered',
  USER_NOT_FOUND: 'user_not_found',
};
