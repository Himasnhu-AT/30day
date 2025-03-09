/**
 * Test case for Day 7 CSS Grid Assignment
 * 
 * This file will verify that your solutions implement CSS Grid properties correctly.
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
const task1File = process.argv[2]; // Photo gallery
const task2File = process.argv[3]; // Grid template areas
const task3File = process.argv[4]; // Magazine layout
const task4File = process.argv[5]; // Dashboard layout

if (!task1File || !task2File || !task3File || !task4File) {
  console.error('Please provide the paths to all four HTML files:');
  console.error('ts-node testCase.ts path/to/gallery.html path/to/template-areas.html path/to/magazine.html path/to/dashboard.html');
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
  console.log('\n=== Testing Task 1: Basic Grid Layout ===\n');

  try {
    const task1Html = fs.readFileSync(task1File, 'utf8');
    const task1Dom = new JSDOM(task1Html);
    const task1Document = task1Dom.window.document;
    const cssContent = await getLinkedCSS(task1Document, task1File);
    
    // Check for use of CSS Grid
    runTest('Task 1: Uses CSS Grid', () => {
      return cssContent.includes('display: grid') || cssContent.includes('display:grid');
    });
    
    // Check for gallery items
    runTest('Task 1: Has at least 12 gallery items', () => {
      return task1Document.querySelectorAll('.gallery-item, .gallery > div').length >= 12;
    });
    
    // Check for responsive design using media queries
    runTest('Task 1: Implements responsive design with media queries', () => {
      return cssContent.includes('@media');
    });
    
    // Check for gap between items
    runTest('Task 1: Uses gap property for grid spacing', () => {
      return cssContent.includes('gap:') || 
             cssContent.includes('gap :') ||
             cssContent.includes('grid-gap:') ||
             cssContent.includes('grid-gap :');
    });
    
    // Test responsive behavior
    await testResponsiveness(task1File, [
      {
        name: 'Task 1: Shows single column on small screens',
        viewport: { width: 500, height: 700 },
        async test(page) {
          return await page.evaluate(() => {
            const gallery = document.querySelector('.gallery');
            if (!gallery) return false;
            
            const items = gallery.querySelectorAll('.gallery-item, .gallery > div');
            if (items.length < 2) return false;
            
            // Get the positions of the first 2 items
            const item1Rect = items[0].getBoundingClientRect();
            const item2Rect = items[1].getBoundingClientRect();
            
            // In a single column layout, the second item should be below the first
            return item2Rect.top >= item1Rect.bottom - 5;
          });
        }
      },
      {
        name: 'Task 1: Shows multiple columns on large screens',
        viewport: { width: 1000, height: 700 },
        async test(page) {
          return await page.evaluate(() => {
            const gallery = document.querySelector('.gallery');
            if (!gallery) return false;
            
            const items = gallery.querySelectorAll('.gallery-item, .gallery > div');
            if (items.length < 3) return false;
            
            // Get the positions of the first 3 items
            const positions = new Set();
            for (let i = 0; i < 3; i++) {
              positions.add(Math.round(items[i].getBoundingClientRect().left));
            }
            
            // If we have multiple columns, there should be at least 2 different left positions
            return positions.size >= 2;
          });
        }
      }
    ]);
    
  } catch (error) {
    console.error(`Error testing task 1: ${error}`);
  }

  console.log('\n=== Testing Task 2: Grid Template Areas ===\n');

  try {
    const task2Html = fs.readFileSync(task2File, 'utf8');
    const task2Dom = new JSDOM(task2Html);
    const task2Document = task2Dom.window.document;
    const cssContent = await getLinkedCSS(task2Document, task2File);
    
    // Check for use of CSS Grid
    runTest('Task 2: Uses CSS Grid', () => {
      return cssContent.includes('display: grid') || cssContent.includes('display:grid');
    });
    
    // Check for grid-template-areas
    runTest('Task 2: Uses grid-template-areas', () => {
      return cssContent.includes('grid-template-areas:') || cssContent.includes('grid-template-areas :');
    });
    
    // Check for all required sections
    runTest('Task 2: Has all required layout sections', () => {
      const hasHeader = task2Document.querySelector('header, .header') !== null;
      const hasNav = task2Document.querySelector('nav, .nav') !== null;
      const hasMain = task2Document.querySelector('main, .main') !== null;
      const hasSidebar = task2Document.querySelector('aside, .sidebar') !== null;
      const hasFooter = task2Document.querySelector('footer, .footer') !== null;
      
      return hasHeader && hasNav && hasMain && hasSidebar && hasFooter;
    });
    
    // Check for grid-area assignments
    runTest('Task 2: Assigns grid areas to layout sections', () => {
      return cssContent.includes('grid-area:') || cssContent.includes('grid-area :');
    });
    
    // Check for responsive design
    runTest('Task 2: Implements responsive design with media queries', () => {
      return cssContent.includes('@media');
    });
    
    // Test responsive behavior
    await testResponsiveness(task2File, [
      {
        name: 'Task 2: Shows traditional layout on desktop',
        viewport: { width: 1024, height: 768 },
        async test(page) {
          return await page.evaluate(() => {
            const main = document.querySelector('main, .main');
            const sidebar = document.querySelector('aside, .sidebar');
            
            if (!main || !sidebar) return false;
            
            const mainRect = main.getBoundingClientRect();
            const sidebarRect = sidebar.getBoundingClientRect();
            
            // In a traditional layout, the main content and sidebar should be side by side
            // Either main content is to the left of the sidebar, or sidebar is to the left of main content
            const sideBySide = (mainRect.left < sidebarRect.left && mainRect.right <= sidebarRect.right + 10) ||
                              (sidebarRect.left < mainRect.left && sidebarRect.right <= mainRect.right + 10);
            
            return sideBySide;
          });
        }
      },
      {
        name: 'Task 2: Stacks layout sections vertically on mobile',
        viewport: { width: 700, height: 900 },
        async test(page) {
          return await page.evaluate(() => {
            const main = document.querySelector('main, .main');
            const sidebar = document.querySelector('aside, .sidebar');
            
            if (!main || !sidebar) return false;
            
            const mainRect = main.getBoundingClientRect();
            const sidebarRect = sidebar.getBoundingClientRect();
            
            // In a stacked layout, one section should be below the other
            return mainRect.bottom <= sidebarRect.top + 10 || sidebarRect.bottom <= mainRect.top + 10;
          });
        }
      }
    ]);
    
  } catch (error) {
    console.error(`Error testing task 2: ${error}`);
  }

  console.log('\n=== Testing Task 3: Magazine Layout ===\n');

  try {
    const task3Html = fs.readFileSync(task3File, 'utf8');
    const task3Dom = new JSDOM(task3Html);
    const task3Document = task3Dom.window.document;
    const cssContent = await getLinkedCSS(task3Document, task3File);
    
    // Check for use of CSS Grid
    runTest('Task 3: Uses CSS Grid', () => {
      return cssContent.includes('display: grid') || cssContent.includes('display:grid');
    });
    
    // Check for featured article
    runTest('Task 3: Has a featured article', () => {
      return task3Document.querySelector('.featured, [class*="featured"]') !== null;
    });
    
    // Check for required number of articles
    runTest('Task 3: Has at least 7 articles (1 featured + 6 others)', () => {
      return task3Document.querySelectorAll('article').length >= 7;
    });
    
    // Check for grid-column/grid-row spans
    runTest('Task 3: Uses grid-column or grid-row for article sizing', () => {
      return cssContent.includes('grid-column:') || 
             cssContent.includes('grid-column :') ||
             cssContent.includes('grid-row:') ||
             cssContent.includes('grid-row :') ||
             cssContent.includes('grid-area:') ||
             cssContent.includes('grid-area :');
    });
    
    // Check for responsive design
    runTest('Task 3: Implements responsive design with media queries', () => {
      return cssContent.includes('@media');
    });
    
    // Test responsive behavior
    await testResponsiveness(task3File, [
      {
        name: 'Task 3: Featured article spans multiple cells on desktop',
        viewport: { width: 1024, height: 768 },
        async test(page) {
          return await page.evaluate(() => {
            const featured = document.querySelector('.featured, [class*="featured"]');
            const standard = document.querySelector('.standard, article:not(.featured)');
            
            if (!featured || !standard) return false;
            
            const featuredRect = featured.getBoundingClientRect();
            const standardRect = standard.getBoundingClientRect();
            
            // Featured article should be larger than standard articles
            return (featuredRect.width > standardRect.width * 1.5) || 
                   (featuredRect.height > standardRect.height * 1.5);
          });
        }
      },
      {
        name: 'Task 3: Layout adapts on smaller screens',
        viewport: { width: 600, height: 800 },
        async test(page) {
          return await page.evaluate(() => {
            const container = document.querySelector('.magazine-layout, .container');
            if (!container) return false;
            
            // On small screens, the container should use most of the viewport width
            const containerRect = container.getBoundingClientRect();
            return containerRect.width >= window.innerWidth * 0.9; // Using 90% of viewport width
          });
        }
      }
    ]);
    
  } catch (error) {
    console.error(`Error testing task 3: ${error}`);
  }

  console.log('\n=== Testing Task 4: Dashboard Layout ===\n');

  try {
    const task4Html = fs.readFileSync(task4File, 'utf8');
    const task4Dom = new JSDOM(task4Html);
    const task4Document = task4Dom.window.document;
    const cssContent = await getLinkedCSS(task4Document, task4File);
    
    // Check for use of CSS Grid
    runTest('Task 4: Uses CSS Grid', () => {
      return cssContent.includes('display: grid') || cssContent.includes('display:grid');
    });
    
    // Check for required dashboard components
    runTest('Task 4: Has all required dashboard components', () => {
      const hasTopNav = task4Document.querySelector('.top-nav, header, [class*="header"]') !== null;
      const hasSidebar = task4Document.querySelector('.sidebar, [class*="sidebar"], nav') !== null;
      const hasMainContent = task4Document.querySelector('.main-content, main') !== null;
      const hasStatsCards = task4Document.querySelectorAll('.stat-card, [class*="stat"], .card, [class*="card"]').length >= 4;
      const hasCharts = task4Document.querySelector('.charts-section, [class*="chart"]') !== null;
      const hasActivity = task4Document.querySelector('.recent-activity, [class*="activity"]') !== null;
      const hasFooter = task4Document.querySelector('.footer, footer') !== null;
      
      return hasTopNav && hasSidebar && hasMainContent && hasStatsCards && hasCharts && hasActivity && hasFooter;
    });
    
    // Check for nested grid
    runTest('Task 4: Uses nested grid layouts', () => {
      // Count how many times grid is declared in the CSS
      const gridDeclarations = (cssContent.match(/display:\s*grid/g) || []).length +
                              (cssContent.match(/display:\s*grid/g) || []).length;
      return gridDeclarations >= 2; // At least 2 grids (main layout + card grid)
    });
    
    // Check for responsive design
    runTest('Task 4: Implements responsive design with media queries', () => {
      return cssContent.includes('@media');
    });
    
    // Test responsive behavior
    await testResponsiveness(task4File, [
      {
        name: 'Task 4: Shows sidebar on desktop',
        viewport: { width: 1024, height: 768 },
        async test(page) {
          return await page.evaluate(() => {
            const sidebar = document.querySelector('.sidebar, [class*="sidebar"], nav');
            if (!sidebar) return false;
            
            // Check if the sidebar is visible
            const style = window.getComputedStyle(sidebar);
            const isVisible = style.display !== 'none' && style.visibility !== 'hidden';
            
            // Check if it's positioned at the edge of the screen (like a sidebar)
            const rect = sidebar.getBoundingClientRect();
            const isAtEdge = rect.left < 20 || rect.right > window.innerWidth - 20;
            
            return isVisible && isAtEdge;
          });
        }
      },
      {
        name: 'Task 4: Adapts layout for mobile',
        viewport: { width: 480, height: 800 },
        async test(page) {
          return await page.evaluate(() => {
            const sidebar = document.querySelector('.sidebar, [class*="sidebar"], nav');
            const main = document.querySelector('.main-content, main');
            
            if (!sidebar || !main) return false;
            
            const sidebarStyle = window.getComputedStyle(sidebar);
            const mainRect = main.getBoundingClientRect();
            
            // Either sidebar is hidden, or it's stacked above/below the main content
            const sidebarHidden = sidebarStyle.display === 'none' || 
                                sidebarStyle.visibility === 'hidden' ||
                                sidebarStyle.position === 'absolute' || 
                                sidebarStyle.position === 'fixed';
            
            const sidebarRect = sidebar.getBoundingClientRect();
            const isStacked = mainRect.top >= sidebarRect.bottom - 10 || 
                             sidebarRect.top >= mainRect.bottom - 10;
            
            return sidebarHidden || isStacked;
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
                     (fs.existsSync('./grid-portfolio.html') ? './grid-portfolio.html' : null);
    
    if (bonusFile) {
      const bonusHtml = fs.readFileSync(bonusFile, 'utf8');
      const bonusDoc = new JSDOM(bonusHtml).window.document;
      const bonusCss = await getLinkedCSS(bonusDoc, bonusFile);
      
      runTest('Bonus: Implements portfolio with CSS Grid', () => {
        return bonusCss.includes('display: grid') || bonusCss.includes('display:grid');
      });
      
      runTest('Bonus: Creates interactive portfolio items', () => {
        // Look for JavaScript, click events, or :target pseudo-class
        return bonusHtml.includes('<script') || 
               bonusCss.includes(':target') || 
               bonusHtml.includes('onclick=') || 
               bonusHtml.includes('addEventListener');
      });
      
      runTest('Bonus: Uses CSS transitions or animations', () => {
        return bonusCss.includes('transition') || bonusCss.includes('animation');
      });
      
      runTest('Bonus: Implements responsive design', () => {
        return bonusCss.includes('@media');
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
    console.log('\n🎉 Good job! You\'ve successfully completed Day 7\'s assignment. You can move on to Day 8!');
    if (passCount < requiredTests) {
      console.log(`Consider revisiting the failed tests to improve your understanding.`);
    }
  } else {
    console.log(`\n📝 You've passed ${passCount}/${requiredTests} required tests. Review the material and try again before moving on.`);
  }
})();