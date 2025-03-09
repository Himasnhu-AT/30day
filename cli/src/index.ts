#!/usr/bin/env node
import { Command } from 'commander';
import { setupRepo, submitAssignment } from './commands';
import * as path from 'path';

const program = new Command();

program
  .name('30days')
  .description('CLI tool for TechOS 30days assignments')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize the workspace and setup template files')
  .action(setupRepo);

program
  .command('submit')
  .description('Submit your current assignment for testing')
  .option('-w, --workspace <path>', 'Path to workspace directory', process.cwd())
  .action((options) => {
    const workspacePath = path.resolve(options.workspace);
    submitAssignment(workspacePath);
  });

program.parse(process.argv);
