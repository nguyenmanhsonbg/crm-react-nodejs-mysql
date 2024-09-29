// models/ReportDetail.js
"use strict";

module.exports = (sequelize, DataTypes) => {
  const ReportDetail = sequelize.define(
    "ReportDetail",
    {
      report_detail_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      report_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      computer_device_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      computer_software_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "report_details",
      timestamps: false,
    }
  );

  // Define associations
  ReportDetail.associate = (models) => {
    ReportDetail.belongsTo(models.IncidentReport, { foreignKey: "report_id", as: "incidentReport" });
    ReportDetail.belongsTo(models.ComputersDevices, { foreignKey: "computer_device_id", as: "computersDevice" });
    ReportDetail.belongsTo(models.ComputerSoftware, { foreignKey: "computer_software_id", as: "computerSoftware" });
  };

  return ReportDetail;
};
