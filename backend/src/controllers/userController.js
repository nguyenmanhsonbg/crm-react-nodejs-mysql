// controllers/usersController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersService = require('../services/UserService');
const { User } = require('../../models');

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("Received login request for username:", username);
    console.log("Request body:", req.body);

    // Kiểm tra nếu không có giá trị `username` hoặc `password`
    if (!username || !password) {
      return res.status(400).json({ message: 'Username và password là bắt buộc!' });
    }

    // Tìm người dùng theo username
    const user = await User.findOne({ where: { username } });
    
    // Nếu không tìm thấy người dùng
    if (!user) {
      return res.status(404).json({ message: `User with username "${username}" not found` });
    }

    console.log("User found:", user);

    // So sánh mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials: Mật khẩu không đúng' });
    }

    // Tạo JWT token
    const userData = { id: user.user_id, username: user.username, role: user.role };
    const token = jwt.sign(userData, "1234567", { expiresIn: '1h' });

    console.log("Generated JWT token for user:", userData);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.user_id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: error.message });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserRoleSupport = async (req, res) => {
  try {

    const user = await usersService.getUserRoleSupport();
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersService.getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await usersService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;  // Lấy user ID từ params
    const { username, email, full_name, password, role, image_path, status } = req.body;
    console.log("Update user")
    // Cập nhật user với các thông tin mới từ body
    const updatedUser = await usersService.updateUser(id, {
      username,
      email,
      full_name,
      password,
      role,
      image_path,
      status,
    });

    if (updatedUser) {
      res.status(200).json({ message: 'User updated successfully', updatedUser });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await usersService.deleteUser(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getUserRoleSupport
};
