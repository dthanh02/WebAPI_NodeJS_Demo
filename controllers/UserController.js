// các tuyến đường được định nghĩa để xử lý các yêu cầu HTTP 
// controllers/UserController.js
const express = require('express');
const router = express.Router();
const userRepository = require('../repositories/UserRepository');


//Xử lý yêu cầu GET để lấy tất cả người dùng từ cơ sở dữ liệu.
router.get('/', async (req, res) => {
  const users = await userRepository.getAllUsers();
  res.json(users);
});

//Xử lý yêu cầu GET để lấy một người dùng cụ thể dựa trên ID.
router.get('/:id', async (req, res) => {
  const user = await userRepository.getUserById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});


//Xử lý yêu cầu POST để tạo một người dùng mới.
router.post('/', async (req, res) => {
  const newUser = await userRepository.createUser(req.body);
  res.status(201).json(newUser);
});


//Xử lý yêu cầu PUT để cập nhật thông tin của một người dùng dựa trên ID.
router.put('/:id', async (req, res) => {
  const updatedUser = await userRepository.updateUser(req.params.id, req.body);
  if (!updatedUser) return res.status(404).json({ message: 'User not found' });
  res.json(updatedUser);
});


//Xử lý yêu cầu DELETE để xóa một người dùng dựa trên ID.
router.delete('/:id', async (req, res) => {
  const deletedUser = await userRepository.deleteUser(req.params.id);
  if (!deletedUser) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User deleted successfully' });
});

module.exports = router;
