// models/ComputerTypeDevices.js
"use strict";

module.exports = (sequelize, DataTypes) => {
  const ComputerTypeDevice = sequelize.define(
    "ComputerTypeDevices",
    {
      type_device_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      device_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "computer_type_devices",
      timestamps: false,
    }
  );

  // Define associations
  ComputerTypeDevice.associate = (models) => {
  ComputerTypeDevice.belongsTo(models.ComputerType, {
    foreignKey: "type_id",
    as: "computerType",
  });
  ComputerTypeDevice.belongsTo(models.Device, {
    foreignKey: "device_id",
    as: "device",
  });
}

  return ComputerTypeDevice;
};
