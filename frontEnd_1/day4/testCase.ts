/**
 * Test case for Day 4 CSS Box Model & Layout Assignment
 * 
 * This file will verify that your HTML and CSS files meet the requirements of the assignment.
 * To run this test: 
 * 1. Install Node.js if you haven't already (https://nodejs.org/)
 * 2. npm install jsdom
 * 3. npm install typescript ts-node
 * 4. ts-node testCase.ts path/to/box-model.html path/to/positioning.html path/to/layout.html
 */

import * as fs from 'fs';
import * as path from 'path';
import { JSDOM } from 'jsdom';

// Get the file paths from command line arguments
const task1File = process.argv[2]; // box-model.html
const task2File = process.argv[3]; // positioning.html
const task3File = process.argv[4]; // layout.html

if (!task1File || !task2File || !task3File) {
  console.error('Please provide the paths to all three HTML files:');
  console.error('ts-node testCase.ts path/to/box-model.html path/to/positioning.html path/to/layout.html');
  process.exit(1);
}

// Test tracking variables
let passCount = 0;
let totalTests = 0;

function runTest(name: string, test: () => boolean) {
  totalTests++;
  try {
    const result = test();
    if (result) {
      console.log(`✅ PASS: ${name}`);
      passCount++;
    } else {
      console.log(`❌ FAIL: ${name}`);
    }
  } catch (error) {
    console.log(`❌ FAIL: ${name} (Error: ${error})`);
  }
}

// Helper function to extract linked CSS content
async function getLinkedCSS(document: Document, baseFilePath: string): Promise<string> {
  let cssContent = '';
  const links = document.querySelectorAll('link[rel="stylesheet"]');
  
  for (const link of Array.from(links)) {
    const href = link.getAttribute('href');
    if (href) {
      try {
        const cssPath = path.resolve(path.dirname(baseFilePath), href);
        if (fs.existsSync(cssPath)) {
          cssContent += fs.readFileSync(cssPath, 'utf8') + '\n';
        }
      } catch (error) {
        console.warn(`Could not load CSS file: ${error}`);
      }
    }
  }
  
  // Also get inline styles
  const styles = document.querySelectorAll('style');
  for (const style of Array.from(styles)) {
    cssContent += style.textContent + '\n';
  }
  
  return cssContent;
}

console.log('\n=== Testing Task 1: Box Model Investigation ===\n');

