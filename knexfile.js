// Update with your config settings.

const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  dotenv.config();
}

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.POSTGRES_HOST,
      database: process.env.APP_DB_NAME,
      user: process.env.APP_DB_USER,
      password: process.env.APP_DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      // stub: './config/knex-migration-stub.js',
      tableName: 'migration',
      directory: 'src/libs/db/migrations',
    },
    seeds: {
      // stub: './config/knex-migration-stub.js',
      tableName: 'seed',
      directory: 'src/libs/db/seeds',
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: process.env.POSTGRES_HOST,
      database: process.env.APP_DB_NAME,
      user: process.env.APP_DB_USER,
      password: process.env.APP_DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migration',
      directory: 'src/libs/src/migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      host: process.env.POSTGRES_HOST,
      database: process.env.APP_DB_NAME,
      user: process.env.APP_DB_USER,
      password: process.env.APP_DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migration',
      directory: 'src/libs/src/migrations',
    },
  },
};
