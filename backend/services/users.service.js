const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user.model");

async function createUser(data) {
  return await User.create(data);
}

async function getAllUsers() {
  return await User.findAll();
}

async function getUserById(id) {
  return await User.findByPk(id);
}

async function updateUser(id, data) {
  const user = await User.findByPk(id);
  if (!user) return null;
  return await user.update(data);
}

async function deleteUser(id) {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.destroy();
  return user;
}

async function loginUser(email, password) {
  try {
    // Tìm user theo email
    const user = await User.findOne({ where: { email } }); //cần sửa cái findOne
    if (!user) {
      return { success: false, message: "Email is not existed" };
    }

    // Kiểm tra mật khẩu
    const isValidPassword = await bcrypt.compare(password, user.password); //cần thêm mã hóa mật khẩu
    if (!isValidPassword) {
      return { success: false, message: "Password is incorect" };
    }

    // Tạo JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Loại bỏ password trước khi trả về
    const userWithoutPassword = { ...user.toJSON() };
    delete userWithoutPassword.password;

    return {
      success: true,
      user: userWithoutPassword,
      token
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser
};