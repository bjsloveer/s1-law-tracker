const maria = require('mysql');

const { DATABASE_HOST, DATABASE_PORT, DATABASE_USERID, DATABASE_USERPW, DATABASE_ID  } = process.env;

const conn = maria.createConnection({
    host : DATABASE_HOST,
    port : DATABASE_PORT,
    user:  DATABASE_USERID,
    password: DATABASE_USERPW,
    database: DATABASE_ID
});


module.exports = conn;