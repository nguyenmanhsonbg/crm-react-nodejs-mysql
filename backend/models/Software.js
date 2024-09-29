// models/Software.js
"use strict";

module.exports = (sequelize, DataTypes) => {
  const Software = sequelize.define(
    "Software",
    {
      software_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      software_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      version: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      license_expiration_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      tableName: "software",
      timestamps: false,
    }
  );

  // Define associations
  Software.associate = (models) => {
    Software.hasMany(models.ComputerSoftware, {
      foreignKey: "software_id",
      as: "computerSoftware",
    });
    Software.hasMany(models.ComputerTypeSoftware, {
      foreignKey: "software_id",
      as: "computerTypeSoftware",
    });
  };

  return Software;
};
