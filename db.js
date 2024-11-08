const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'your_db_user',
    password: 'your_db_password',
    database: 'edublog_platform'
});

module.exports = db;
