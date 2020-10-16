const { Pool } = require('pg');
require('dotenv').config();

const PGURI = process.env.PGURI_LINK;

const pool = new Pool({
  connectionString: PGURI,
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
