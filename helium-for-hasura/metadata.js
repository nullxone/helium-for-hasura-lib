const Database = require("./database");
const { Model } = require("./model");
const path = require("path");
const fs = require("fs-extra");

class Metadata {
  static compile(heliumDir, metadataDir) {
    if (fs.existsSync(path.join(heliumDir, "modules"))) {
      fs.readdirSync(path.join(heliumDir, "modules")).forEach((module) => {
        if (fs.existsSync(path.join(heliumDir, "modules", module, "metadata")))
          fs.copySync(
            path.join(heliumDir, "modules", module, "metadata"),
            metadataDir
          );
      });
    }

    const modelsDir = path.join(heliumDir, "models");
    fs.readdirSync(modelsDir).forEach((file) => {
      Model.compile(require(path.join(modelsDir, file)), metadataDir);
    });

    Database.writeAllTables(metadataDir);

    const databaseFile = path.join(heliumDir, "Database");
    //if (fs.existsSync(databaseFile))
    Database.compile(require(databaseFile), metadataDir);
  }
}

module.exports = Metadata;
