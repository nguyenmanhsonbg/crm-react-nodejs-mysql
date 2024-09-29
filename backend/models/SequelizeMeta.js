// models/SequelizeMeta.js
"use strict";

module.exports = (sequelize, DataTypes) => {
  const SequelizeMeta = sequelize.define(
    "SequelizeMeta",
    {
      name: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
      },
    },
    {
      tableName: "sequelizemeta",
      timestamps: false,
    }
  );

  return SequelizeMeta;
};
