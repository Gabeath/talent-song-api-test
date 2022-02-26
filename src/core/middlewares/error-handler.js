import httpStatus from 'http-status';

import BusinessError from '@utilities/errors/business';
import ForbiddenError from '@utilities/errors/forbidden';
import UnauthorizedError from '@utilities/errors/unauthorized';
import PersistenceError from '@utilities/errors/persistence';

export default function errorHandler(err, req, res) {
  if (err.errors && err.errors.length > 0) {
    res.status(httpStatus.BAD_REQUEST).json({
      error: err.errors.pop().msg,
    });
  } else if (err instanceof BusinessError) {
    res.status(httpStatus.BAD_REQUEST).json({
      error: err.code,
      options: err.options,
    });
  } else if (err instanceof UnauthorizedError) {
    res.sendStatus(httpStatus.UNAUTHORIZED);
  } else if (err instanceof ForbiddenError) {
    res.sendStatus(httpStatus.FORBIDDEN);
  } else if (err instanceof PersistenceError) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ stack: err.stack, message: err.message, err });
  } else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ stack: err.stack, message: err.message });
  }
}
