# Day 4 Assignment: CSS Box Model & Layout

## Task 1: Box Model Investigation

Create an HTML file with the following content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Box Model</title>
    <link rel="stylesheet" href="box-model.css">
</head>
<body>
    <div class="container">
        <div class="box box1">
            <h2>Box 1: Content Box</h2>
            <p>This box uses the standard box model</p>
        </div>
        
        <div class="box box2">
            <h2>Box 2: Border Box</h2>
            <p>This box uses the alternative box model</p>
        </div>
    </div>
    
    <div class="dimensions">
        <h3>Box Dimensions</h3>
        <ul>
            <li>Box 1 - Total width: <span id="box1-width">?</span>px</li>
            <li>Box 2 - Total width: <span id="box2-width">?</span>px</li>
        </ul>
    </div>
    
    <script>
        // This script will calculate the actual width of each box
        window.onload = function() {
            document.getElementById('box1-width').textContent = 
                document.querySelector('.box1').offsetWidth;
            document.getElementById('box2-width').textContent = 
                document.querySelector('.box2').offsetWidth;
        };
    </script>
</body>
</html>
```

Create a CSS file named `box-model.css` that styles these elements as follows:

1. Both boxes should have:
   - A width of 300px
   - 20px of padding on all sides
   - A 5px solid border
   - 15px of margin on all sides
   - A different background color

2. Box 1 should use the standard box model (content-box)
3. Box 2 should use the alternative box model (border-box)
4. Add a 1px solid border to the container and give it some padding
5. Add a CSS comment explaining the actual width calculation for each box

## Task 2: Layout Positioning Challenge

Create a new HTML file named `positioning.html` with the following structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Positioning</title>
    <link rel="stylesheet" href="positioning.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>CSS Positioning</h1>
            <nav>
                <ul>
                    <li><a href="#static">Static</a></li>
                    <li><a href="#relative">Relative</a></li>
                    <li><a href="#absolute">Absolute</a></li>
                    <li><a href="#fixed">Fixed</a></li>
                    <li><a href="#sticky">Sticky</a></li>
                </ul>
            </nav>
        </header>
        
        <main class="content">
            <section id="static">
                <h2>Static Positioning</h2>
                <div class="demo static-demo">
                    <div class="box static-box">Static Box</div>
                    <p>This box has position: static</p>
                </div>
            </section>
            
            <section id="relative">
                <h2>Relative Positioning</h2>
                <div class="demo relative-demo">
                    <div class="box relative-box">Relative Box</div>
                    <p>This box has position: relative</p>
                </div>
            </section>
            
            <section id="absolute">
                <h2>Absolute Positioning</h2>
                <div class="demo absolute-demo">
                    <div class="box absolute-box">Absolute Box</div>
                    <p>This box has position: absolute</p>
                </div>
            </section>
            
            <section id="fixed">
                <h2>Fixed Positioning</h2>
                <div class="demo fixed-demo">
                    <div class="box fixed-box">Fixed Box</div>
                    <p>This box has position: fixed</p>
                </div>
            </section>
            
            <section id="sticky">
                <h2>Sticky Positioning</h2>
                <div class="demo sticky-demo">
                    <div class="box sticky-box">Sticky Box</div>
                    <p>This box has position: sticky</p>
                </div>
            </section>
            
            <section id="z-index">
                <h2>Z-Index Stacking</h2>
                <div class="demo z-index-demo">
                    <div class="stack-box box1">Box 1 (z-index: 1)</div>
                    <div class="stack-box box2">Box 2 (z-index: 3)</div>
                    <div class="stack-box box3">Box 3 (z-index: 2)</div>
                </div>
            </section>
        </main>
        
        <div class="scroll-spacer">
            <!-- This div just adds space to enable scrolling for sticky demo -->
        </div>
        
        <footer>
            <p>CSS Box Model & Layout - Day 4</p>
        </footer>
    </div>
</body>
</html>
```

Create a CSS file named `positioning.css` that implements the following:

1. Style the header to be fixed at the top of the viewport with a semi-transparent background
2. Make the navigation links display horizontally
3. Style each demo box with a different background color, width, height, and border
4. For the relative box, position it 20px down and 30px to the right of its normal position
5. For the absolute box, position it in the bottom right corner of its parent demo container
6. For the fixed box, position it in the bottom right corner of the viewport
7. For the sticky box, make it stick to the top of the viewport when scrolled past
8. For the z-index demo, position the boxes to overlap and use z-index to stack them in the specified order (box2 on top, then box3, then box1 at the bottom)
9. Add sufficient content or height to the page to enable scrolling to test the sticky and fixed positioning
10. Add a CSS comment for each positioning type explaining when and why you would use it

## Task 3: Create a Basic Page Layout

Create a complete webpage with a common layout structure using the box model and positioning concepts. Your page should include:

1. A fixed header with navigation
2. A main content area with:
   - A primary content column (wider)
   - A sidebar (narrower)
3. A footer at the bottom of the page

Requirements:
- Use both the box model properties and positioning techniques
- Implement at least one absolutely positioned element, such as a "back to top" button
- Create a sticky navigation that becomes fixed when scrolling
- Use floats or display properties to create the two-column layout
- Ensure proper spacing between all elements using margin and padding
- Use box-sizing: border-box for all elements
- Make sure the footer stays at the bottom, even if content is short
- Add appropriate colors, borders, and basic styling to distinguish sections

## Submission
Save your HTML and CSS files with appropriate names for each task and run the test case to check your solutions.

## Bonus Challenge
Create a CSS-only dropdown menu for the navigation bar in Task 3. The menu should:
- Display dropdown items when hovering over a parent menu item
- Use absolute positioning for the dropdown
- Have a subtle animation when appearing/disappearing