// models/ComputersDevices.js
"use strict";

module.exports = (sequelize, DataTypes) => {
  const ComputersDevices = sequelize.define(
    "ComputersDevices",
    {
      computer_device_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      computer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      device_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("operational", "maintenance", "faulty"),
        allowNull: false,
      },
    },
    {
      tableName: "computers_devices",
      timestamps: false,
    }
  );

  ComputersDevices.associate = (models) => {
    // Define associations
    ComputersDevices.belongsTo(models.Computer, {
      foreignKey: "computer_id",
      as: "computer",
    });

  ComputersDevices.belongsTo(models.Device, {
    foreignKey: "device_id",
    as: "device",
  });
  ComputersDevices.hasMany(models.ReportDetail, {
    foreignKey: "computer_device_id",
    as: "reportDetails",
  });
}

  return ComputersDevices;
};
