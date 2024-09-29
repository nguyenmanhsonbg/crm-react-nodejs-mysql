// models/MaintenanceHistory.js
"use strict";

module.exports = (sequelize, DataTypes) => {
  const MaintenanceHistory = sequelize.define(
    "MaintenanceHistory",
    {
      maintenance_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      incident_report_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      performed_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      maintenance_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "maintenance_history",
      timestamps: false,
    }
  );

  // Define associations
  MaintenanceHistory.associate = (models) => {
    MaintenanceHistory.belongsTo(models.IncidentReport, { foreignKey: "incident_report_id", as: "incidentReport" });
    MaintenanceHistory.belongsTo(models.User, { foreignKey: "performed_by", as: "performedBy" });
  };

  return MaintenanceHistory;
};
