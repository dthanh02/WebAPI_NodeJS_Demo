//được sử dụng để định nghĩa một mô hình dữ liệu (model) trong ứng dụng
// models/User.js

const { DataTypes } = require('sequelize'); //import lớp DataTypes từ Sequelize
const sequelize = require('../database'); //import biến sequelize từ file database.js

const User = sequelize.define('User', { //định nghĩa một mô hình dữ liệu mới
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users', // Đặt tên bảng là 'users'
  timestamps: true // Tự động tạo createdAt và updatedAt
});

module.exports = User;
