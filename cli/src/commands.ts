import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import * as fs from 'fs';
import * as readline from 'readline';
import chalk from 'chalk';
import ora from 'ora';

const execAsync = promisify(exec);
const VERSION = '0.0.1';
const REPO_URL = 'https://github.com/Himasnhu-AT/30day';
const REPO_CONTENT_URL = 'https://raw.githubusercontent.com/Himasnhu-AT/30day/refs/heads/main/';
const VERSION_CONFIG = 'https://raw.githubusercontent.com/Himasnhu-AT/30day/refs/heads/main/version'

interface FileConfig {
  templatePath: string;
  workspacePath: string;
  testPath: string;
  completed: boolean;
}

interface Config {
  currentDay: string;
  days: { [key: string]: FileConfig };
  projectType: string;
  workspacePath: string;
  version: string;
}

const DEFAULT_CONFIG: Config = {
  currentDay: "1",
  days: {},
  projectType: "",
  workspacePath: "",
  version: VERSION
};

const question = (query: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => rl.question(chalk.cyan(query), ans => {
    rl.close();
    resolve(ans);
  }));
};

const displayBanner = () => {
  console.log(chalk.blue(`
████████╗███████╗ ██████╗██╗  ██╗ ██████╗ ███████╗
╚══██╔══╝██╔════╝██╔════╝██║  ██║██╔═══██╗██╔════╝
   ██║   █████╗  ██║     ███████║██║   ██║███████╗
   ██║   ██╔══╝  ██║     ██╔══██║██║   ██║╚════██║
   ██║   ███████╗╚██████╗██║  ██║╚██████╔╝███████║
   ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
                                                   
${chalk.yellow('Version:')} ${chalk.green(VERSION)}
`));
};

const checkForUpdates = async () => {
  const spinner = ora('Checking for updates...').start();
  try {
    const response = await fetch(VERSION_CONFIG);
    if (!response.ok) {
      spinner.fail('Failed to fetch latest version');
      throw new Error('Failed to fetch latest version');
    }

    const latestVersion = await response.text();
    if (latestVersion > VERSION) {
      spinner.info(chalk.yellow(`New version available: ${chalk.green(latestVersion)}`));
      console.log(chalk.cyan('Run "npm update -g 30days" to update'));
    } else {
      spinner.succeed(chalk.green('You are using the latest version'));
    }
  } catch (error) {
    spinner.fail(chalk.red('Failed to check for updates: ' + error));
  }
};

const selectProject = async (): Promise<string> => {
  console.log(chalk.yellow('\nAvailable projects:'));
  console.log(chalk.cyan('1.') + ' Frontend Learning Path (30 days)');
  console.log(chalk.cyan('2.') + ' JavaScript Mastery (30 days)');
  console.log(chalk.cyan('3.') + ' Python Development (30 days)');
  console.log(chalk.cyan('4.') + ' React Development (30 days)\n');

  const answer = await question('Select a project (1-4): ');
  const projects: { [key: string]: string } = {
    '1': 'frontEnd_1',
    '2': 'javascript_1',
    '3': 'python_1',
    '4': 'react_1'
  };

  if (!projects[answer]) {
    console.error(chalk.red('Invalid selection. Please try again.'));
    return selectProject();
  }

  return projects[answer];
};

const selectWorkspacePath = async (): Promise<string> => {
  const defaultPath = path.join(process.cwd(), 'workspace');
  console.log('\nWhere would you like to store your work?');
  console.log(`Default: ${defaultPath}`);
  
  const answer = await question('Enter path (or press Enter for default): ');
  const workspacePath = answer.trim() || defaultPath;

  try {
    fs.mkdirSync(workspacePath, { recursive: true });
    return workspacePath;
  } catch (error) {
    console.error('Error creating workspace directory:', error);
    return selectWorkspacePath();
  }
};

