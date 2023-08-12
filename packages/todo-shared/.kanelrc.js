const path = require('path');
const { makeKyselyHook } = require('kanel-kysely');

/** @type {import('kanel').Config} */
module.exports = {
  connection: {
    host: 'localhost',
    user: 'myuser',
    password: 'mypassword',
    database: 'mydatabase',
  },

  preDeleteOutputFolder: true,
  outputPath: './src/schemas',

  customTypeMap: {
    'pg_catalog.tsvector': 'string',
    'pg_catalog.bpchar': 'string',
  },

  preRenderHooks: [makeKyselyHook()],
};