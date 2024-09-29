// models/IncidentReport.js
"use strict";

module.exports = (sequelize, DataTypes) => {
  const IncidentReport = sequelize.define(
    "IncidentReport",
    {
      report_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      room_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      reported_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      expected_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "in_progress", "resolved"),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      tableName: "incident_reports",
      timestamps: false,
    }
  );

  // Define associations
  IncidentReport.associate = (models) => {
    IncidentReport.belongsTo(models.ComputerRoom, { foreignKey: "room_id", as: "computerRoom" });
    IncidentReport.belongsTo(models.User, { foreignKey: "reported_by", as: "reportedBy" });
    IncidentReport.hasMany(models.ReportDetail, { foreignKey: "report_id", as: "reportDetails" });
    IncidentReport.hasMany(models.MaintenanceHistory, { foreignKey: "incident_report_id", as: "maintenanceHistory" });
  };

  return IncidentReport;
};
