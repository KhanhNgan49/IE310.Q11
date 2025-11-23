"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class Pharmacy extends Model {}

Pharmacy.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pharmacy_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    pharmacy_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pharmacy_point_id: DataTypes.STRING,
    creator_id: DataTypes.STRING,
    address: DataTypes.STRING,
    province_id: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Pharmacy",
    tableName: "pharmacies",
    timestamps: true,
  }
);

module.exports = Pharmacy;