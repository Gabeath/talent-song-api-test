import ExtendableError from './extendable-error';

export default class ForbiddenError extends ExtendableError {
  constructor() {
    super('ForbiddenError');
  }
}
