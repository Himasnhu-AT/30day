/**
 * Test case for Day 5 Responsive Design & Media Queries Assignment
 * 
 * This file will verify that your solutions implement responsive design principles correctly.
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
const task1File = process.argv[2]; // Responsive navigation
const task2File = process.argv[3]; // Responsive grid
const task3File = process.argv[4]; // Responsive typography
const task4File = process.argv[5]; // Mobile-first approach

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

// Responsive testing using puppeteer
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
  console.log('\n=== Testing Task 1: Responsive Navigation Menu ===\n');

  try {
    const task1Html = fs.readFileSync(task1File, 'utf8');
    const task1Dom = new JSDOM(task1Html);
    const task1Document = task1Dom.window.document;
    const cssContent = await getLinkedCSS(task1Document, task1File);
    
    // Check for viewport meta tag
    runTest('Task 1: Has viewport meta tag', () => {
      const metaViewport = task1Document.querySelector('meta[name="viewport"]');
      return metaViewport !== null && 
             metaViewport.getAttribute('content')?.includes('width=device-width') === true;
    });
    
    // Check for media queries
    runTest('Task 1: Uses media queries', () => {
      return cssContent.includes('@media');
    });
    
    // Check for responsive navigation implementation
    await testResponsiveness(task1File, [
      {
        name: 'Task 1: Navigation is horizontal on desktop',
        viewport: { width: 1024, height: 768 },
        async test(page) {
          // Check if menu items are displayed horizontally
          return await page.evaluate(() => {
            const navItems = document.querySelectorAll('nav li');
            if (navItems.length < 2) return false;
            
            const firstRect = navItems[0].getBoundingClientRect();
            const secondRect = navItems[1].getBoundingClientRect();
            
            // If items are horizontal, the second item should be to the right of the first
            return secondRect.left > firstRect.right;
          });
        }
      },
      {
        name: 'Task 1: Navigation adapts on mobile',
        viewport: { width: 375, height: 667 },
        async test(page) {
          // Check if menu items are stacked vertically or hamburger menu is implemented
          return await page.evaluate(() => {
            // Option 1: Check if items are stacked vertically
            const navItems = document.querySelectorAll('nav li');
            if (navItems.length >= 2) {
              const firstRect = navItems[0].getBoundingClientRect();
              const secondRect = navItems[1].getBoundingClientRect();
              if (secondRect.top >= firstRect.bottom) return true;
            }
            
            // Option 2: Check if hamburger menu is implemented
            const hamburger = document.querySelector('.hamburger') ||
                             document.querySelector('[class*="hamburger"]') ||
                             document.querySelector('[class*="menu-icon"]');
            
            const nav = document.querySelector('nav');
            return hamburger !== null && 
                   (window.getComputedStyle(nav as Element).display === 'none' || 
                    nav?.classList.contains('mobile-menu') || 
                    nav?.classList.contains('hidden'));
          });
        }
      }
    ]);
  } catch (error) {
    console.error(`Error testing task 1: ${error}`);
  }

  console.log('\n=== Testing Task 2: Responsive Grid Layout ===\n');

  try {
    const task2Html = fs.readFileSync(task2File, 'utf8');
    const task2Dom = new JSDOM(task2Html);
    const task2Document = task2Dom.window.document;
    const cssContent = await getLinkedCSS(task2Document, task2File);
    
    // Check if there are enough cards
    runTest('Task 2: Has at least 8 cards', () => {
      return task2Document.querySelectorAll('.card').length >= 8;
    });
    
    // Check for media queries
    runTest('Task 2: Uses media queries', () => {
      return cssContent.includes('@media');
    });
    
    // Check for responsive grid implementation
    await testResponsiveness(task2File, [
      {
        name: 'Task 2: Shows 4 cards per row on desktop',
        viewport: { width: 1200, height: 800 },
        async test(page) {
          return await page.evaluate(() => {
            const cards = document.querySelectorAll('.card');
            if (cards.length < 4) return false;
            
            // Check if first 4 cards have the same y-position (same row)
            const yPositions = new Set();
            for (let i = 0; i < 4; i++) {
              yPositions.add(cards[i].getBoundingClientRect().top.toFixed(0));
            }
            return yPositions.size === 1;
          });
        }
      },
      {
        name: 'Task 2: Shows 2 cards per row on tablet',
        viewport: { width: 768, height: 1024 },
        async test(page) {
          return await page.evaluate(() => {
            const cards = document.querySelectorAll('.card');
            if (cards.length < 4) return false;
            
            // Check if first 2 cards have the same y-position (same row)
            // and next 2 cards have a different but same y-position (next row)
            const firstRowY = cards[0].getBoundingClientRect().top.toFixed(0);
            const secondRowY = cards[2].getBoundingClientRect().top.toFixed(0);
            
            return firstRowY === cards[1].getBoundingClientRect().top.toFixed(0) &&
                   secondRowY === cards[3].getBoundingClientRect().top.toFixed(0) &&
                   firstRowY !== secondRowY;
          });
        }
      },
      {
        name: 'Task 2: Shows 1 card per row on mobile',
        viewport: { width: 375, height: 667 },
        async test(page) {
          return await page.evaluate(() => {
            const cards = document.querySelectorAll('.card');
            if (cards.length < 2) return false;
            
            // Check if each card has a different y-position (stacked vertically)
            const firstY = cards[0].getBoundingClientRect().top;
            const secondY = cards[1].getBoundingClientRect().top;
            
            return secondY > firstY;
          });
        }
      }
    ]);
  } catch (error) {
    console.error(`Error testing task 2: ${error}`);
  }

  console.log('\n=== Testing Task 3: Responsive Typography and Images ===\n');

  try {
    const task3Html = fs.readFileSync(task3File, 'utf8');
    const task3Dom = new JSDOM(task3Html);
    const task3Document = task3Dom.window.document;
    const cssContent = await getLinkedCSS(task3Document, task3File);
    
    // Check for responsive image styling
    runTest('Task 3: Makes images responsive', () => {
      return cssContent.includes('max-width') && cssContent.includes('height: auto');
    });
    
    // Check for relative font units
    runTest('Task 3: Uses relative font units', () => {
      return cssContent.includes('rem') || cssContent.includes('em') || 
             cssContent.includes('vw') || cssContent.includes('vh') || 
             cssContent.includes('ch') || cssContent.includes('%');
    });
    
    // Check for multiple breakpoints
    runTest('Task 3: Implements at least two breakpoints', () => {
      const mediaQueries = cssContent.match(/@media/g);
      return mediaQueries !== null && mediaQueries.length >= 2;
    });
    
    // Test comfortable reading width on desktop
    await testResponsiveness(task3File, [
      {
        name: 'Task 3: Comfortable reading width on desktop',
        viewport: { width: 1200, height: 800 },
        async test(page) {
          return await page.evaluate(() => {
            const article = document.querySelector('article');
            if (!article) return false;
            
            const articleWidth = article.getBoundingClientRect().width;
            const windowWidth = window.innerWidth;
            
            // Check that article is not full window width on desktop
            // (should have margins for readability)
            return articleWidth < windowWidth - 100;
          });
        }
      },
      {
        name: 'Task 3: Full width content on mobile',
        viewport: { width: 375, height: 667 },
        async test(page) {
          return await page.evaluate(() => {
            const article = document.querySelector('article');
            if (!article) return false;
            
            const articleRect = article.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            
            // On mobile, article should take almost full width
            return articleRect.width > windowWidth * 0.85;
          });
        }
      }
    ]);
  } catch (error) {
    console.error(`Error testing task 3: ${error}`);
  }

  console.log('\n=== Testing Task 4: Mobile-First Approach ===\n');

  try {
    const task4Html = fs.readFileSync(task4File, 'utf8');
    const task4Dom = new JSDOM(task4Html);
    const task4Document = task4Dom.window.document;
    const cssContent = await getLinkedCSS(task4Document, task4File);
    
    // Check for mobile-first media queries
    runTest('Task 4: Uses mobile-first approach with min-width media queries', () => {
      return cssContent.includes('@media') && cssContent.includes('min-width');
    });
    
    // Check for required page sections
    runTest('Task 4: Includes required page sections', () => {
      const hasNavigation = task4Document.querySelector('nav') !== null;
      const hasHero = task4Document.querySelector('[class*="hero"]') !== null || 
                     task4Document.querySelector('[id*="hero"]') !== null;
      const hasFeatures = task4Document.querySelector('[class*="feature"]') !== null || 
                         task4Document.querySelector('[id*="feature"]') !== null;
      const hasCTA = task4Document.querySelector('button') !== null || 
                    task4Document.querySelector('[class*="cta"]') !== null || 
                    task4Document.querySelector('[id*="cta"]') !== null;
      
      return hasNavigation && hasHero && hasFeatures && hasCTA;
    });
    
    // Check for relative units
    runTest('Task 4: Uses relative units', () => {
      return cssContent.includes('rem') || cssContent.includes('em') || 
             cssContent.includes('%') || cssContent.includes('vw') || 
             cssContent.includes('vh');
    });
    
    // Check for multiple breakpoints
    runTest('Task 4: Implements at least three breakpoints', () => {
      const minWidthMatches = cssContent.match(/@media[^{]*min-width/g);
      return minWidthMatches !== null && minWidthMatches.length >= 3;
    });
  } catch (error) {
    console.error(`Error testing task 4: ${error}`);
  }

  // Bonus check
  console.log('\n=== Checking for Bonus Challenge: Responsive Image Gallery ===\n');

  try {
    const bonusFile = fs.existsSync('./gallery.html') ? './gallery.html' : 
                     (fs.existsSync('./bonus.html') ? './bonus.html' : null);
    
    if (bonusFile) {
      const bonusHtml = fs.readFileSync(bonusFile, 'utf8');
      const bonusDoc = new JSDOM(bonusHtml).window.document;
      const bonusCss = await getLinkedCSS(bonusDoc, bonusFile);
      
      runTest('Bonus: Implements responsive image grid', () => {
        return bonusCss.includes('@media') && 
              (bonusDoc.querySelectorAll('img').length > 3 || 
               bonusDoc.querySelectorAll('.gallery').length > 0);
      });
      
      runTest('Bonus: Uses srcset for responsive images', () => {
        const images = bonusDoc.querySelectorAll('img[srcset]');
        return images.length > 0;
      });
      
      runTest('Bonus: Implements lightbox functionality', () => {
        return bonusCss.includes('lightbox') || 
              (bonusDoc.querySelector('[class*="lightbox"]') !== null || 
               bonusDoc.querySelector('[id*="lightbox"]') !== null);
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

  const requiredTests = totalTests - 3; // Not counting bonus tests
  const passingGrade = Math.floor(requiredTests * 0.7); // 70% to pass

  if (passCount >= passingGrade) {
    console.log('\n🎉 Good job! You\'ve successfully completed Day 5\'s assignment. You can move on to Day 6!');
    if (passCount < requiredTests) {
      console.log(`Consider revisiting the failed tests to improve your understanding.`);
    }
  } else {
    console.log(`\n📝 You've passed ${passCount}/${requiredTests} required tests. Review the material and try again before moving on.`);
  }
})();