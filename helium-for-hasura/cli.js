#!/usr/bin/env node

const { Command } = require("commander");
const program = new Command();

const package = require("./package.json");

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
    console.log(options.source, options.target);
  });

program.parse();
