const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

var conn = mysql.createPool({
	host: dbConfig.host,
	user: dbConfig.user,
	password: dbConfig.password,
	database: dbConfig.database,
});

module.exports = conn;