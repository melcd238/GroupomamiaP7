const dotenv = require('dotenv').config();

module.exports = {
    HOST: "localhost",
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: "groupomania",
    dialect: "mysql"
  };