export const setupRepo = async () => {
  try {
    displayBanner();
    await checkForUpdates();

    console.log(chalk.cyan('\nWelcome to TechOS Learning Platform!'));
    console.log(chalk.yellow('Let\'s get you set up with your learning journey.\n'));

    const projectType = await selectProject();
    const workspacePath = await selectWorkspacePath();
    
    const setupSpinner = ora('Setting up your development environment...').start();
    
    // Create necessary directories
    const templateFolder = path.join(workspacePath, 'templates');
    const userWorkspaceFolder = path.join(workspacePath, 'current');
    fs.mkdirSync(templateFolder, { recursive: true });
    fs.mkdirSync(userWorkspaceFolder, { recursive: true });

    // Clone the repo temporarily
    const cloneSpinner = ora('Cloning repository...').start();
    const tempRepoPath = path.join(workspacePath, 'temp-repo');
    await execAsync(`git clone ${REPO_URL} ${tempRepoPath}`);
    cloneSpinner.succeed('Repository cloned successfully');

    // Copy template files
    const copySpinner = ora('Copying template files...').start();
    const days = fs.readdirSync(path.join(tempRepoPath, projectType));
    days.forEach(day => {
      if (day.startsWith('day')) {
        const srcPath = path.join(tempRepoPath, projectType, day);
        const destPath = path.join(templateFolder, day);
        fs.cpSync(srcPath, destPath, { recursive: true });
      }
    });
    copySpinner.succeed('Template files copied successfully');

    // Initialize configuration
    const configSpinner = ora('Initializing configuration...').start();
    const config: Config = {
      ...DEFAULT_CONFIG,
      projectType,
      workspacePath
    };
    
    const configPath = path.join(workspacePath, 'config.json');
    const dayStorePath = path.join(workspacePath, 'dayStore.txt');
    
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    fs.writeFileSync(dayStorePath, '1');
    configSpinner.succeed('Configuration initialized');

    // Prepare day 1
    const day1Path = path.join(templateFolder, 'day1');
    if (fs.existsSync(day1Path)) {
      fs.cpSync(day1Path, path.join(userWorkspaceFolder, 'day1'), { recursive: true });
    }

    // Cleanup
    const cleanupSpinner = ora('Cleaning up...').start();
    fs.rmSync(tempRepoPath, { recursive: true, force: true });
    cleanupSpinner.succeed('Cleanup complete');

    setupSpinner.succeed(chalk.green('Setup complete! ✨'));
    
    console.log(chalk.cyan('\nYour workspace is located at: ') + chalk.yellow(workspacePath));
    console.log(chalk.green('\nGet started with Day 1 by checking the assignment.md file in your workspace.'));
    console.log(chalk.blue('\nHappy coding! 🚀'));

  } catch (error) {
    if (error instanceof Error) {
      console.error(chalk.red('Error setting up the repository:'), error.message);
    } else {
      console.error(chalk.red('An unknown error occurred while sumbitting assignment.'));
      console.error(error);
    }
  }
};

export const getConfig = (workspacePath: string): Config => {
  const configPath = path.join(workspacePath, 'config.json');
  return JSON.parse(fs.readFileSync(configPath, 'utf-8')) as Config;
};

export const updateDayStore = (workspacePath: string, day: string): void => {
  const dayStorePath = path.join(workspacePath, 'dayStore.txt');
  fs.writeFileSync(dayStorePath, day, 'utf-8');
};

export const submitAssignment = async (workspacePath: string) => {
  try {
    const dayStorePath = path.join(workspacePath, 'dayStore.txt');
    const currentDay = fs.readFileSync(dayStorePath, 'utf-8').trim();
    const config = getConfig(workspacePath);

    const currentDayConfig = config.days[currentDay];
    if (!currentDayConfig) {
      throw new Error(`No configuration found for day ${currentDay}`);
    }

    const testSpinner = ora('Running tests for your assignment...').start();

    const { stdout, stderr } = await execAsync(`ts-node ${currentDayConfig.testPath}`, {
      cwd: currentDayConfig.workspacePath
    });

    if (stderr) {
      testSpinner.fail(chalk.red('Test errors:'));
      console.error(chalk.red(stderr));
      return;
    }

    if (!stdout.includes('FAILED')) {
      testSpinner.succeed(chalk.green('All tests passed! 🎉'));

      config.days[currentDay] = {
        ...currentDayConfig,
        completed: true
      };
      
      // Move to next day
      const nextDay = String(Number(currentDay) + 1);
      if (config.days[nextDay]) {
        updateDayStore(workspacePath, nextDay);
        console.log(chalk.green(`\nCongratulations! 🎊 Moving on to day ${chalk.yellow(nextDay)}`));
      } else {
        console.log(chalk.green('\nCongratulations! 🎉 You have completed all available days!'));
      }
      
      // Save updated config
      const configPath = path.join(workspacePath, 'config.json');
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    } else {
      testSpinner.fail(chalk.red('Some tests failed'));
      console.log(chalk.yellow('\nTest results:'));
      console.log(stdout);
    }

  } catch (error) {
    if (error instanceof Error) {
      console.error(chalk.red('Error submitting the assignment:'), error.message);
    } else {
      console.error(chalk.red('An unknown error occurred while sumbitting assignment.'));
      console.error(error);
    }
  }
};
