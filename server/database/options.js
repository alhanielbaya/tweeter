require('dotenv').config();

module.exports = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
};
