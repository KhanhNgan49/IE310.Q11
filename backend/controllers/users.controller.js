const User = require("../models/user.model");

module.exports = {
  async create(req, res) {
    try {
      const { user_id, user_name, email, password } = req.body;

      const newUser = await User.create({ user_id, user_name, email, password });
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async findAll(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async findOne(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { user_id, user_name, email, password } = req.body;

      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ message: "User not found" });

      await user.update({ user_id, user_name, email, password });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ message: "User not found" });

      await user.destroy();
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};