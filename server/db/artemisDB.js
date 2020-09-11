const { Pool } = require('pg');
const PGURI = 'postgres://hpwuyofj:XwfXoH0R2pbcY3xVjmZ71oNmnVEH7Kkd@lallah.db.elephantsql.com:5432/hpwuyofj';

const pool = new Pool({
  connectionString: PGURI,
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
