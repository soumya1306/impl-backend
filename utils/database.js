const mysql = require("mysql2");
const logger = require("./logger")

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "data123",
  database: "impl-db"
})

connection.connect((error) => {
  if(error) {
    logger.error("Error connecting to MYSQL:", error);
    return;
  }
  logger.info("Connected to MySQL database!");
});

module.exports = connection;