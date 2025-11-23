const Pharmacy = require("../models/pharmacy.model");

module.exports = {
  async create(data) {
    return await Pharmacy.create(data);
  },

  async findAll() {
    return await Pharmacy.findAll();
  },

  async findOne(id) {
    return await Pharmacy.findByPk(id);
  },

  async update(id, data) {
    const pharmacy = await Pharmacy.findByPk(id);
    if (!pharmacy) return null;
    await pharmacy.update(data);
    return pharmacy;
  },

  async delete(id) {
    const pharmacy = await Pharmacy.findByPk(id);
    if (!pharmacy) return null;
    await pharmacy.destroy();
    return true;
  }
};