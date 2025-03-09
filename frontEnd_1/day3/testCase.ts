/**
 * Test case for Day 3 CSS Basics Assignment
 * 
 * This file will verify that your CSS files meet the requirements of the assignment.
 * To run this test: 
 * 1. Install Node.js if you haven't already (https://nodejs.org/)
 * 2. npm install jsdom
 * 3. npm install typescript ts-node
 * 4. ts-node testCase.ts path/to/task1.html path/to/selector-challenge.html path/to/card.html
 */

import * as fs from 'fs';
import * as path from 'path';
import { JSDOM } from 'jsdom';

// Get the file paths from command line arguments
const task1File = process.argv[2];
const task2File = process.argv[3];
const task3File = process.argv[4];

if (!task1File || !task2File || !task3File) {
  console.error('Please provide the paths to all three HTML files:');
  console.error('ts-node testCase.ts path/to/task1.html path/to/selector-challenge.html path/to/card.html');
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
async function getLinkedCSS(document: Document): Promise<string> {
  let cssContent = '';
  const links = document.querySelectorAll('link[rel="stylesheet"]');
  
  for (const link of Array.from(links)) {
    const href = link.getAttribute('href');
    if (href) {
      try {
        const cssPath = path.resolve(path.dirname(task1File), href);
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

console.log('\n=== Testing Task 1: CSS Styling Basics ===\n');

(async () => {
  try {
    const task1Html = fs.readFileSync(task1File, 'utf8');
    const task1Dom = new JSDOM(task1Html, { resources: 'usable' });
    const task1Document = task1Dom.window.document;
    const cssContent = await getLinkedCSS(task1Document);
    
    // Check for external CSS
    runTest('Task 1: Uses external CSS file', () => {
      return task1Document.querySelector('link[rel="stylesheet"]') !== null;
    });
    
    // Check for general page styling
    runTest('Task 1: Sets background color for body', () => {
      return cssContent.includes('body') && 
             (cssContent.includes('background-color') || cssContent.includes('background:'));
    });
    
    runTest('Task 1: Uses non-default font family', () => {
      return cssContent.includes('font-family');
    });
    
    // Header styling tests
    runTest('Task 1: Styles the header with background color', () => {
      return (cssContent.includes('#main-header') || cssContent.includes('header')) && 
             (cssContent.includes('background-color') || cssContent.includes('background:'));
    });
    
    runTest('Task 1: Centers h1 text', () => {
      return (cssContent.includes('h1') || cssContent.includes('#main-header h1')) && 
             cssContent.includes('text-align: center');
    });
    
    // Navigation styling tests
    runTest('Task 1: Navigation links display horizontally', () => {
      return (cssContent.includes('nav') || cssContent.includes('li')) && 
             (cssContent.includes('display: inline') || 
              cssContent.includes('display: inline-block') || 
              cssContent.includes('display: flex') ||
              cssContent.includes('float:'));
    });
    
    runTest('Task 1: Removes bullet points from navigation', () => {
      return cssContent.includes('list-style') || 
             cssContent.includes('list-style-type: none');
    });
    
    runTest('Task 1: Adds hover effect to links', () => {
      return cssContent.includes(':hover');
    });
    
    // Section styling tests
    runTest('Task 1: Adds border to sections', () => {
      return (cssContent.includes('.content-section') || cssContent.includes('section')) && 
             cssContent.includes('border');
    });
    
    runTest('Task 1: Makes intro paragraphs italic', () => {
      return cssContent.includes('.intro') && cssContent.includes('italic');
    });
    
    // Example div styling tests
    runTest('Task 1: Makes example divs appear side by side', () => {
      return cssContent.includes('.example') && 
             (cssContent.includes('display: inline-block') || 
              cssContent.includes('float:') || 
              cssContent.includes('display: flex') ||
              cssContent.includes('grid'));
    });
    
    // Footer styling tests
    runTest('Task 1: Makes heart span red and larger', () => {
      return cssContent.includes('.heart') && 
             (cssContent.includes('color: red') || cssContent.includes('#ff')) && 
             cssContent.includes('font-size');
    });
  
  } catch (error) {
    console.error(`Error testing task 1: ${error}`);
  }

  console.log('\n=== Testing Task 2: CSS Selector Challenge ===\n');

  try {
    const task2Html = fs.readFileSync(task2File, 'utf8');
    const task2Dom = new JSDOM(task2Html);
    const task2Document = task2Dom.window.document;
    const cssContent = await getLinkedCSS(task2Document);
    
    runTest('Task 2: Uses complex CSS selectors', () => {
      const complexSelectors = [
        'nth-child', 
        'first-child', 
        '+', 
        '>', 
        '~', 
        'hover', 
        'focus', 
        'last-child', 
        'not', 
        'first-of-type'
      ];
      
      return complexSelectors.some(selector => cssContent.includes(selector));
    });
    
    runTest('Task 2: Uses attribute selectors', () => {
      return /\[\w+.*\]/.test(cssContent);
    });
    
    runTest('Task 2: Has selectors for links', () => {
      return cssContent.includes('a[href') || 
             (cssContent.includes('a') && cssContent.includes('href'));
    });
    
  } catch (error) {
    console.error(`Error testing task 2: ${error}`);
  }

  console.log('\n=== Testing Task 3: CSS Card Layout ===\n');

  try {
    const task3Html = fs.readFileSync(task3File, 'utf8');
    const task3Dom = new JSDOM(task3Html);
    const task3Document = task3Dom.window.document;
    const cssContent = await getLinkedCSS(task3Document);
    
    runTest('Task 3: Creates a card with fixed width and height', () => {
      return cssContent.includes('width') && cssContent.includes('height');
    });
    
    runTest('Task 3: Card includes an image', () => {
      return task3Document.querySelector('img') !== null;
    });
    
    runTest('Task 3: Card has heading and description', () => {
      const headings = task3Document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const paragraphs = task3Document.querySelectorAll('p');
      return headings.length > 0 && paragraphs.length > 0;
    });
    
    runTest('Task 3: Card includes a button or link', () => {
      return task3Document.querySelector('a, button') !== null;
    });
    
    runTest('Task 3: Uses border-radius for rounded corners', () => {
      return cssContent.includes('border-radius');
    });
    
    runTest('Task 3: Includes hover effect', () => {
      return cssContent.includes(':hover');
    });
    
  } catch (error) {
    console.error(`Error testing task 3: ${error}`);
  }

  // Bonus check
  console.log('\n=== Checking for Bonus Challenge ===\n');

  try {
    const bonusFile = fs.existsSync('./yin-yang.html') ? './yin-yang.html' : 
                     (fs.existsSync('./bonus.html') ? './bonus.html' : null);
    
    if (bonusFile) {
      const bonusHtml = fs.readFileSync(bonusFile, 'utf8');
      const bonusDoc = new JSDOM(bonusHtml).window.document;
      const bonusCss = await getLinkedCSS(bonusDoc);
      
      runTest('Bonus: Creates Yin-Yang with CSS', () => {
        return (bonusCss.includes('border-radius: 50%') || bonusCss.includes('border-radius:50%')) &&
               bonusCss.includes('::before') && 
               bonusCss.includes('::after');
      });
      
      console.log('Bonus challenge detected and tested!');
    } else {
      console.log('No bonus challenge file detected. This is optional.');
    }
  } catch (error) {
    console.log('Error checking bonus challenge (this is optional):', error);
  }

  // Print summary
  console.log(`\nTest Summary: ${passCount} of ${totalTests} tests passed.`);

  const requiredTests = totalTests - 1; // Not counting bonus test
  const passingGrade = Math.floor(requiredTests * 0.7); // 70% to pass

  if (passCount >= passingGrade) {
    console.log('\n🎉 Good job! You\'ve successfully completed Day 3\'s assignment. You can move on to Day 4!');
    if (passCount < requiredTests) {
      console.log(`Consider revisiting the failed tests to improve your understanding.`);
    }
  } else {
    console.log(`\n📝 You've passed ${passCount}/${requiredTests} required tests. Review the material and try again before moving on.`);
  }
})();