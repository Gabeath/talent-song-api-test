import ExtendableError from './extendable-error';

export default class PersistenceError extends ExtendableError {
  constructor(err) {
    super('PersistenceError');
    this.err = err;
  }
}
