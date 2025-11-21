const MedicalFacility = require("../models/medical_facility.model");

async function createFacility(data) {
  return await MedicalFacility.create(data);
}

async function getAllFacilities() {
  return await MedicalFacility.findAll();
}

async function getFacilityById(id) {
  return await MedicalFacility.findByPk(id);
}

async function updateFacility(id, data) {
  const facility = await MedicalFacility.findByPk(id);
  if (!facility) return null;
  return await facility.update(data);
}

async function deleteFacility(id) {
  const facility = await MedicalFacility.findByPk(id);
  if (!facility) return null;
  await facility.destroy();
  return facility;
}

module.exports = {
  createFacility,
  getAllFacilities,
  getFacilityById,
  updateFacility,
  deleteFacility,
};