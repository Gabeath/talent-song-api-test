import express from 'express';
import httpStatus from 'http-status';
import { checkSchema, validationResult } from 'express-validator';

import LoginService from '@app/services/login';
import authenticateUser from '@app/routes/schemas/login';

import errorHandler from '@middlewares/error-handler';

const routes = express.Router();

routes.post(
  '/',
  checkSchema(authenticateUser),
  async (req, res) => {
    let response;
    try {
      validationResult(req).throw();
      response = await LoginService.auth(req.body);
    } catch (err) {
      return errorHandler(err, req, res);
    }
    return res.status(httpStatus.OK).json(response);
  },
);

export default routes;
