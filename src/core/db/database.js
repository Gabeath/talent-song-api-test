import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

import Constants from '@utilities/constants';

const sequelize = new Sequelize(
  Constants.database.name,
  Constants.database.user,
  Constants.database.password,
  {
    host: Constants.database.host,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 70,
      min: 20,
      acquire: 60000,
      idle: 30000,
    },
    timezone: Constants.timezone,
    logging: false,
  },
);

const db = {
  sequelize,
  Sequelize,
  models: {},
};

const dir = path.join(__dirname, 'models');
fs.readdirSync(dir).forEach((file) => {
  const modelDir = path.join(dir, file);
  try {
    const model = sequelize.import(modelDir);
    db.models[model.name] = model;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    throw err;
  }
});

Object.keys(db.models).forEach((modelName) => {
  try {
    if (db.models[modelName].associate) {
      db.models[modelName].associate(db.models);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    throw err;
  }
});

(async () => {
  try {
    await db.sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log('Database connection has been established successfully.');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`Unable to connect to the database: ${err}`);
  }
})();

export default db;
