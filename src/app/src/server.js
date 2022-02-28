import 'express-async-errors';
import '~/lib/moduleAlias';

import express from 'express';
import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import httpStatus from 'http-status';
import methodOverride from 'method-override';
import { v4 } from 'uuid';

import routes from '@controllers';

import errorHandler from '@middlewares/error-handler';

const app = express();

app.use(bodyParser.json({
  limit: '100MB',
}));
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use((req, res, next) => {
  req.id = v4();
  next();
});

// mount all routes on /api path
app.use('/api', routes);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(httpStatus.NOT_FOUND).json();
});

// Handle 500
// do not remove next from line bellow, error handle will not work
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  errorHandler(err, req, res);
});

export default app;
