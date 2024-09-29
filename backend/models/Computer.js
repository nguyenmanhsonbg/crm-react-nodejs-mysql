// models/Computer.js
"use strict";

module.exports = (sequelize, DataTypes) => {
  const Computer = sequelize.define(
    "Computer",
    {
      computer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      computer_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "computers",
      timestamps: false,
    }
  );

  // Define associations
  Computer.associate = (models) => {
    Computer.belongsTo(models.ComputerRoom, {
      foreignKey: "room_id",
      as: "computerRoom",
    });
    Computer.hasMany(models.ComputersDevices, {
      foreignKey: "computer_id",
      as: "computersDevices",
    });
    Computer.hasMany(models.ComputerSoftware, {
      foreignKey: "computer_id",
      as: "computerSoftware",
    });
  };

  return Computer;
};
