#!/usr/bin/env node
import program from 'commander';

program
  .version('0.0.6')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);
