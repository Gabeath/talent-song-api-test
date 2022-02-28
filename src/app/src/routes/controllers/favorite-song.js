import express from 'express';
import httpStatus from 'http-status';
import { checkSchema, validationResult } from 'express-validator';

import FavoriteSongService from '@app/services/favorite-song';
import { createFavoriteSong } from '@app/routes/schemas/favorite-song';

import auth from '@middlewares/auth';
import errorHandler from '@middlewares/error-handler';

const routes = express.Router();

routes.post(
  '/',
  auth(),
  checkSchema(createFavoriteSong),
  async (req, res) => {
    let response;
    try {
      validationResult(req).throw();
      response = await FavoriteSongService.create(req.body, req.userId);
    } catch (err) {
      return errorHandler(err, req, res);
    }
    return res.status(httpStatus.OK).json(response);
  },
);

routes.get(
  '/',
  auth(),
  async (req, res) => {
    let response;
    try {
      const searchParameters = {
        ...(req.query.artist && { artist: req.query.artist }),
        ...(req.query.album && { album: req.query.album }),
        ...(req.query.songName && { artist: req.query.songName }),
      };

      response = await FavoriteSongService.getMineFavorites(searchParameters, req.userId);
    } catch (err) {
      return errorHandler(err, req, res);
    }
    return res.status(httpStatus.OK).json(response);
  },
);

export default routes;
