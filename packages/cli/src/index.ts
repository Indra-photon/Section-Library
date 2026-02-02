#!/usr/bin/env node

import { Command } from "commander";
import { init } from "./commands/init.js";
import { add } from "./commands/add.js";
import { list } from "./commands/list.js";
import { info } from "./commands/info.js";

const packageJson = {
  name: "framekit",
  version: "0.1.0",
  description: "CLI tool for installing UI sections from Framekit registry"
};

function main() {
  const program = new Command()
    .name(packageJson.name)
    .description(packageJson.description)
    .version(
      packageJson.version,
      "-v, --version",
      "Display the version number"
    );

  program
    .command("init")
    .description("Initialize framekit in your project")
    .action(async () => {
      await init();
    });

  program
    .command("add")
    .description("Add a section to your project")
    .argument("[sections...]", "The sections to add")
    .option("-y, --yes", "Skip confirmation prompt", false)
    .option("-o, --overwrite", "Overwrite existing files", false)
    .option("-p, --path <path>", "Custom installation path")
    .action(async (sections, opts) => {
      await add(sections, opts);
    });

  program
    .command("list")
    .description("List all sections or sections in a domain")
    .argument("[domain]", "The domain to list sections from")
    .action(async (domain) => {
      await list(domain);
    });

  program
    .command("info")
    .description("Show detailed information about a section")
    .argument("<section>", "The section to get info about (e.g., ecommerce-hero)")
    .action(async (section) => {
      await info(section);
    });

  program.parse();
}

main();
