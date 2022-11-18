/******************************************************************* 
 * 
/*      We have used the recommended connection set up by the developers
/*      of the pg npm library. Declaring all our required strings in an
/*      index.js file under a server side folder db
/*
/******************************************************************* 
 */
const { Pool } = require("pg");

const db = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

module.exports = {
    query: (text, params) => db.query(text, params),
}