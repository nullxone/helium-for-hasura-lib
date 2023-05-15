#!/usr/bin/env node

const { Command } = require("commander");
const program = new Command();

const package = require("../package.json");

const path = require("path");

program
  .name("Helium for Hasura")
  .description(package.description)
  .version(package.version);

program
  .command("compile")
  .description("Compile Helium models to Hasura metadata")
  .option("-s, --source <string>", "Source Directory", "./helium")
  .option("-t, --target <string>", "Target Metadata Directory", "./metadata")
  .action((options) => {
    require("../metadata").compile(
      path.join(process.cwd(), options.source),
      path.join(process.cwd(), options.target)
    );
  });

program
  .command("deploy")
  .description("Deploy compiled metadata to Hasura")
  .action((options) => {});

program
  .command("module")
  .command("import")
  .command("hasura-auth")
  .description("Add Hasura Auth module to your project")
  .action((options) => {});

program.parse();
