const { Pool } = require('pg');


const pool = new Pool({
    host:"localhost",
    user:"postgres",
    port:5433,
    password:"Admin",
    database:"postgres"
});

module.exports = pool;