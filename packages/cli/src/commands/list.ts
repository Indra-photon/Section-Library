import ora from "ora";
import chalk from "chalk";
import { fetchRegistryIndex } from "../utils/registry/fetch.js";
import { logger } from "../utils/logger.js";

export async function list(domain?: string) {
  const spinner = ora("Fetching registry...").start();

  const registry = await fetchRegistryIndex();

  if (!registry) {
    spinner.fail("Failed to fetch registry");
    process.exit(1);
  }

  spinner.succeed("Registry loaded");
  logger.break();

  if (domain) {
    // List sections in a specific domain
    const domainData = registry.domains.find((d) => d.id === domain);

    if (!domainData) {
      logger.error(`Domain "${domain}" not found.`);
      logger.break();
      logger.info("Available domains:");
      registry.domains.forEach((d) => {
        logger.info(`  • ${d.id}`);
      });
      process.exit(1);
    }

    // Filter sections by domain
    const domainSections = registry.sections.filter((s) => s.startsWith(`${domain}-`));

    logger.info(chalk.bold(`${domainData.name} Sections`));
    logger.info(chalk.gray(domainData.description));
    logger.break();

    if (domainSections.length === 0) {
      logger.warn("No sections available in this domain yet.");
    } else {
      logger.info(`${domainSections.length} sections available:`);
      logger.break();

      domainSections.forEach((section) => {
        logger.info(`  ${chalk.cyan("•")} ${chalk.bold(section)}`);
      });

      logger.break();
      logger.info(chalk.dim(`Install a section: framekit add ${domainSections[0]}`));
      logger.info(chalk.dim(`View details: framekit info ${domainSections[0]}`));
    }
  } else {
    // List all domains
    logger.info(chalk.bold("Available Domains"));
    logger.break();

    registry.domains.forEach((domain) => {
      const icon = domain.icon || "📦";
      const sectionText = domain.sectionCount === 1 ? "section" : "sections";

      logger.info(
        `${chalk.cyan("•")} ${chalk.bold(domain.name)} ${chalk.gray(`(${domain.sectionCount} ${sectionText})`)}`
      );
      logger.info(`  ${chalk.dim(domain.description)}`);
      logger.info(`  ${chalk.dim(`ID: ${domain.id}`)}`);
      logger.break();
    });

    logger.info(chalk.bold("Summary"));
    logger.info(`  • Total Domains: ${registry.totalDomains}`);
    logger.info(`  • Total Sections: ${registry.totalSections}`);
    logger.info(`  • Free Sections: ${registry.stats.freeSections}`);
    logger.break();

    logger.info(chalk.dim("List sections in a domain: framekit list <domain>"));
    logger.info(chalk.dim(`Example: framekit list ecommerce`));
  }
}
