#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .version('0.0.9')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => console.log(genDiff(firstConfig, secondConfig)))
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);
