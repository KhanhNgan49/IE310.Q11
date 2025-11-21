const OutbreakArea = require("../models/outbreak_area.model");

module.exports = {
  async create(data) {
    return await OutbreakArea.create(data);
  },

  async findAll() {
    return await OutbreakArea.findAll();
  },

  async findOne(id) {
    return await OutbreakArea.findByPk(id);
  },

  async update(id, data) {
    const outbreak = await OutbreakArea.findByPk(id);
    if (!outbreak) return null;
    await outbreak.update(data);
    return outbreak;
  },

  async delete(id) {
    const outbreak = await OutbreakArea.findByPk(id);
    if (!outbreak) return null;
    await outbreak.destroy();
    return true;
  }
};