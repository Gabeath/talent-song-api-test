import dotenv from 'dotenv';

dotenv.config();

export default class Constants {
  static port = process.env.PORT;

  static database = {
    host: process.env.DATABASE_HOST,
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  };

  static timezone = process.env.TIMEZONE;

  static language = process.env.LANGUAGE;
}
