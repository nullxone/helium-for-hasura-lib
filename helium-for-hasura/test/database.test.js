const Database = require("../database");
const { Model } = require("../model");
const path = require("path");
const fs = require("fs-extra");

test("database config to database metadata", () => {
  const appDir = path.join(__dirname, "./AppSimple");
  fs.emptyDirSync(path.join(appDir, "metadata"));

  Database.compile(
    require(path.join(appDir, "helium/Database")),
    path.join(appDir, "metadata")
  );

  const outFile = path.join(appDir, "metadata/databases/databases.yaml");

  expect(fs.existsSync(outFile)).toBe(true);
  expect(fs.readFileSync(outFile, "utf8")).toMatchSnapshot();
});

test("write all tables file", () => {
  const appDir = path.join(__dirname, "./AppSimple");
  const metadataDir = path.join(appDir, "metadata");
  fs.emptyDirSync(metadataDir);

  Model.compile(require(path.join(appDir, "helium/models/Users")), metadataDir);

  Model.compile(require(path.join(appDir, "helium/models/Tasks")), metadataDir);

  Database.writeAllTables(metadataDir);

  const outFile = path.join(
    metadataDir,
    "databases/default/tables/tables.yaml"
  );

  expect(fs.existsSync(outFile)).toBe(true);
  expect(fs.readFileSync(outFile, "utf8")).toMatchSnapshot();
});
