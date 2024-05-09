//Tương tác với cơ sở dữ liệu và thực hiện các thao tác liên quan đến users
// repositories/UserRepository.js
const User = require('../models/User');


// trả về tất cả người dùng từ cơ sở dữ liệu
class UserRepository {
  async getAllUsers() {
    return await User.findAll();
  }


  //trả về thông tin của một người dùng cụ thể dựa trên id được cung cấp
  async getUserById(id) {
    return await User.findByPk(id);
  }

  //tạo một người dùng mới trong cơ sở dữ liệu
  async createUser(userData) {
    return await User.create(userData);
  }


  //cập nhật thông tin của một người dùng có id được cung cấp
  async updateUser(id, userData) {
    const user = await User.findByPk(id);
    if (!user) return null;
    return await user.update(userData);
  }

  //xoá một người dùng có id được cung cấp
  async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) return null;
    return await user.destroy();
  }
}

module.exports = new UserRepository();
