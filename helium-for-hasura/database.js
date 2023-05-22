const fs = require("fs-extra");
const ejs = require("ejs");
const path = require("path");
const yaml = require("js-yaml");

class Database {
  static compile(klass, metadataDir) {
    const databaseMetadata = ejs.compile(
      fs.readFileSync(path.join(__dirname, "templates/database.ejs"), "utf8")
    )({ databaseUrl: klass.databaseUrl });

    fs.outputFileSync(this.outputFile(metadataDir), databaseMetadata);
  }

  static outputFile(metadataDir) {
    return path.join(metadataDir, "databases/databases.yaml");
  }

  static writeAllTables(metadataDir) {
    fs.ensureDirSync(path.join(metadataDir, "databases/default/tables"));
    fs.outputFileSync(
      this.outputAllTablesFile(metadataDir),
      yaml.dump(
        fs
          .readdirSync(path.join(metadataDir, "databases/default/tables"))
          .filter((file) => file !== "tables.yaml")
          .map((file) => `!include ${file}`)
      )
    );
  }

  static outputAllTablesFile(metadataDir) {
    return path.join(metadataDir, "databases/default/tables/tables.yaml");
  }
}

module.exports = Database;