(async () => {
  try {
    const task1Html = fs.readFileSync(task1File, 'utf8');
    const task1Dom = new JSDOM(task1Html);
    const task1Document = task1Dom.window.document;
    const cssContent = await getLinkedCSS(task1Document, task1File);
    
    // Check for external CSS
    runTest('Task 1: Uses external CSS file', () => {
      return task1Document.querySelector('link[rel="stylesheet"]') !== null;
    });
    
    // Check for box model CSS
    runTest('Task 1: Sets width for boxes', () => {
      return cssContent.includes('width: 300px') || cssContent.includes('width:300px');
    });
    
    runTest('Task 1: Sets padding for boxes', () => {
      return cssContent.includes('padding: 20px') || cssContent.includes('padding:20px');
    });
    
    runTest('Task 1: Sets border for boxes', () => {
      return cssContent.includes('border: 5px') || cssContent.includes('border:5px');
    });
    
    runTest('Task 1: Sets margin for boxes', () => {
      return cssContent.includes('margin: 15px') || cssContent.includes('margin:15px');
    });
    
    runTest('Task 1: Uses content-box for first box', () => {
      return cssContent.includes('box-sizing: content-box') || 
             (cssContent.includes('box-sizing:') && !cssContent.includes('.box1 {') && 
              cssContent.includes('.box2 { box-sizing: border-box') ||
              cssContent.includes('.box2{box-sizing:border-box'));
    });
    
    runTest('Task 1: Uses border-box for second box', () => {
      return cssContent.includes('.box2') && 
             cssContent.includes('box-sizing: border-box') ||
             cssContent.includes('box-sizing:border-box');
    });
    
    runTest('Task 1: Adds CSS comments', () => {
      return cssContent.includes('/*') && cssContent.includes('*/');
    });
  
  } catch (error) {
    console.error(`Error testing task 1: ${error}`);
  }

  console.log('\n=== Testing Task 2: Layout Positioning Challenge ===\n');

  try {
    const task2Html = fs.readFileSync(task2File, 'utf8');
    const task2Dom = new JSDOM(task2Html);
    const task2Document = task2Dom.window.document;
    const cssContent = await getLinkedCSS(task2Document, task2File);
    
    runTest('Task 2: Header is fixed', () => {
      return cssContent.includes('.header') && 
             cssContent.includes('position: fixed') ||
             cssContent.includes('position:fixed');
    });
    
    runTest('Task 2: Navigation links display horizontally', () => {
      return (cssContent.includes('nav') || cssContent.includes('li')) && 
             (cssContent.includes('display: inline') || 
              cssContent.includes('display: inline-block') || 
              cssContent.includes('display:inline-block') ||
              cssContent.includes('float:') || 
              cssContent.includes('display: flex') ||
              cssContent.includes('display:flex'));
    });
    
    runTest('Task 2: Uses relative positioning', () => {
      return cssContent.includes('position: relative') || cssContent.includes('position:relative');
    });
    
    runTest('Task 2: Uses absolute positioning', () => {
      return cssContent.includes('position: absolute') || cssContent.includes('position:absolute');
    });
    
    runTest('Task 2: Uses fixed positioning', () => {
      return cssContent.includes('position: fixed') || cssContent.includes('position:fixed');
    });
    
    runTest('Task 2: Uses sticky positioning', () => {
      return cssContent.includes('position: sticky') || cssContent.includes('position:sticky');
    });
    
    runTest('Task 2: Uses z-index for stacking', () => {
      return cssContent.includes('z-index:') || cssContent.includes('z-index:');
    });
    
    runTest('Task 2: Adds positioning comments', () => {
      return (cssContent.match(/\/\*/g) || []).length >= 5; // At least 5 comments
    });
    
  } catch (error) {
    console.error(`Error testing task 2: ${error}`);
  }

  console.log('\n=== Testing Task 3: Create a Basic Page Layout ===\n');

  try {
    const task3Html = fs.readFileSync(task3File, 'utf8');
    const task3Dom = new JSDOM(task3Html);
    const task3Document = task3Dom.window.document;
    const cssContent = await getLinkedCSS(task3Document, task3File);
    
    runTest('Task 3: Creates a fixed header', () => {
      return cssContent.includes('header') && 
             (cssContent.includes('position: fixed') || cssContent.includes('position:fixed'));
    });
    
    runTest('Task 3: Creates two-column layout', () => {
      // Check if there are two major content areas with different widths
      return ((cssContent.includes('float:') || cssContent.includes('float: ')) && 
             (cssContent.includes('width:') || cssContent.includes('width: '))) ||
             (cssContent.includes('display: flex') || cssContent.includes('display:flex'));
    });
    
    runTest('Task 3: Has a primary content area', () => {
      // Look for an element that appears to be the main content area
      const mainContent = task3Document.querySelector('main') || 
                         task3Document.querySelector('.content') || 
                         task3Document.querySelector('#content') ||
                         task3Document.querySelector('.main');
      return mainContent !== null;
    });
    
    runTest('Task 3: Has a sidebar', () => {
      // Look for an element that appears to be a sidebar
      const sidebar = task3Document.querySelector('aside') || 
                     task3Document.querySelector('.sidebar') || 
                     task3Document.querySelector('#sidebar');
      return sidebar !== null;
    });
    
    runTest('Task 3: Creates a footer', () => {
      return task3Document.querySelector('footer') !== null;
    });
    
    runTest('Task 3: Uses box-sizing: border-box', () => {
      return cssContent.includes('box-sizing: border-box') || cssContent.includes('box-sizing:border-box');
    });
    
    runTest('Task 3: Implements absolutely positioned element', () => {
      return cssContent.includes('position: absolute') || cssContent.includes('position:absolute');
    });
    
    runTest('Task 3: Uses proper spacing with margin and padding', () => {
      // Check if both margin and padding are used
      return (cssContent.includes('margin:') || cssContent.includes('margin: ')) && 
             (cssContent.includes('padding:') || cssContent.includes('padding: '));
    });
    
  } catch (error) {
    console.error(`Error testing task 3: ${error}`);
  }

  // Bonus check
  console.log('\n=== Checking for Bonus Challenge ===\n');

  try {
    const task3Html = fs.readFileSync(task3File, 'utf8');
    const task3Dom = new JSDOM(task3Html);
    const task3Document = task3Dom.window.document;
    const cssContent = await getLinkedCSS(task3Document, task3File);
    
    runTest('Bonus: Creates a dropdown menu with CSS', () => {
      const hasHoverSelector = cssContent.includes(':hover');
      const hasChildSelector = cssContent.includes('>') || cssContent.includes('child');
      const hasDropdownPosition = cssContent.includes('position: absolute') && cssContent.includes('top:');
      
      // This is a simplistic check - a real dropdown menu would have these characteristics
      return hasHoverSelector && hasChildSelector && hasDropdownPosition;
    });
    
  } catch (error) {
    console.log('Error checking bonus challenge (this is optional):', error);
  }

  // Print summary
  console.log(`\nTest Summary: ${passCount} of ${totalTests} tests passed.`);

  const requiredTests = totalTests - 1; // Not counting bonus test
  const passingGrade = Math.floor(requiredTests * 0.7); // 70% to pass

  if (passCount >= passingGrade) {
    console.log('\n🎉 Good job! You\'ve successfully completed Day 4\'s assignment. You can move on to Day 5!');
    if (passCount < requiredTests) {
      console.log(`Consider revisiting the failed tests to improve your understanding.`);
    }
  } else {
    console.log(`\n📝 You've passed ${passCount}/${requiredTests} required tests. Review the material and try again before moving on.`);
  }
})();