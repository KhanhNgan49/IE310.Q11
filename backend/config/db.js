require("dotenv").config();
const {
  Sequelize
} = require("sequelize");

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: process.env.DB_SSL === "true" ?
    {
      ssl: {
        rejectUnauthorized: false
      }
    } :
    {},
});

module.exports = sequelize;