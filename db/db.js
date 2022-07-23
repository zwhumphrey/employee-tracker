const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  //   host: "localhost",
  //   // Your MYSQL username,
  //   user: "root",
  //   // your MYSQL password,
  //   password: "PASSWORD",
  //   database: "tracker",
  host: "localhost",
  // Your MYSQL username,
  user: process.env.DB_USER || "root",
  // your MYSQL password,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "tracker",
});

module.exports = db;
