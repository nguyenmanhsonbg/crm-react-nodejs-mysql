// models/ComputerTypeSoftware.js
"use strict";

module.exports = (sequelize, DataTypes) => {
  const ComputerTypeSoftware = sequelize.define(
    "ComputerTypeSoftware",
    {
      type_software_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      software_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "computer_type_software",
      timestamps: false,
    }
  );

  // Define associations
  ComputerTypeSoftware.associate = (models) => {
  ComputerTypeSoftware.belongsTo(models.ComputerType, {
    foreignKey: "type_id",
    as: "computerType",
  });
  ComputerTypeSoftware.belongsTo(models.Software, {
    foreignKey: "software_id",
    as: "software",
  });
}
  return ComputerTypeSoftware;
};
