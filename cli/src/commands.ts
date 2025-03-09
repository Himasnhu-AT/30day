import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import * as fs from 'fs';
import * as readline from 'readline';

const execAsync = promisify(exec);
const VERSION = '0.0.1';
const REPO_URL = 'https://github.com/TechOS/30days.git';

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

  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
};

const displayBanner = () => {
  console.log(`
████████╗███████╗ ██████╗██╗  ██╗ ██████╗ ███████╗
╚══██╔══╝██╔════╝██╔════╝██║  ██║██╔═══██╗██╔════╝
   ██║   █████╗  ██║     ███████║██║   ██║███████╗
   ██║   ██╔══╝  ██║     ██╔══██║██║   ██║╚════██║
   ██║   ███████╗╚██████╗██║  ██║╚██████╔╝███████║
   ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
                                                   
Version: ${VERSION}
`);
};

const checkForUpdates = async () => {
  try {
    console.log('Checking for updates...');
    const latestVersion = '0.0.2'; // This would come from an API call
    if (latestVersion > VERSION) {
      console.log('New version available:', latestVersion);
      console.log('Run "npm update -g 30days" to update');
    } else {
      console.log('You are using the latest version');
    }
  } catch (error) {
    console.error('Failed to check for updates:', error);
  }
};

const selectProject = async (): Promise<string> => {
  console.log('\nAvailable projects:');
  console.log('1. Frontend Learning Path (30 days)');
  console.log('2. JavaScript Mastery (30 days)');
  console.log('3. Python Development (30 days)');
  console.log('4. React Development (30 days)\n');

  const answer = await question('Select a project (1-4): ');
  const projects: { [key: string]: string } = {
    '1': 'frontEnd_1',
    '2': 'javascript_1',
    '3': 'python_1',
    '4': 'react_1'
  };

  if (!projects[answer]) {
    console.error('Invalid selection. Please try again.');
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

    console.log('\nWelcome to TechOS Learning Platform!');
    console.log('Let\'s get you set up with your learning journey.\n');

    const projectType = await selectProject();
    const workspacePath = await selectWorkspacePath();
    
    console.log('\nSetting up your development environment...');
    
    // Create necessary directories
    const templateFolder = path.join(workspacePath, 'templates');
    const userWorkspaceFolder = path.join(workspacePath, 'current');
    fs.mkdirSync(templateFolder, { recursive: true });
    fs.mkdirSync(userWorkspaceFolder, { recursive: true });

    // Clone the repo temporarily
    const tempRepoPath = path.join(workspacePath, 'temp-repo');
    await execAsync(`git clone ${REPO_URL} ${tempRepoPath}`);

    // Copy template files to templates folder
    const days = fs.readdirSync(path.join(tempRepoPath, projectType));
    days.forEach(day => {
      if (day.startsWith('day')) {
        const srcPath = path.join(tempRepoPath, projectType, day);
        const destPath = path.join(templateFolder, day);
        fs.cpSync(srcPath, destPath, { recursive: true });
      }
    });

    // Initialize configuration
    const config: Config = {
      ...DEFAULT_CONFIG,
      projectType,
      workspacePath
    };
    
    const configPath = path.join(workspacePath, 'config.json');
    const dayStorePath = path.join(workspacePath, 'dayStore.txt');
    
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    fs.writeFileSync(dayStorePath, '1');

    // Prepare day 1
    const day1Path = path.join(templateFolder, 'day1');
    if (fs.existsSync(day1Path)) {
      fs.cpSync(day1Path, path.join(userWorkspaceFolder, 'day1'), { recursive: true });
    }

    // Cleanup
    fs.rmSync(tempRepoPath, { recursive: true, force: true });

    console.log('\n✨ Setup complete! You\'re ready to start learning.');
    console.log(`\nYour workspace is located at: ${workspacePath}`);
    console.log('Get started with Day 1 by checking the assignment.md file in your workspace.');
    console.log('\nHappy coding! 🚀');

  } catch (error) {
    console.error('Error setting up the repository:', error);
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

    console.log('Running tests for your assignment...');
    const { stdout, stderr } = await execAsync(`ts-node ${currentDayConfig.testPath}`, {
      cwd: currentDayConfig.workspacePath
    });

    if (stderr) {
      console.error('Test errors:', stderr);
      return;
    }

    console.log('Test results:', stdout);

    // Mark as completed and update day if tests pass
    if (!stdout.includes('FAILED')) {
      config.days[currentDay] = {
        ...currentDayConfig,
        completed: true
      };
      
      // Move to next day
      const nextDay = String(Number(currentDay) + 1);
      if (config.days[nextDay]) {
        updateDayStore(workspacePath, nextDay);
        console.log(`\nCongratulations! Moving on to day ${nextDay}`);
      } else {
        console.log('\nCongratulations! You have completed all available days!');
      }
      
      // Save updated config
      const configPath = path.join(workspacePath, 'config.json');
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    }

  } catch (error) {
    console.error('Error submitting the assignment:', error);
  }
};
