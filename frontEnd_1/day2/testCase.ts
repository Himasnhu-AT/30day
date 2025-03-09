/**
 * Test case for Day 2 HTML Elements & Semantic HTML Assignment
 * 
 * This file will verify that your HTML files meet the requirements of the assignment.
 * To run this test: 
 * 1. Install Node.js if you haven't already (https://nodejs.org/)
 * 2. npm install jsdom
 * 3. npm install typescript ts-node
 * 4. ts-node testCase.ts path/to/your/task1.html path/to/your/task2.html path/to/your/task3.html path/to/your/task4.html
 */

import * as fs from 'fs';
import * as path from 'path';
import { JSDOM } from 'jsdom';

// Get the file paths from command line arguments
const task1File = process.argv[2];
const task2File = process.argv[3];
const task3File = process.argv[4];
const task4File = process.argv[5];

if (!task1File || !task2File || !task3File || !task4File) {
  console.error('Please provide the paths to all four HTML files:');
  console.error('ts-node testCase.ts path/to/task1.html path/to/task2.html path/to/task3.html path/to/task4.html');
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

console.log('\n=== Testing Task 1: Refactor a Non-Semantic HTML Document ===\n');

try {
  const task1Html = fs.readFileSync(task1File, 'utf8');
  const task1Dom = new JSDOM(task1Html);
  const task1Document = task1Dom.window.document;
  
  runTest('Task 1: Document has header element', () => {
    return task1Document.querySelector('header') !== null;
  });
  
  runTest('Task 1: Document has nav element', () => {
    return task1Document.querySelector('nav') !== null;
  });
  
  runTest('Task 1: Document has main element', () => {
    return task1Document.querySelector('main') !== null;
  });
  
  runTest('Task 1: Document has article elements', () => {
    return task1Document.querySelectorAll('article').length >= 2;
  });
  
  runTest('Task 1: Document has time elements', () => {
    return task1Document.querySelectorAll('time').length >= 2;
  });
  
  runTest('Task 1: Document has aside element', () => {
    return task1Document.querySelector('aside') !== null;
  });
  
  runTest('Task 1: Document has footer element', () => {
    return task1Document.querySelector('footer') !== null;
  });

} catch (error) {
  console.error(`Error testing task 1: ${error}`);
}

console.log('\n=== Testing Task 2: Create a Semantic News Article Page ===\n');

try {
  const task2Html = fs.readFileSync(task2File, 'utf8');
  const task2Dom = new JSDOM(task2Html);
  const task2Document = task2Dom.window.document;
  
  runTest('Task 2: Document has proper structure', () => {
    return (
      task2Document.querySelector('header') !== null &&
      task2Document.querySelector('main') !== null &&
      task2Document.querySelector('footer') !== null
    );
  });
  
  runTest('Task 2: Document has article element', () => {
    return task2Document.querySelector('article') !== null;
  });
  
  runTest('Task 2: Article has publication date', () => {
    const article = task2Document.querySelector('article');
    return article?.querySelector('time') !== null;
  });
  
  runTest('Task 2: Article has author information', () => {
    const article = task2Document.querySelector('article');
    // Look for author info in common patterns
    return article?.innerHTML.toLowerCase().includes('author') || 
           article?.querySelector('address') !== null ||
           article?.querySelector('[rel="author"]') !== null;
  });
  
  runTest('Task 2: Document has related articles section', () => {
    // Look for a section with related articles
    const sections = task2Document.querySelectorAll('section');
    for (const section of Array.from(sections)) {
      const heading = section.querySelector('h2, h3, h4');
      if (heading && 
          (heading.textContent?.toLowerCase().includes('related') || 
           section.className.toLowerCase().includes('related'))) {
        return section.querySelectorAll('article').length >= 2 || 
               section.querySelectorAll('a').length >= 2;
      }
    }
    return false;
  });
  
  runTest('Task 2: Document has nav menu', () => {
    return task2Document.querySelector('nav') !== null;
  });
  
  runTest('Task 2: Document has comments section', () => {
    // Look for a section with comments
    const sections = task2Document.querySelectorAll('section');
    for (const section of Array.from(sections)) {
      const heading = section.querySelector('h2, h3, h4');
      if (heading && 
          (heading.textContent?.toLowerCase().includes('comment') ||
           section.className.toLowerCase().includes('comment') || 
           section.id.toLowerCase().includes('comment'))) {
        return section.children.length >= 2; // At least 2 comments
      }
    }
    return false;
  });

} catch (error) {
  console.error(`Error testing task 2: ${error}`);
}

console.log('\n=== Testing Task 3: Implement Advanced Semantic Elements ===\n');

try {
  const task3Html = fs.readFileSync(task3File, 'utf8');
  const task3Dom = new JSDOM(task3Html);
  const task3Document = task3Dom.window.document;
  
  const advancedElements = [
    'details', 'summary', 'figure', 'figcaption', 'mark', 
    'time', 'progress', 'meter', 'abbr', 'dl', 'dt', 'dd'
  ];
  
  let elementCount = 0;
  
  for (const element of advancedElements) {
    if (task3Document.querySelector(element)) {
      elementCount++;
      runTest(`Task 3: Document uses <${element}> element`, () => true);
    }
  }
  
  runTest('Task 3: Document uses at least 5 advanced semantic elements', () => {
    return elementCount >= 5;
  });

} catch (error) {
  console.error(`Error testing task 3: ${error}`);
}

console.log('\n=== Testing Task 4: Accessibility Enhancement ===\n');

try {
  const task4Html = fs.readFileSync(task4File, 'utf8');
  const task4Dom = new JSDOM(task4Html);
  const task4Document = task4Dom.window.document;
  
  runTest('Task 4: Form uses semantic form element', () => {
    return task4Document.querySelector('form') !== null;
  });
  
  runTest('Task 4: Form has accessible heading', () => {
    return task4Document.querySelector('h1, h2, h3, h4, h5, h6, legend') !== null;
  });
  
  runTest('Task 4: Form has label elements', () => {
    return task4Document.querySelectorAll('label').length >= 3;
  });
  
  runTest('Task 4: Labels are properly associated with inputs', () => {
    const labels = task4Document.querySelectorAll('label');
    for (const label of Array.from(labels)) {
      const forAttr = label.getAttribute('for');
      if (!forAttr || !task4Document.getElementById(forAttr)) {
        return false;
      }
    }
    return labels.length > 0;
  });
  
  runTest('Task 4: Form has proper button element', () => {
    const button = task4Document.querySelector('button, input[type="submit"]');
    return button !== null;
  });
  
  runTest('Task 4: Input fields have appropriate types', () => {
    const emailInput = task4Document.querySelector('input[type="email"]');
    return emailInput !== null;
  });

} catch (error) {
  console.error(`Error testing task 4: ${error}`);
}

// Bonus check
console.log('\n=== Checking for Bonus Challenge ===\n');

try {
  // Look for a file named bonus.html or faq.html
  const bonusFile = fs.existsSync('./bonus.html') ? './bonus.html' : 
                   (fs.existsSync('./faq.html') ? './faq.html' : null);
  
  if (bonusFile) {
    const bonusHtml = fs.readFileSync(bonusFile, 'utf8');
    const bonusDoc = new JSDOM(bonusHtml).window.document;
    
    runTest('Bonus: Document has accordion structure using details/summary', () => {
      const details = bonusDoc.querySelectorAll('details');
      return details.length >= 3 && 
             bonusDoc.querySelectorAll('summary').length >= 3;
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
  console.log('\n🎉 Good job! You\'ve successfully completed Day 2\'s assignment. You can move on to Day 3!');
  if (passCount < requiredTests) {
    console.log(`Consider revisiting the failed tests to improve your understanding.`);
  }
} else {
  console.log(`\n📝 You've passed ${passCount}/${requiredTests} required tests. Review the material and try again before moving on.`);
}