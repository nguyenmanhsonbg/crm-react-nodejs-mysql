// models/ComputerSoftware.js
"use strict";

module.exports = (sequelize, DataTypes) => {
  const ComputerSoftware = sequelize.define(
    "ComputerSoftware",
    {
      computer_software_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      computer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      software_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("operational", "maintenance", "faulty"),
        allowNull: false,
      },
    },
    {
      tableName: "computer_software",
      timestamps: false,
    }
  );

  // Define associations
  ComputerSoftware.associate = (models) => {
    ComputerSoftware.belongsTo(models.Computer, { foreignKey: "computer_id", as: "computer" });
    ComputerSoftware.belongsTo(models.Software, { foreignKey: "software_id", as: "software" });
    ComputerSoftware.hasMany(models.ReportDetail, { foreignKey: "computer_software_id", as: "reportDetails" });
  };

  return ComputerSoftware;
};
