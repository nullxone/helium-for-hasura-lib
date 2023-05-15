#!/usr/bin/env node

const path = require("path");
const fs = require("fs-extra");
const process = require("process");

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
  .argument("<module>", "Name of the module to import")
  .option("-s, --source <string>", "Source Helium Directory", "./helium")
  .description("Import Hasura Auth module to your project")
  .action((module, options) => {
    const modulePath = path.join(__dirname, "../modules", module);

    if (!fs.existsSync(modulePath)) {
      console.log(`Module ${module} does not exist`);
      process.exit(1);
    }

    fs.copySync(
      modulePath,
      path.join(process.cwd(), options.source, "modules", module)
    );
  });

program.parse();
