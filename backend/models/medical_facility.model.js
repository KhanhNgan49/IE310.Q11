"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class MedicalFacility extends Model {}

MedicalFacility.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    facility_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    facility_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    facility_point_id: DataTypes.STRING,
    type_id: DataTypes.STRING,
    creator_id: DataTypes.STRING,
    services: DataTypes.TEXT,
    address: DataTypes.STRING,
    province_id: DataTypes.STRING,
    phone: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: "active",
    },
  },
  {
    sequelize,
    modelName: "MedicalFacility",
    tableName: "medical_facilities",
    timestamps: true,
  }
);

module.exports = MedicalFacility;