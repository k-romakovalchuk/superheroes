const {Sequelize} = require("sequelize")

const sequelize = new Sequelize(
  process.env.DB_NAME,  // Назва БД
  process.env.DB_USER,  // Користувач
  process.env.DB_PASSWORD, // Пароль
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
  }
)

module.exports = {sequelize}