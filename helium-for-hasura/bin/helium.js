#!/usr/bin/env node

const path = require("path");
const fs = require("fs-extra");

const { Command } = require("commander");
const program = new Command();

const package = require("../package.json");

program
  .name("helium")
  .description(package.description)
  .version(package.version);

program
  .command("compile")
  .description("Compile Helium models to Hasura metadata")
  .option("-s, --source <string>", "Source Helium Directory", "./helium")
  .option("-t, --target <string>", "Target Metadata Directory", "./metadata")
  .action((options) => {
    require("../metadata").compile(
      path.join(process.cwd(), options.source),
      path.join(process.cwd(), options.target)
    );
  });

program.command("deploy", "Deploy compiled metadata to Hasura", {
  executableFile: "helium-deploy.sh",
});

program
  .command("module")
  .description("Import a module, currently only hasura-auth")
  .command("import")
  .command("hasura-auth")
  .option("-s, --source <string>", "Source Helium Directory", "./helium")
  .description("Import Hasura Auth module to your project")
  .action((options) => {
    fs.copySync(
      path.join(__dirname, "../modules/hasura-auth"),
      path.join(process.cwd(), options.source, "modules/hasura-auth")
    );
  });

program.parse();
