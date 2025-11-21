"use strict";
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class OutbreakArea extends Model {}

OutbreakArea.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    outbreak_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    outbreak_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    disease_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creator_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    disease_cases: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    severity_level: {
      type: DataTypes.ENUM("low", "medium", "high"),
      allowNull: false,
      defaultValue: "low",
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "OutbreakArea",
    tableName: "outbreak_areas",
    timestamps: true,
  }
);

module.exports = OutbreakArea;