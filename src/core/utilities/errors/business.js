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
