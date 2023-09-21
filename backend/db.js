const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    database: 'tasks_tracker'
});

module.exports = pool; 