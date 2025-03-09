/**
 * Test case for Day 6 CSS Flexbox Assignment
 * 
 * This file will verify that your solutions implement Flexbox properties correctly.
 * To run this test: 
 * 1. Install Node.js if you haven't already (https://nodejs.org/)
 * 2. npm install jsdom puppeteer
 * 3. npm install typescript ts-node
 * 4. ts-node testCase.ts path/to/task1.html path/to/task2.html path/to/task3.html path/to/task4.html
 */

import * as fs from 'fs';
import * as path from 'path';
import { JSDOM } from 'jsdom';
import puppeteer from 'puppeteer';

// Get the file paths from command line arguments
const task1File = process.argv[2]; // Navigation bar
const task2File = process.argv[3]; // Card layout
const task3File = process.argv[4]; // Holy Grail layout
const task4File = process.argv[5]; // Form layout

if (!task1File || !task2File || !task3File || !task4File) {
  console.error('Please provide the paths to all four HTML files:');
  console.error('ts-node testCase.ts path/to/navigation.html path/to/cards.html path/to/holy-grail.html path/to/form.html');
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

// Test responsive behavior using puppeteer
async function testResponsiveness(filePath: string, tests: {
  name: string;
  viewport: { width: number, height: number };
  test: (page: puppeteer.Page) => Promise<boolean>;
}[]): Promise<void> {
  const browser = await puppeteer.launch({ headless: true });
  
  try {
    for (const testCase of tests) {
      const page = await browser.newPage();
      await page.setViewport(testCase.viewport);
      
      const fileUrl = `file://${path.resolve(filePath)}`;
      await page.goto(fileUrl, { waitUntil: 'networkidle0' });
      
      runTest(`${testCase.name} (viewport: ${testCase.viewport.width}x${testCase.viewport.height})`, 
        async () => await testCase.test(page));
      
      await page.close();
    }
  } finally {
    await browser.close();
  }
}

(async () => {
  console.log('\n=== Testing Task 1: Flexbox Navigation Bar ===\n');

  try {
    const task1Html = fs.readFileSync(task1File, 'utf8');
    const task1Dom = new JSDOM(task1Html);
    const task1Document = task1Dom.window.document;
    const cssContent = await getLinkedCSS(task1Document, task1File);
    
    // Check for use of Flexbox
    runTest('Task 1: Uses Flexbox', () => {
      return cssContent.includes('display: flex') || cssContent.includes('display:flex');
    });
    
    // Check for navigation items
    runTest('Task 1: Has at least 5 navigation links', () => {
      return task1Document.querySelectorAll('nav a, nav li').length >= 5;
    });
    
    // Check for media queries
    runTest('Task 1: Implements responsive design with media queries', () => {
      return cssContent.includes('@media');
    });
    
    // Test responsive behavior
    await testResponsiveness(task1File, [
      {
        name: 'Task 1: Navigation is horizontal on desktop',
        viewport: { width: 1024, height: 768 },
        async test(page) {
          // Check if menu items are displayed horizontally on desktop
          return await page.evaluate(() => {
            const navItems = document.querySelectorAll('nav li, nav a');
            if (navItems.length < 2) return false;
            
            // Get the first two items
            const first = navItems[0];
            const second = navItems[1];
            
            // Check their positions
            const firstRect = first.getBoundingClientRect();
            const secondRect = second.getBoundingClientRect();
            
            // In horizontal layout, the second item should be to the right of the first
            return secondRect.left > firstRect.right - 5; // Allow small overlap
          });
        }
      },
      {
        name: 'Task 1: Navigation stacks vertically on mobile',
        viewport: { width: 767, height: 500 },
        async test(page) {
          // Check if menu items are stacked vertically on mobile
          return await page.evaluate(() => {
            // Give the page a moment to apply responsive styles
            // Option 1: Vertical stacking
            const navItems = document.querySelectorAll('nav li, nav a');
            if (navItems.length >= 2) {
              // Get the first two items
              const first = navItems[0];
              const second = navItems[1];
              
              // Check their positions
              const firstRect = first.getBoundingClientRect();
              const secondRect = second.getBoundingClientRect();
              
              // In vertical layout, the second item should be below the first
              // or a hamburger menu should be visible
              if (secondRect.top >= firstRect.bottom - 5) return true;
            }
            
            // Option 2: Hidden menu with hamburger button
            const hamburgerButton = document.querySelector('.hamburger, .menu-toggle, [class*="hamburger"], [class*="menu-button"]');
            return hamburgerButton !== null;
          });
        }
      }
    ]);
    
  } catch (error) {
    console.error(`Error testing task 1: ${error}`);
  }

  console.log('\n=== Testing Task 2: Flexbox Card Layout ===\n');

  try {
    const task2Html = fs.readFileSync(task2File, 'utf8');
    const task2Dom = new JSDOM(task2Html);
    const task2Document = task2Dom.window.document;
    const cssContent = await getLinkedCSS(task2Document, task2File);
    
    // Check for use of Flexbox
    runTest('Task 2: Uses Flexbox', () => {
      return cssContent.includes('display: flex') || cssContent.includes('display:flex');
    });
    
    // Check for cards
    runTest('Task 2: Has at least 6 cards', () => {
      return task2Document.querySelectorAll('.card').length >= 6;
    });
    
    // Check card content
    runTest('Task 2: Cards have required elements', () => {
      const cards = task2Document.querySelectorAll('.card');
      let validCards = 0;
      
      cards.forEach(card => {
        const hasImage = card.querySelector('img') !== null;
        const hasHeading = card.querySelector('h1, h2, h3') !== null;
        const hasText = card.querySelector('p') !== null;
        const hasButton = card.querySelector('button, .btn, [class*="button"]') !== null;
        
        if (hasImage && hasHeading && hasText && hasButton) {
          validCards++;
        }
      });
      
      return validCards >= 6;
    });
    
    // Check for media queries
    runTest('Task 2: Implements responsive design with media queries', () => {
      return cssContent.includes('@media');
    });
    
    // Test responsive behavior for different screen sizes
    await testResponsiveness(task2File, [
      {
        name: 'Task 2: Displays multiple cards per row on desktop',
        viewport: { width: 1200, height: 800 },
        async test(page) {
          return await page.evaluate(() => {
            const cards = document.querySelectorAll('.card');
            if (cards.length < 4) return false;
            
            // Get the y positions of the first 4 cards
            const positions = new Set();
            for (let i = 0; i < 3; i++) {
              positions.add(Math.round(cards[i].getBoundingClientRect().top));
            }
            
            // If we have multiple cards on the same row, there should be fewer positions than cards
            return positions.size < 3;
          });
        }
      },
      {
        name: 'Task 2: Adjusts layout on mobile devices',
        viewport: { width: 480, height: 800 },
        async test(page) {
          return await page.evaluate(() => {
            const cards = document.querySelectorAll('.card');
            if (cards.length < 2) return false;
            
            // Check if cards stack vertically on mobile
            const card1Rect = cards[0].getBoundingClientRect();
            const card2Rect = cards[1].getBoundingClientRect();
            
            // In a stacked layout, the second card should be below the first
            return card2Rect.top > card1Rect.bottom - 5;
          });
        }
      }
    ]);
    
  } catch (error) {
    console.error(`Error testing task 2: ${error}`);
  }

  console.log('\n=== Testing Task 3: Holy Grail Layout ===\n');

  try {
    const task3Html = fs.readFileSync(task3File, 'utf8');
    const task3Dom = new JSDOM(task3Html);
    const task3Document = task3Dom.window.document;
    const cssContent = await getLinkedCSS(task3Document, task3File);
    
    // Check for use of Flexbox
    runTest('Task 3: Uses Flexbox', () => {
      return cssContent.includes('display: flex') || cssContent.includes('display:flex');
    });
    
    // Check for required layout elements
    runTest('Task 3: Has all required layout elements', () => {
      const hasHeader = task3Document.querySelector('header') !== null;
      const hasFooter = task3Document.querySelector('footer') !== null;
      const hasMainContent = task3Document.querySelector('main, .main-content') !== null;
      const hasLeftSidebar = task3Document.querySelector('.sidebar-left, [class*="left"]') !== null;
      const hasRightSidebar = task3Document.querySelector('.sidebar-right, [class*="right"]') !== null;
      
      return hasHeader && hasFooter && hasMainContent && hasLeftSidebar && hasRightSidebar;
    });
    
    // Check for flex properties
    runTest('Task 3: Uses flex properties for layout', () => {
      const hasFlexGrow = cssContent.includes('flex:') || 
                          cssContent.includes('flex-grow:') || 
                          cssContent.includes('flex-grow :');
      const hasFlexDirection = cssContent.includes('flex-direction:') || 
                              cssContent.includes('flex-direction :');
      
      return hasFlexGrow && hasFlexDirection;
    });
    
    // Check for media queries
    runTest('Task 3: Implements responsive design with media queries', () => {
      return cssContent.includes('@media');
    });
    
    // Test responsive behavior
    await testResponsiveness(task3File, [
      {
        name: 'Task 3: Shows 3-column layout on desktop',
        viewport: { width: 1024, height: 768 },
        async test(page) {
          return await page.evaluate(() => {
            const main = document.querySelector('main, .main-content');
            const leftSidebar = document.querySelector('.sidebar-left, [class*="left"]');
            const rightSidebar = document.querySelector('.sidebar-right, [class*="right"]');
            
            if (!main || !leftSidebar || !rightSidebar) return false;
            
            const mainRect = main.getBoundingClientRect();
            const leftRect = leftSidebar.getBoundingClientRect();
            const rightRect = rightSidebar.getBoundingClientRect();
            
            // Check that elements are side by side (roughly on the same vertical line)
            const onSameRow = Math.abs(mainRect.top - leftRect.top) < 100 && 
                              Math.abs(mainRect.top - rightRect.top) < 100;
                              
            // Check proper order (left sidebar, main content, right sidebar)
            const properOrder = leftRect.left < mainRect.left && mainRect.left < rightRect.left;
            
            return onSameRow && properOrder;
          });
        }
      },
      {
        name: 'Task 3: Stacks layout vertically on mobile',
        viewport: { width: 767, height: 1000 },
        async test(page) {
          return await page.evaluate(() => {
            const main = document.querySelector('main, .main-content');
            const leftSidebar = document.querySelector('.sidebar-left, [class*="left"]');
            const rightSidebar = document.querySelector('.sidebar-right, [class*="right"]');
            
            if (!main || !leftSidebar || !rightSidebar) return false;
            
            const mainRect = main.getBoundingClientRect();
            const leftRect = leftSidebar.getBoundingClientRect();
            const rightRect = rightSidebar.getBoundingClientRect();
            
            // In a stacked layout, elements should be one below the other
            // No need to check exact order since it can vary
            return (leftRect.bottom <= mainRect.top || mainRect.bottom <= leftRect.top) &&
                   (rightRect.bottom <= mainRect.top || mainRect.bottom <= rightRect.top) &&
                   (rightRect.bottom <= leftRect.top || leftRect.bottom <= rightRect.top);
          });
        }
      }
    ]);
    
  } catch (error) {
    console.error(`Error testing task 3: ${error}`);
  }

  console.log('\n=== Testing Task 4: Flexible Form Layout ===\n');

  try {
    const task4Html = fs.readFileSync(task4File, 'utf8');
    const task4Dom = new JSDOM(task4Html);
    const task4Document = task4Dom.window.document;
    const cssContent = await getLinkedCSS(task4Document, task4File);
    
    // Check for use of Flexbox
    runTest('Task 4: Uses Flexbox', () => {
      return cssContent.includes('display: flex') || cssContent.includes('display:flex');
    });
    
    // Check for form sections
    runTest('Task 4: Has two main form sections', () => {
      const formSections = task4Document.querySelectorAll('.form-section, form > div');
      return formSections.length >= 2;
    });
    
    // Check for different form elements
    runTest('Task 4: Includes at least 3 different form element types', () => {
      const inputs = task4Document.querySelectorAll('input');
      const inputTypes = new Set();
      
      inputs.forEach(input => {
        const type = input.getAttribute('type') || 'text';
        inputTypes.add(type);
      });
      
      const hasSelect = task4Document.querySelector('select') !== null;
      const hasTextarea = task4Document.querySelector('textarea') !== null;
      
      // Count unique input types plus select and textarea if present
      const totalTypes = inputTypes.size + (hasSelect ? 1 : 0) + (hasTextarea ? 1 : 0);
      
      return totalTypes >= 3;
    });
    
    // Check for media queries
    runTest('Task 4: Implements responsive design with media queries', () => {
      return cssContent.includes('@media');
    });
    
    // Test responsive behavior
    await testResponsiveness(task4File, [
      {
        name: 'Task 4: Form sections are side-by-side on desktop',
        viewport: { width: 1024, height: 768 },
        async test(page) {
          return await page.evaluate(() => {
            const formSections = document.querySelectorAll('.form-section, form > div');
            if (formSections.length < 2) return false;
            
            const section1Rect = formSections[0].getBoundingClientRect();
            const section2Rect = formSections[1].getBoundingClientRect();
            
            // Check if sections are side-by-side (horizontally adjacent)
            // Either by being on the same row or having significant overlap
            const sameRow = Math.abs(section1Rect.top - section2Rect.top) < 100;
            const horizontalAdjacent = section1Rect.right < section2Rect.left + 10 || 
                                       section2Rect.right < section1Rect.left + 10;
            
            return sameRow && horizontalAdjacent;
          });
        }
      },
      {
        name: 'Task 4: Form sections stack vertically on mobile',
        viewport: { width: 480, height: 800 },
        async test(page) {
          return await page.evaluate(() => {
            const formSections = document.querySelectorAll('.form-section, form > div');
            if (formSections.length < 2) return false;
            
            const section1Rect = formSections[0].getBoundingClientRect();
            const section2Rect = formSections[1].getBoundingClientRect();
            
            // Check if sections are stacked (one below the other)
            return section1Rect.bottom <= section2Rect.top + 10 || 
                   section2Rect.bottom <= section1Rect.top + 10;
          });
        }
      }
    ]);
    
  } catch (error) {
    console.error(`Error testing task 4: ${error}`);
  }

  // Check for bonus challenge
  console.log('\n=== Checking for Bonus Challenge ===\n');

  try {
    const bonusFile = fs.existsSync('./portfolio.html') ? './portfolio.html' : 
                     (fs.existsSync('./bonus.html') ? './bonus.html' : null);
    
    if (bonusFile) {
      const bonusHtml = fs.readFileSync(bonusFile, 'utf8');
      const bonusDoc = new JSDOM(bonusHtml).window.document;
      const bonusCss = await getLinkedCSS(bonusDoc, bonusFile);
      
      runTest('Bonus: Implements portfolio with Flexbox', () => {
        return bonusCss.includes('display: flex') || bonusCss.includes('display:flex');
      });
      
      runTest('Bonus: Creates a hero section', () => {
        return bonusDoc.querySelector('[class*="hero"]') !== null || 
               bonusDoc.querySelector('header:first-child') !== null;
      });
      
      runTest('Bonus: Implements skill section', () => {
        return bonusDoc.querySelector('[class*="skill"]') !== null;
      });
      
      runTest('Bonus: Implements project section', () => {
        return bonusDoc.querySelector('[class*="project"]') !== null;
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

  const requiredTests = totalTests - 4; // Not counting bonus tests
  const passingGrade = Math.floor(requiredTests * 0.7); // 70% to pass

  if (passCount >= passingGrade) {
    console.log('\n🎉 Good job! You\'ve successfully completed Day 6\'s assignment. You can move on to Day 7!');
    if (passCount < requiredTests) {
      console.log(`Consider revisiting the failed tests to improve your understanding.`);
    }
  } else {
    console.log(`\n📝 You've passed ${passCount}/${requiredTests} required tests. Review the material and try again before moving on.`);
  }
})();