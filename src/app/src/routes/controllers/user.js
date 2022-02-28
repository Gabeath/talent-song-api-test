import express from 'express';
import httpStatus from 'http-status';
import { checkSchema, validationResult } from 'express-validator';

import UserService from '@app/services/user';
import createUser from '@app/routes/schemas/user';

import errorHandler from '@middlewares/error-handler';

const routes = express.Router();

routes.post(
  '/',
  checkSchema(createUser),
  async (req, res) => {
    let response;
    try {
      validationResult(req).throw();
      response = await UserService.create(req.body);
    } catch (err) {
      return errorHandler(err, req, res);
    }
    return res.status(httpStatus.OK).json(response);
  },
);

export default routes;
