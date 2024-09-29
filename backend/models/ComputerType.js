// models/ComputerType.js
"use strict";

module.exports = (sequelize, DataTypes) => {
  const ComputerType = sequelize.define(
    "ComputerType",
    {
      type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "computer_types",
      timestamps: false,
    }
  );

  // Define associations
  ComputerType.associate = (models) => {
    ComputerType.hasMany(models.ComputerTypeDevice, {
      foreignKey: "type_id",
      as: "computerTypeDevices",
    });
    ComputerType.hasMany(models.ComputerTypeSoftware, {
      foreignKey: "type_id",
      as: "computerTypeSoftware",
    });
  };

  return ComputerType;
};
