/**
 * Test case for Day 8 JavaScript Assignment
 * 
 * This file will verify that your solutions implement the required JavaScript functionality correctly.
 * To run this test: 
 * 1. Install Node.js if you haven't already (https://nodejs.org/)
 * 2. npm install jsdom puppeteer
 * 3. npm install typescript ts-node
 * 4. ts-node testCase.ts path/to/basics.html path/to/control-flow.html path/to/task-list.html path/to/calculator.html
 */

import * as fs from 'fs';
import * as path from 'path';
import { JSDOM } from 'jsdom';
import puppeteer from 'puppeteer';

// Get the file paths from command line arguments
const basicsFile = process.argv[2]; // JavaScript basics
const controlFlowFile = process.argv[3]; // Control flow and functions
const taskListFile = process.argv[4]; // DOM manipulation task list
const calculatorFile = process.argv[5]; // Calculator app

if (!basicsFile || !controlFlowFile || !taskListFile || !calculatorFile) {
  console.error('Please provide the paths to all four HTML files:');
  console.error('ts-node testCase.ts path/to/basics.html path/to/control-flow.html path/to/task-list.html path/to/calculator.html');
  process.exit(1);
}

// Test tracking variables
let passCount = 0;
let totalTests = 0;

function runTest(name: string, test: () => boolean | Promise<boolean>) {
  totalTests++;
  try {
    const result = test();
    if (result instanceof Promise) {
      return result.then(resolved => {
        if (resolved) {
          console.log(`✅ PASS: ${name}`);
          passCount++;
        } else {
          console.log(`❌ FAIL: ${name}`);
        }
      });
    } else if (result) {
      console.log(`✅ PASS: ${name}`);
      passCount++;
    } else {
      console.log(`❌ FAIL: ${name}`);
    }
    return Promise.resolve();
  } catch (error) {
    console.log(`❌ FAIL: ${name} (Error: ${error})`);
    return Promise.resolve();
  }
}

// Helper function to extract script content
function getScriptContent(document: Document, baseFilePath: string): string {
  let scriptContent = '';
  
  // Get inline scripts
  const scripts = document.querySelectorAll('script:not([src])');
  for (const script of Array.from(scripts)) {
    scriptContent += script.textContent + '\n';
  }
  
  // Get external scripts
  const externalScripts = document.querySelectorAll('script[src]');
  for (const script of Array.from(externalScripts)) {
    const src = script.getAttribute('src');
    if (src) {
      try {
        const scriptPath = path.resolve(path.dirname(baseFilePath), src);
        if (fs.existsSync(scriptPath)) {
          scriptContent += fs.readFileSync(scriptPath, 'utf8') + '\n';
        }
      } catch (error) {
        console.warn(`Could not load script file: ${error}`);
      }
    }
  }
  
  return scriptContent;
}

