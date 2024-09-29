// models/Device.js
"use strict";

module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define(
    "Device",
    {
      device_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      device_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      device_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "devices",
      timestamps: false,
    }
  );

  // Define associations
  Device.associate = (models) => {
    Device.hasMany(models.ComputersDevices, {
      foreignKey: "device_id",
      as: "computersDevices",
    });
    Device.hasMany(models.ComputerTypeDevice, {
      foreignKey: "device_id",
      as: "computerTypeDevices",
    });
  };

  return Device;
};
