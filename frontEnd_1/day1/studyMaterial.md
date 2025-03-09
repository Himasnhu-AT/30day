# Day 1: HTML Basics - Document Structure

## Learning Objectives
By the end of this day, you should understand:
- What HTML is and its purpose
- Basic structure of an HTML document
- Essential HTML elements
- How to create and view an HTML file

## What is HTML?
HTML (Hypertext Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the structure and content of a webpage.

## Basic HTML Document Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Title</title>
</head>
<body>
    <!-- Content goes here -->
</body>
</html>
```

## Key Components Explained

### `<!DOCTYPE html>`
- Tells the browser that the document is an HTML5 document

### `<html>` Element
- The root element that encloses all HTML content
- The `lang` attribute specifies the language of the document

### `<head>` Element
- Contains meta-information about the document
- Not displayed on the page itself

### `<meta>` Elements
- Provide metadata about the HTML document
- `charset="UTF-8"` specifies the character encoding
- `viewport` meta tag is crucial for responsive design

### `<title>` Element
- Sets the title of the webpage (shown in the browser tab)

### `<body>` Element
- Contains all content that will be visible on the page

## Common HTML Elements

### Headings
```html
<h1>Main Heading</h1>
<h2>Subheading</h2>
<h3>Smaller Heading</h3>
<!-- h1 to h6 available -->
```

### Paragraphs
```html
<p>This is a paragraph of text.</p>
```

### Links
```html
<a href="https://example.com">Link Text</a>
```

### Images
```html
<img src="image.jpg" alt="Description of image">
```

### Lists
```html
<!-- Ordered list -->
<ol>
    <li>First item</li>
    <li>Second item</li>
</ol>

<!-- Unordered list -->
<ul>
    <li>Item</li>
    <li>Another item</li>
</ul>
```

## Creating and Viewing HTML Files
1. Create a new file with a `.html` extension using any text editor
2. Add the basic HTML structure shown above
3. Save the file
4. Open the file in a web browser to view it

## Additional Resources
- [MDN Web Docs: HTML Basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics)
- [W3Schools HTML Tutorial](https://www.w3schools.com/html/)
- [HTML5 Specification](https://html.spec.whatwg.org/)