import path from 'path';

export default {
  '~': path.join(__dirname, '..'),
  '@app': path.join(__dirname, '..', 'app', 'src'),
  '@db': path.join(__dirname, '..', 'core', 'db'),
  '@controllers': path.join(__dirname, '..', 'app', 'src', 'routes', 'controllers'),
  '@middlewares': path.join(__dirname, '..', 'core', 'middlewares'),
  '@utilities': path.join(__dirname, '..', 'core', 'utilities'),
};
