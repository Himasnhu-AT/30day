# Day 3 Assignment: CSS Basics - Selectors & Properties

## Task 1: CSS Styling Basics
Create an HTML file with the following content and style it with an external CSS file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Basics Practice</title>
    <!-- Link your external CSS file here -->
</head>
<body>
    <header id="main-header">
        <h1>Learning CSS</h1>
        <nav>
            <ul>
                <li><a href="#section1">Section 1</a></li>
                <li><a href="#section2">Section 2</a></li>
                <li><a href="#section3">Section 3</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section id="section1" class="content-section">
            <h2>Section 1: CSS Selectors</h2>
            <p class="intro">CSS selectors define which elements you want to style.</p>
            <p>There are <span class="highlight">many different types</span> of selectors in CSS.</p>
        </section>
        
        <section id="section2" class="content-section">
            <h2>Section 2: CSS Properties</h2>
            <p class="intro">CSS properties determine the appearance of elements.</p>
            <div class="property-examples">
                <div class="example">Text Color</div>
                <div class="example">Background</div>
                <div class="example">Borders</div>
            </div>
        </section>
        
        <section id="section3" class="content-section">
            <h2>Section 3: CSS Values</h2>
            <p class="intro">CSS properties accept various types of values.</p>
            <ul class="value-list">
                <li>Colors</li>
                <li>Units</li>
                <li>Keywords</li>
                <li>Functions</li>
            </ul>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2023 CSS Basics</p>
        <p>Made with <span class="heart">♥</span> while learning CSS</p>
    </footer>
</body>
</html>
```

## Style Requirements:

1. **General Page Style:**
   - Set a background color for the body
   - Use a different font family than the default
   - Set appropriate margins and padding

2. **Header Styling:**
   - Add background color to the header
   - Center the h1 text
   - Style the navigation links:
     - Remove bullet points from the list
     - Display links horizontally
     - Add padding around each link
     - Change link color and remove underlines
     - Add a hover effect to the links

3. **Section Styling:**
   - Add margins between sections
   - Add a border to each section
   - Style the h2 headings with a different color
   - Make the intro paragraphs italic
   - Highlight the span with class "highlight" with a background color

4. **Property Examples:**
   - Make the example divs appear side by side
   - Give them equal width (33%)
   - Add a border and padding
   - Center the text

5. **Value List Styling:**
   - Change the bullet style
   - Add space between list items
   - Apply a different color to each list item using nth-child

6. **Footer Styling:**
   - Different background color
   - Center the text
   - Make the heart span red and larger

## Task 2: CSS Selector Challenge

Create a new HTML file and corresponding CSS file. Using ONLY CSS selectors (without adding classes or IDs to the HTML), style the following HTML to meet the requirements listed below:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Selector Challenge</title>
    <link rel="stylesheet" href="selector-challenge.css">
</head>
<body>
    <header>
        <h1>CSS Selector Challenge</h1>
    </header>
    
    <main>
        <article>
            <h2>Important Information</h2>
            <p>This is the first paragraph with some <a href="#">important link</a>.</p>
            <p>This is the second paragraph.</p>
            <p>This is the third paragraph with another <a href="https://example.com">external link</a>.</p>
            <aside>
                <p>This is a note in an aside.</p>
            </aside>
        </article>
        
        <section>
            <h2>Product List</h2>
            <ul>
                <li>First product</li>
                <li>Second product</li>
                <li>Third product</li>
                <li>Fourth product</li>
                <li>Fifth product</li>
            </ul>
        </section>
        
        <section>
            <h2>User Information</h2>
            <form>
                <div>
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name">
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email">
                </div>
                <div>
                    <label for="message">Message:</label>
                    <textarea id="message" name="message"></textarea>
                </div>
                <div>
                    <input type="checkbox" id="subscribe" name="subscribe">
                    <label for="subscribe">Subscribe to newsletter</label>
                </div>
                <div>
                    <button type="submit">Submit</button>
                    <button type="reset">Reset</button>
                </div>
            </form>
        </section>
    </main>
    
    <footer>
        <p>Copyright 2023</p>
    </footer>
</body>
</html>
```

### Selector Challenge Requirements:

1. Make the main heading (h1) red.
2. Make all paragraphs that are direct children of the article blue.
3. Make the paragraph inside the aside element gray.
4. Make all links purple, but external links (with "http" in the href) green.
5. Add a left border to the aside element.
6. Make every odd list item have a light gray background.
7. Make only the first paragraph in the article bold.
8. Make only the submit button have a green background.
9. Make input fields have a yellow background when focused.
10. Add a bottom border to the sections but not to the last section.

## Task 3: Create a Simple CSS Card Layout

Create a "card" layout with CSS that could be used for a product or team member display. Your card should:

1. Have a fixed width and height
2. Include an image placeholder
3. Have a heading and some description text
4. Include some kind of button or link
5. Have appropriate padding, margins, and border-radius
6. Include a subtle hover effect (shadow, scale, or color change)

## Submission
Save your HTML and CSS files with appropriate names for each task and run the test case to check your solutions.

## Bonus Challenge
Recreate the classic "yin-yang" symbol using only CSS (no images). Hint: You'll need to use pseudo-elements, border-radius, and background colors.