const { Pool } = require('pg');
require('dotenv').config();
// const pool = new Pool({
//   user: 'uhzryascuozx05c5yqtu',
//   host: 'bkrhoojkwmnf0antec6w-postgresql.services.clever-cloud.com',
//   database: 'bkrhoojkwmnf0antec6w',
//   password: '6k6cx9m75YncyHLSgWnHMX7ZTl81oQ',
//   port: 50013, 
//   }
// );
const pool = new Pool({
    user: process.env.POSTGRESQL_ADDON_USER,
    host: process.env.POSTGRESQL_ADDON_HOST,
    database: process.env.POSTGRESQL_ADDON_DB,
    password: process.env.POSTGRESQL_ADDON_PASSWORD,
    port: process.env.POSTGRESQL_ADDON_PORT, 
    ssl:require,
    }
  );
module.exports = pool;
