// models/User.js
"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("teacher", "admin", "support"),
        allowNull: false,
      },
      image_path: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("active", "deactive"),
        allowNull: false,
      }
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );

  // Define associations
  User.associate = (models) => {
    User.hasMany(models.IncidentReport, {
      foreignKey: "reported_by",
      as: "incidentReports",
    });
    User.hasMany(models.MaintenanceHistory, {
      foreignKey: "performed_by",
      as: "maintenanceHistory",
    });
    User.hasMany(models.Support, {
      foreignKey: "user_id",
      as: "supports",
    });
  };

  return User;
};
