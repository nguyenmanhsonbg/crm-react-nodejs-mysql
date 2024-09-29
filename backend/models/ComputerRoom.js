// models/ComputerRoom.js
"use strict";

module.exports = (sequelize, DataTypes) => {
  const ComputerRoom = sequelize.define(
    "ComputerRoom",
    {
      room_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      room_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "computer_rooms",
      timestamps: false,
    }
  );

  // Define associations
  ComputerRoom.associate = (models) => {
    ComputerRoom.hasMany(models.Computer, {
      foreignKey: "room_id",
      as: "computers",
    });
    ComputerRoom.hasMany(models.IncidentReport, {
      foreignKey: "room_id",
      as: "incidentReports",
    });
    ComputerRoom.hasMany(models.Support, {
      foreignKey: "room_id",
      as: "supports",
    });
  };

  return ComputerRoom;
};
