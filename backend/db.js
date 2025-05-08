
const sql = require('mysql2/promise');
require('dotenv').config();

const db = sql.createPool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE,
});

db.getConnection().then((connection) => {
  console.log("Connected to database");
  connection.release();
}).catch((err) => {
  console.log("Not connected: " + err.message);
});

module.exports = db