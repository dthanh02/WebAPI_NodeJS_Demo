 // database.js
//kết nối đến cơ sở dữ liệu MySQL bằng Sequelize

 const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('usertest', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;

