/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
require('dotenv').config();
require('ts-node/register');
require('tsconfig-paths/register');

const config: { [key: string]: unknown } = {
  client: 'pg',
  connection: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ssl: !process.env.NODE_ENV || process.env.NODE_ENV === 'production',
  },
  migrations: {
    directory: ['src/core/infrastructure/bootstrap/database/migrations'],
  },
};

module.exports = config;
