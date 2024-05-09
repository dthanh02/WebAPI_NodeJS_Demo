const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const swaggerDocument = require('./swagger.json');
const sequelize = require('./database');
const User = require('./models/User');
const path = require('path'); 



// Sử dụng Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Sử dụng bodyParser để có thể đọc dữ liệu từ phần thân yêu cầu
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Định nghĩa tuyến đường GET cho "/users" để trả về dữ liệu người dùng dưới dạng JSON
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users); // Gửi danh sách người dùng dưới dạng JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy danh sách người dùng' });
  }
});

// Định nghĩa tuyến đường GET cho "/" để gửi file index.php
app.get('/', (req, res) => {
  // Gửi file index.php khi có yêu cầu GET đến "/"
  res.sendFile(path.join(__dirname, 'public', 'index.php'));
});

// Định nghĩa tuyến đường POST cho "/users" để thêm người dùng mới
app.post('/users', async (req, res) => {
    try {
      const { username, email, password } = req.body;
      // Tạo một người dùng mới trong cơ sở dữ liệu
      const newUser = await User.create({ username, email, password });
      // Trả về người dùng mới đã được tạo
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Đã xảy ra lỗi khi thêm người dùng mới' });
    }
});

// // Định nghĩa tuyến đường POST cho "/api/users" để thêm người dùng mới
// app.post('/api/users', async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     // Tạo một người dùng mới trong cơ sở dữ liệu
//     const newUser = await User.create({ username, email, password });
//     // Trả về người dùng mới đã được tạo
//     res.status(201).json(newUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Đã xảy ra lỗi khi thêm người dùng mới' });
//   }
// });
  
// Định nghĩa tuyến đường PUT cho "/users/:id" để cập nhật thông tin người dùng
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;
    // Cập nhật thông tin người dùng trong cơ sở dữ liệu
    const updatedUser = await User.update({ username, email, password }, { where: { id } });
    if (updatedUser[0] === 0) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng để cập nhật' });
    }
    // Trả về thông tin người dùng đã được cập nhật
    res.json({ message: 'Cập nhật thông tin người dùng thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật thông tin người dùng' });
  }
});
  
// Định nghĩa tuyến đường DELETE cho "/users/:id" để xoá người dùng
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Xoá người dùng từ cơ sở dữ liệu
    const deletedUser = await User.destroy({ where: { id } });
    if (!deletedUser) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng để xoá' });
    }
    // Trả về thông báo khi xoá thành công
    res.json({ message: 'Xoá người dùng thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi xoá người dùng' });
  }
});
  
// Đưa tất cả các tài nguyên tĩnh từ thư mục 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Định nghĩa tuyến đường GET cho URL gốc
app.get('/', (req, res) => {
  // Gửi file index.php từ thư mục 'public' khi có yêu cầu GET đến URL gốc
  res.sendFile(path.join(__dirname, 'public', 'index.php'));
});




// Khởi động máy chủ
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
