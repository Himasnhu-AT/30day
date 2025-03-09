/**
 * Test case for Day 1 HTML Basics Assignment
 * 
 * This file will verify that your HTML file meets the requirements of the assignment.
 * To run this test: 
 * 1. Install Node.js if you haven't already (https://nodejs.org/)
 * 2. npm install jsdom
 * 3. npm install typescript ts-node
 * 4. ts-node testCase.ts path/to/your/index.html
 */

import * as fs from 'fs';
import * as path from 'path';
import { JSDOM } from 'jsdom';

// Get the file path from command line arguments
const filePath = process.argv[2];

if (!filePath) {
  console.error('Please provide the path to your HTML file: ts-node testCase.ts path/to/your/index.html');
  process.exit(1);
}

// Read the HTML file
try {
  const htmlContent = fs.readFileSync(filePath, 'utf8');
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  
  // Begin tests
  console.log('Running tests for Day 1 assignment...\n');
  
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
  
  // Test for proper document structure
  runTest('Document has DOCTYPE declaration', () => {
    // Get the raw HTML to check for DOCTYPE
    return htmlContent.trim().toLowerCase().startsWith('<!doctype html>');
  });
  
  runTest('Document has html element with lang attribute', () => {
    const html = document.querySelector('html');
    return !!html && !!html.getAttribute('lang');
  });
  
  runTest('Document has proper head section', () => {
    const head = document.querySelector('head');
    return !!head && head.querySelectorAll('meta').length > 0;
  });
  
  runTest('Document has title element', () => {
    const title = document.querySelector('title');
    return !!title && !!title.textContent;
  });
  
  // Test for required content
  runTest('Document has h1 heading with "About Me"', () => {
    const h1 = document.querySelector('h1');
    return !!h1 && h1.textContent?.includes('About Me');
  });
  
  runTest('Document has h2 heading with "My Skills"', () => {
    const h2 = document.querySelector('h2');
    return !!h2 && h2.textContent?.includes('My Skills');
  });
  
  runTest('Document has introduction paragraph', () => {
    const p = document.querySelector('p');
    return !!p && p.textContent!.length > 10; // At least some meaningful content
  });
  
  runTest('Document has ordered list with at least 3 skills', () => {
    const ol = document.querySelector('ol');
    return !!ol && ol.querySelectorAll('li').length >= 3;
  });
  
  runTest('Document has unordered list with at least 3 hobbies', () => {
    const ul = document.querySelector('ul');
    return !!ul && ul.querySelectorAll('li').length >= 3;
  });
  
  runTest('Document has an image', () => {
    const img = document.querySelector('img');
    return !!img && !!img.getAttribute('src') && !!img.getAttribute('alt');
  });
  
  runTest('Document has a link', () => {
    const a = document.querySelector('a');
    return !!a && !!a.getAttribute('href') && !!a.textContent;
  });
  
  // Check for comments and organization
  runTest('Document has comments', () => {
    // This is a rough way to check for comments in the raw HTML
    return htmlContent.includes('<!--') && htmlContent.includes('-->');
  });
  
  // Bonus challenge - check for table
  runTest('BONUS: Document has a table with at least 3 rows and 3 columns', () => {
    const table = document.querySelector('table');
    if (!table) return false;
    
    const rows = table.querySelectorAll('tr');
    if (rows.length < 3) return false;
    
    // Check if at least one row has 3 or more cells
    for (const row of Array.from(rows)) {
      const cells = row.querySelectorAll('th, td');
      if (cells.length >= 3) return true;
    }
    
    return false;
  });
  
  // Print summary
  console.log(`\nTest Summary: ${passCount} of ${totalTests} tests passed.`);
  
  // Bonus is not counted in the required tests
  const requiredPassCount = totalTests - 1;
  const requiredTests = totalTests - 1;
  
  if (passCount >= requiredTests) {
    console.log('🎉 Congratulations! All required tests passed. You can move on to Day 2!');
  } else {
    console.log(`📝 You've passed ${passCount}/${requiredTests} required tests. Keep working on this assignment before moving on.`);
  }

} catch (error) {
  console.error(`Error reading or parsing the HTML file: ${error}`);
  process.exit(1);
}