async function testBasicsFile() {
  console.log('\n=== Testing Task 1: JavaScript Basics ===\n');
  
  try {
    const html = fs.readFileSync(basicsFile, 'utf8');
    const dom = new JSDOM(html, { runScripts: 'outside-only' });
    const document = dom.window.document;
    
    let scriptContent = getScriptContent(document, basicsFile);
    
    // Check if external script is linked
    await runTest('Task 1: Links to external JavaScript file', () => {
      return document.querySelector('script[src]') !== null;
    });
    
    // Check for variable declarations using let, const, and var
    await runTest('Task 1: Uses let, const, and var for variable declarations', () => {
      return scriptContent.includes('let ') && 
             scriptContent.includes('const ') && 
             scriptContent.includes('var ');
    });
    
    // Check for primitive data types
    await runTest('Task 1: Demonstrates primitive data types', () => {
      const hasNumber = /\d+(\.\d+)?/.test(scriptContent) || scriptContent.includes('number');
      const hasString = /(["'])(?:(?=(\\?))\2.)*?\1/.test(scriptContent) || scriptContent.includes('string');
      const hasBoolean = /(true|false)/.test(scriptContent) || scriptContent.includes('boolean');
      const hasNull = scriptContent.includes('null');
      const hasUndefined = scriptContent.includes('undefined');
      
      // Symbol and BigInt are optional since they're newer
      return hasNumber && hasString && hasBoolean && 
             (hasNull || hasUndefined);
    });
    
    // Check for operators
    await runTest('Task 1: Demonstrates various operators', () => {
      const hasArithmetic = /[\+\-\*\/\%]/.test(scriptContent);
      const hasAssignment = /[\=\+\=\-\=\*\=\/\=\%\=]/.test(scriptContent);
      const hasComparison = /[\=\=\=\=\=\!\=\>\<\>\=\<\=]/.test(scriptContent);
      const hasLogical = /[\&\&\|\|\!]/.test(scriptContent);
      
      return hasArithmetic && hasAssignment && (hasComparison || hasLogical);
    });
    
    // Check for console.log usage
    await runTest('Task 1: Uses console.log for output', () => {
      return scriptContent.includes('console.log');
    });
    
  } catch (error) {
    console.error(`Error testing task 1: ${error}`);
  }
}

async function testControlFlowFile() {
  console.log('\n=== Testing Task 2: Control Flow and Functions ===\n');
  
  try {
    const html = fs.readFileSync(controlFlowFile, 'utf8');
    const dom = new JSDOM(html, { runScripts: 'outside-only' });
    const document = dom.window.document;
    
    let scriptContent = getScriptContent(document, controlFlowFile);
    
    // Check for the required functions
    await runTest('Task 2: Implements generateMultiplicationTable function', () => {
      return scriptContent.includes('function generateMultiplicationTable') ||
             scriptContent.includes('generateMultiplicationTable =');
    });
    
    await runTest('Task 2: Implements isPrime function', () => {
      return scriptContent.includes('function isPrime') ||
             scriptContent.includes('isPrime =');
    });
    
    await runTest('Task 2: Implements processNumbers function', () => {
      return scriptContent.includes('function processNumbers') ||
             scriptContent.includes('processNumbers =');
    });
    
    // Check for control structures
    await runTest('Task 2: Uses conditionals (if statements)', () => {
      return /if\s*\(.*\)/.test(scriptContent);
    });
    
    await runTest('Task 2: Uses loops', () => {
      return /for\s*\(.*\)/.test(scriptContent) || 
             /while\s*\(.*\)/.test(scriptContent) ||
             scriptContent.includes('.forEach') ||
             scriptContent.includes('.map');
    });
    
    // Execute the script in a browser-like environment to test functionality
    await runTest('Task 2: Functions produce expected output', async () => {
      const browser = await puppeteer.launch({ headless: true });
      try {
        const page = await browser.newPage();
        await page.goto(`file://${path.resolve(controlFlowFile)}`, { waitUntil: 'networkidle0' });
        
        // Test the multiplication table function
        const multiplicationTableResult = await page.evaluate(() => {
          if (typeof generateMultiplicationTable !== 'function') return false;
          
          const table = generateMultiplicationTable(5, 3);
          return Array.isArray(table) && 
                 table.length === 3 && 
                 table[0] === '5 x 1 = 5' && 
                 table[1] === '5 x 2 = 10' && 
                 table[2] === '5 x 3 = 15';
        });
        
        // Test the isPrime function
        const isPrimeResult = await page.evaluate(() => {
          if (typeof isPrime !== 'function') return false;
          
          return isPrime(2) === true && 
                 isPrime(7) === true && 
                 isPrime(4) === false && 
                 isPrime(9) === false;
        });
        
        // Test the processNumbers function
        const processNumbersResult = await page.evaluate(() => {
          if (typeof processNumbers !== 'function') return false;
          
          const result = processNumbers([1, 2, 3, 4, 5]);
          
          return result && 
                 Array.isArray(result.primes) && 
                 Array.isArray(result.evens) && 
                 Array.isArray(result.odds) &&
                 result.primes.includes(2) &&
                 result.primes.includes(3) &&
                 result.primes.includes(5) &&
                 result.evens.includes(2) &&
                 result.evens.includes(4) &&
                 result.odds.includes(1);
        });
        
        await browser.close();
        return multiplicationTableResult && isPrimeResult && processNumbersResult;
      } catch (error) {
        await browser.close();
        throw error;
      }
    });
    
  } catch (error) {
    console.error(`Error testing task 2: ${error}`);
  }
}

async function testTaskListFile() {
  console.log('\n=== Testing Task 3: DOM Manipulation ===\n');
  
  try {
    const html = fs.readFileSync(taskListFile, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Check for required elements
    await runTest('Task 3: Has form with text input and button', () => {
      const form = document.querySelector('form');
      const textInput = document.querySelector('input[type="text"]');
      const button = document.querySelector('button');
      
      return form !== null && textInput !== null && button !== null;
    });
    
    await runTest('Task 3: Has task list container', () => {
      const taskList = document.querySelector('ul') || document.querySelector('.task-list') || document.querySelector('#tasks');
      return taskList !== null;
    });
    
    // Test functionality with Puppeteer
    await runTest('Task 3: Can add tasks', async () => {
      const browser = await puppeteer.launch({ headless: true });
      try {
        const page = await browser.newPage();
        await page.goto(`file://${path.resolve(taskListFile)}`, { waitUntil: 'networkidle0' });
        
        // Get the initial task count
        const initialTaskCount = await page.evaluate(() => {
          const tasks = document.querySelectorAll('li') || document.querySelectorAll('.task');
          return tasks.length;
        });
        
        // Add a new task
        await page.type('input[type="text"]', 'Test task');
        await page.click('button[type="submit"]') || await page.click('form button');
        
        // Wait briefly for any potential animations/transitions
        await page.waitForTimeout(500);
        
        // Check if the task was added
        const newTaskCount = await page.evaluate(() => {
          const tasks = document.querySelectorAll('li') || document.querySelectorAll('.task');
          return tasks.length;
        });
        
        await browser.close();
        return newTaskCount > initialTaskCount;
      } catch (error) {
        await browser.close();
        throw error;
      }
    });
    
    await runTest('Task 3: Can mark tasks as completed', async () => {
      const browser = await puppeteer.launch({ headless: true });
      try {
        const page = await browser.newPage();
        await page.goto(`file://${path.resolve(taskListFile)}`, { waitUntil: 'networkidle0' });
        
        // Add a task first to ensure there is something to click
        await page.type('input[type="text"]', 'Task to complete');
        await page.click('button[type="submit"]') || await page.click('form button');
        
        // Wait briefly
        await page.waitForTimeout(500);
        
        // Click on the task (first li or first .task)
        await page.evaluate(() => {
          const task = document.querySelector('li') || document.querySelector('.task');
          if (task) {
            // Simulate a click on the task text, not on any buttons
            const taskText = task.querySelector('span') || task.childNodes[0];
            if (taskText) {
              taskText.click();
            } else {
              task.click();
            }
          }
        });
        
        // Wait briefly
        await page.waitForTimeout(500);
        
        // Check if the task has the "completed" class or strike-through style
        const isCompleted = await page.evaluate(() => {
          const task = document.querySelector('li') || document.querySelector('.task');
          if (!task) return false;
          
          // Check for completed class
          if (task.classList.contains('completed')) return true;
          
          // Or check for strike-through style
          const style = window.getComputedStyle(task);
          return style.textDecoration.includes('line-through');
        });
        
        await browser.close();
        return isCompleted;
      } catch (error) {
        await browser.close();
        throw error;
      }
    });
    
    await runTest('Task 3: Can delete tasks', async () => {
      const browser = await puppeteer.launch({ headless: true });
      try {
        const page = await browser.newPage();
        await page.goto(`file://${path.resolve(taskListFile)}`, { waitUntil: 'networkidle0' });
        
        // Add a task first to ensure there is something to delete
        await page.type('input[type="text"]', 'Task to delete');
        await page.click('button[type="submit"]') || await page.click('form button');
        
        // Wait briefly
        await page.waitForTimeout(500);
        
        // Get initial task count
        const initialTaskCount = await page.evaluate(() => {
          const tasks = document.querySelectorAll('li') || document.querySelectorAll('.task');
          return tasks.length;
        });
        
        // Click the delete button
        await page.evaluate(() => {
          const deleteButton = document.querySelector('.delete-btn') || 
                               document.querySelector('button.delete') || 
                               document.querySelector('li button') ||
                               document.querySelector('.task button');
          
          if (deleteButton) deleteButton.click();
        });
        
        // Wait briefly
        await page.waitForTimeout(500);
        
        // Check if task count decreased
        const newTaskCount = await page.evaluate(() => {
          const tasks = document.querySelectorAll('li') || document.querySelectorAll('.task');
          return tasks.length;
        });
        
        await browser.close();
        return initialTaskCount > newTaskCount;
      } catch (error) {
        await browser.close();
        throw error;
      }
    });
    
  } catch (error) {
    console.error(`Error testing task 3: ${error}`);
  }
}

async function testCalculatorFile() {
  console.log('\n=== Testing Task 4: Calculator Application ===\n');
  
  try {
    const html = fs.readFileSync(calculatorFile, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Check for required elements
    await runTest('Task 4: Has calculator display', () => {
      const display = document.querySelector('#display') || 
                     document.querySelector('.display') ||
                     document.querySelector('[class*="display"]');
      
      return display !== null;
    });
    
    await runTest('Task 4: Has number buttons (0-9)', () => {
      const buttons = document.querySelectorAll('button');
      let hasNumbers = true;
      
      // Check for buttons 0-9
      for (let i = 0; i <= 9; i++) {
        let found = false;
        
        // Check button content or value attribute
        for (const button of Array.from(buttons)) {
          if (button.textContent.trim() === String(i) || button.getAttribute('value') === String(i)) {
            found = true;
            break;
          }
        }
        
        if (!found) {
          hasNumbers = false;
          break;
        }
      }
      
      return hasNumbers;
    });
    
    await runTest('Task 4: Has operator buttons (+, -, *, /)', () => {
      const buttons = document.querySelectorAll('button');
      const operators = ['+', '-', '*', '/'];
      
      for (const op of operators) {
        let found = false;
        
        for (const button of Array.from(buttons)) {
          if (button.textContent.trim() === op || button.getAttribute('value') === op) {
            found = true;
            break;
          }
        }
        
        if (!found) return false;
      }
      
      return true;
    });
    
    await runTest('Task 4: Has equals button (=)', () => {
      const buttons = document.querySelectorAll('button');
      
      for (const button of Array.from(buttons)) {
        if (button.textContent.trim() === '=' || 
            button.getAttribute('value') === '=' || 
            button.id === 'equals') {
          return true;
        }
      }
      
      return false;
    });
    
    await runTest('Task 4: Has clear button (C)', () => {
      const buttons = document.querySelectorAll('button');
      
      for (const button of Array.from(buttons)) {
        if (button.textContent.trim() === 'C' || 
            button.getAttribute('value') === 'C' || 
            button.id === 'clear' ||
            /clear/i.test(button.className)) {
          return true;
        }
      }
      
      return false;
    });
    
    // Test functionality with Puppeteer
    await runTest('Task 4: Can input numbers', async () => {
      const browser = await puppeteer.launch({ headless: true });
      try {
        const page = await browser.newPage();
        await page.goto(`file://${path.resolve(calculatorFile)}`, { waitUntil: 'networkidle0' });
        
        // Click number buttons to form "123"
        await page.evaluate(() => {
          const buttons = document.querySelectorAll('button');
          for (const digit of ['1', '2', '3']) {
            for (const button of Array.from(buttons)) {
              if (button.textContent.trim() === digit || button.getAttribute('value') === digit) {
                button.click();
                break;
              }
            }
          }
        });
        
        // Check if the display shows the number
        const displayValue = await page.evaluate(() => {
          const display = document.querySelector('#display') || 
                         document.querySelector('.display') ||
                         document.querySelector('[class*="display"]');
                         
          if (!display) return '';
          return display.textContent.trim();
        });
        
        await browser.close();
        return displayValue.includes('123');
      } catch (error) {
        await browser.close();
        throw error;
      }
    });
    
    await runTest('Task 4: Can perform basic calculation', async () => {
      const browser = await puppeteer.launch({ headless: true });
      try {
        const page = await browser.newPage();
        await page.goto(`file://${path.resolve(calculatorFile)}`, { waitUntil: 'networkidle0' });
        
        // Perform calculation: 5 + 3 = 
        await page.evaluate(() => {
          const buttons = document.querySelectorAll('button');
          const sequence = ['5', '+', '3', '='];
          
          for (const char of sequence) {
            for (const button of Array.from(buttons)) {
              if (button.textContent.trim() === char || 
                  button.getAttribute('value') === char ||
                  (char === '=' && button.id === 'equals')) {
                button.click();
                break;
              }
            }
          }
        });
        
        // Wait briefly for calculation
        await page.waitForTimeout(500);
        
        // Check if the display shows the result (8)
        const displayValue = await page.evaluate(() => {
          const display = document.querySelector('#display') || 
                         document.querySelector('.display') ||
                         document.querySelector('[class*="display"]');
                         
          if (!display) return '';
          return display.textContent.trim();
        });
        
        await browser.close();
        return displayValue.includes('8');
      } catch (error) {
        await browser.close();
        throw error;
      }
    });
    
    await runTest('Task 4: Can clear the display', async () => {
      const browser = await puppeteer.launch({ headless: true });
      try {
        const page = await browser.newPage();
        await page.goto(`file://${path.resolve(calculatorFile)}`, { waitUntil: 'networkidle0' });
        
        // Input a number first
        await page.evaluate(() => {
          const buttons = document.querySelectorAll('button');
          for (const button of Array.from(buttons)) {
            if (button.textContent.trim() === '5' || button.getAttribute('value') === '5') {
              button.click();
              break;
            }
          }
        });
        
        // Click the clear button
        await page.evaluate(() => {
          const buttons = document.querySelectorAll('button');
          for (const button of Array.from(buttons)) {
            if (button.textContent.trim() === 'C' || 
                button.getAttribute('value') === 'C' || 
                button.id === 'clear' ||
                /clear/i.test(button.className)) {
              button.click();
              break;
            }
          }
        });
        
        // Check if the display is cleared (should be empty or show '0')
        const displayValue = await page.evaluate(() => {
          const display = document.querySelector('#display') || 
                         document.querySelector('.display') ||
                         document.querySelector('[class*="display"]');
                         
          if (!display) return '';
          return display.textContent.trim();
        });
        
        await browser.close();
        return displayValue === '' || displayValue === '0';
      } catch (error) {
        await browser.close();
        throw error;
      }
    });
    
  } catch (error) {
    console.error(`Error testing task 4: ${error}`);
  }
}

// Check for the bonus challenge
async function checkBonusChallenge() {
  console.log('\n=== Checking for Bonus Challenge ===\n');
  
  const bonusFile = fs.existsSync('./scientific-calculator.html') ? './scientific-calculator.html' : 
                   (fs.existsSync('./advanced-calculator.html') ? './advanced-calculator.html' : null);
  
  if (!bonusFile) {
    console.log('No bonus challenge file detected. This is optional.');
    return;
  }
  
  try {
    const html = fs.readFileSync(bonusFile, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    await runTest('Bonus: Implements advanced calculator features', () => {
      // Check for elements that would indicate advanced features
      
      // Check for parentheses
      const hasParentheses = Array.from(document.querySelectorAll('button')).some(button => {
        return button.textContent.includes('(') || button.textContent.includes(')') ||
               button.getAttribute('value') === '(' || button.getAttribute('value') === ')';
      });
      
      // Check for scientific functions
      const hasScientificFunctions = Array.from(document.querySelectorAll('button')).some(button => {
        const text = button.textContent.toLowerCase();
        const value = button.getAttribute('value');
        
        return text.includes('sqrt') || text.includes('pow') || text.includes('sin') ||
               text.includes('cos') || text.includes('tan') || text.includes('log') ||
               text.includes('π') || text.includes('e^') || 
               (value && (value.includes('sqrt') || value.includes('pow') || 
                         value.includes('sin') || value.includes('cos') || 
                         value.includes('tan') || value.includes('log')));
      });
      
      // Check for memory functions
      const hasMemoryFunctions = Array.from(document.querySelectorAll('button')).some(button => {
        const text = button.textContent.toUpperCase();
        const value = button.getAttribute('value');
        
        return text.includes('MC') || text.includes('MR') || text.includes('M+') || 
               text.includes('M-') || text.includes('MS') ||
               (value && (value.includes('MC') || value.includes('MR') || 
                         value.includes('M+') || value.includes('M-') || 
                         value.includes('MS')));
      });
      
      // Check for history display
      const hasHistory = document.querySelector('.history') !== null ||
                        document.querySelector('#history') !== null ||
                        document.querySelector('[class*="history"]') !== null;
      
      // Must implement at least two advanced features
      const advancedFeatureCount = [hasParentheses, hasScientificFunctions, hasMemoryFunctions, hasHistory]
                                  .filter(Boolean).length;
                                  
      return advancedFeatureCount >= 2;
    });
    
    console.log('Bonus challenge detected and tested!');
  } catch (error) {
    console.log('Error checking bonus challenge (this is optional):', error);
  }
}

// Run all tests
(async () => {
  await testBasicsFile();
  await testControlFlowFile();
  await testTaskListFile();
  await testCalculatorFile();
  await checkBonusChallenge();
  
  // Print summary
  console.log(`\nTest Summary: ${passCount} of ${totalTests} tests passed.`);

  const requiredTests = totalTests - 1; // Not counting bonus test
  const passingGrade = Math.floor(requiredTests * 0.7); // 70% to pass

  if (passCount >= passingGrade) {
    console.log('\n🎉 Good job! You\'ve successfully completed Day 8\'s assignment. You can move on to Day 9!');
    if (passCount < requiredTests) {
      console.log(`Consider revisiting the failed tests to improve your understanding.`);
    }
  } else {
    console.log(`\n📝 You've passed ${passCount}/${requiredTests} required tests. Review the material and try again before moving on.`);
  }
})();