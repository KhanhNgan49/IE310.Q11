const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

async function createUser(data) {
  return await User.create(data);
}

async function getAllUsers() {
  return await User.findAll({
    attributes: {
      exclude: ['password']
    }
  });
}

async function findUser({
  user_id,
  email,
  user_name
}) {
  const where = {};

  if (user_id) where.user_id = user_id;
  if (email) where.email = email;
  if (user_name) where.user_name = user_name;

  return await User.findOne({
    where,
    attributes: {
      exclude: ['password']
    }
  });
}

async function updateUser(user_id, data) {
  const user = await User.findByPk(user_id);
  if (!user) return null;

  return await user.update(data);
}

async function deleteUser(user_id) {
  const user = await User.findByPk(user_id);
  if (!user) return null;

  await user.destroy();
  return user;
}

async function loginUser(email, password) {
  // Tìm user theo email
  const user = await User.findOne({
    where: {
      email
    }
  }); //cần sửa cái findOne
  if (!user) {
    return {
      success: false,
      message: "Email is not existed"
    };
  }

  // Kiểm tra mật khẩu
  const isValidPassword = await bcrypt.compare(password, user.password); //cần thêm mã hóa mật khẩu
  if (!isValidPassword) {
    console.log("Sai pass")
    return {
      success: false,
      message: "Password is incorect"
    };
  }

  // Tạo JWT token
  const token = jwt.sign({
      user_id: user.user_id,
      role: user.role
    },
    JWT_SECRET, {
      expiresIn: '24h'
    }
  );

  return {
    success: true,
    user: user.toJSON(),
    token,
  };
}

module.exports = {
  createUser,
  getAllUsers,
  findUser,
  updateUser,
  deleteUser,
  loginUser
};