"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const { NODE_ENV } = require("../variables/global");
const basename = path.basename(__filename);
const config = require(__dirname + "/../config/config.js");
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[NODE_ENV], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });
  
// Import individual models manually if not included in the loop
db.ComputerRoom = require("./ComputerRoom")(sequelize, Sequelize.DataTypes);
db.Computer = require("./Computer")(sequelize, Sequelize.DataTypes);
db.Device = require("./Device")(sequelize, Sequelize.DataTypes);
db.Software = require("./Software")(sequelize, Sequelize.DataTypes);
db.User = require("./User")(sequelize, Sequelize.DataTypes);
db.ComputerType = require("./ComputerType")(sequelize, Sequelize.DataTypes);
db.ComputersDevices = require("./ComputersDevices")(sequelize, Sequelize.DataTypes);
db.ComputerSoftware = require("./ComputerSoftware")(sequelize, Sequelize.DataTypes);
db.Support = require("./Support")(sequelize, Sequelize.DataTypes);
db.IncidentReport = require("./IncidentReport")(sequelize, Sequelize.DataTypes);
db.MaintenanceHistory = require("./MaintenanceHistory")(sequelize, Sequelize.DataTypes);
db.ReportDetail = require("./ReportDetail")(sequelize, Sequelize.DataTypes);
db.ComputerTypeDevice = require("./ComputerTypeDevice")(sequelize, Sequelize.DataTypes);
db.ComputerTypeSoftware = require("./ComputerTypeSoftware")(sequelize, Sequelize.DataTypes);
db.SequelizeMeta = require("./SequelizeMeta")(sequelize, Sequelize.DataTypes);
// Apply associations
Object.keys(db)
  .forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db); // Use the `db` object for associations
    }
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
