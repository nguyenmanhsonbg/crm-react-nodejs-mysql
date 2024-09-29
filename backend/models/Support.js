// models/Support.js
"use strict";

module.exports = (sequelize, DataTypes) => {
  const Support = sequelize.define(
    "Support",
    {
      support_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "support",
      timestamps: false,
    }
  );

  // Define associations
  Support.associate = (models) => {
    Support.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    Support.belongsTo(models.ComputerRoom, { foreignKey: "room_id", as: "computerRoom" });
  };

  return Support;
};
