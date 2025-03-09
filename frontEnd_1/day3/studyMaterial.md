# Day 3: CSS Basics - Selectors & Properties

## Learning Objectives
By the end of this day, you should understand:
- What CSS is and its purpose
- How to include CSS in HTML documents
- Basic CSS selectors and how to use them
- Common CSS properties and values

## What is CSS?

CSS (Cascading Style Sheets) is a style sheet language used to describe the presentation of a document written in HTML. CSS controls the visual appearance of web pages including layout, colors, fonts, and more.

### Why CSS is Important:

1. **Separation of Concerns**: Keeps content (HTML) separate from presentation (CSS)
2. **Consistency**: Ensures uniform styling across multiple pages
3. **Efficiency**: Allows you to control the style of multiple elements from one place
4. **Responsiveness**: Enables websites to adapt to different screen sizes

## Including CSS in HTML

There are three ways to include CSS in an HTML document:

### 1. Inline CSS
Uses the `style` attribute within HTML elements:

```html
<p style="color: blue; font-size: 18px;">This is a blue paragraph.</p>
```

**Pros**: Quick for small changes
**Cons**: Mixes content and presentation, difficult to maintain, not reusable

### 2. Internal (Embedded) CSS
Uses the `<style>` element in the document `<head>`:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        p {
            color: blue;
            font-size: 18px;
        }
    </style>
</head>
<body>
    <p>This is a blue paragraph.</p>
</body>
</html>
```

**Pros**: No extra files needed, styles apply to the current page
**Cons**: Styles only apply to one page, may increase page load time

### 3. External CSS (Recommended)
Links to an external CSS file:

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <p>This is a blue paragraph.</p>
</body>
</html>
```

In `styles.css`:
```css
p {
    color: blue;
    font-size: 18px;
}
```

**Pros**: Separation of concerns, reusability, caching, maintainability
**Cons**: Additional HTTP request (though this is mitigated by caching)

## CSS Syntax

A CSS rule consists of:
- A **selector** that targets specific HTML elements
- A declaration block containing one or more declarations
- Each declaration consists of a **property** and a **value**

```css
selector {
    property: value;
    another-property: another-value;
}
```

## CSS Selectors

### Basic Selectors

1. **Element Selector**: Selects all instances of the specified element
```css
p {
    color: red;
}
```

2. **Class Selector**: Selects elements with a specific class attribute
```css
.highlight {
    background-color: yellow;
}
```

3. **ID Selector**: Selects an element with a specific ID (should be unique on the page)
```css
#header {
    font-size: 24px;
}
```

4. **Universal Selector**: Selects all elements
```css
* {
    margin: 0;
    padding: 0;
}
```

### Combinators

1. **Descendant Selector**: Selects all elements that are descendants of a specified element
```css
article p {
    font-style: italic;
}
```

2. **Child Selector**: Selects all elements that are direct children of a specified element
```css
ul > li {
    list-style-type: square;
}
```

3. **Adjacent Sibling Selector**: Selects an element that directly follows another specific element
```css
h2 + p {
    font-weight: bold;
}
```

4. **General Sibling Selector**: Selects elements that follow a specific element
```css
h2 ~ p {
    text-indent: 20px;
}
```

### Attribute Selectors

1. **Simple Attribute Selector**: Selects elements with a specific attribute
```css
input[type] {
    border: 1px solid gray;
}
```

2. **Exact Attribute Value**: Selects elements with a specific attribute and value
```css
input[type="text"] {
    border-color: blue;
}
```

3. **Attribute Contains Value**: Selects elements whose attribute value contains a specific word
```css
a[href*="example"] {
    color: green;
}
```

### Pseudo-classes

Pseudo-classes select elements based on state or position:

```css
/* Unvisited links */
a:link {
    color: blue;
}

/* Visited links */
a:visited {
    color: purple;
}

/* Mouse over link */
a:hover {
    text-decoration: underline;
}

/* First child element */
li:first-child {
    font-weight: bold;
}

/* Last child element */
li:last-child {
    border-bottom: none;
}

/* Every odd-numbered element */
tr:nth-child(odd) {
    background-color: #f2f2f2;
}
```

### Pseudo-elements

Pseudo-elements target specific parts of elements:

```css
/* First letter of a paragraph */
p::first-letter {
    font-size: 200%;
    font-weight: bold;
}

/* First line of a paragraph */
p::first-line {
    font-variant: small-caps;
}

/* Before and after an element */
h2::before {
    content: "➤ ";
}

h2::after {
    content: " ✓";
}
```

## Common CSS Properties

### Text Properties

```css
p {
    color: #333333;                /* Text color */
    font-family: Arial, sans-serif; /* Font family */
    font-size: 16px;               /* Font size */
    font-weight: bold;             /* Font weight: normal, bold, 100-900 */
    font-style: italic;            /* Font style: normal, italic, oblique */
    text-align: center;            /* Text alignment: left, right, center, justify */
    text-decoration: underline;    /* Text decoration: none, underline, line-through, overline */
    text-transform: uppercase;     /* Text case: none, uppercase, lowercase, capitalize */
    line-height: 1.5;              /* Line height (spacing between lines) */
    letter-spacing: 1px;           /* Spacing between letters */
    word-spacing: 2px;             /* Spacing between words */
}
```

### Background Properties

```css
div {
    background-color: #f0f0f0;                   /* Background color */
    background-image: url('background.jpg');      /* Background image */
    background-repeat: no-repeat;                /* How image repeats: repeat, repeat-x, repeat-y, no-repeat */
    background-position: center center;          /* Image position: combinations of top, right, bottom, left, center, or pixel values */
    background-size: cover;                      /* Image size: auto, cover, contain, or specific dimensions */
    background-attachment: fixed;                /* Image scrolling: scroll, fixed */
    
    /* Shorthand for above properties */
    background: #f0f0f0 url('background.jpg') no-repeat center center / cover fixed;
}
```

### Box Model Properties

```css
div {
    width: 300px;                /* Width of the content area */
    height: 200px;               /* Height of the content area */
    
    padding: 10px;               /* Space inside the border (all sides) */
    padding-top: 5px;            /* Space inside the border (specific side) */
    padding-right: 10px;
    padding-bottom: 15px;
    padding-left: 20px;
    
    border: 1px solid black;     /* Border shorthand: width style color */
    border-width: 1px;           /* Border width */
    border-style: solid;         /* Border style: none, solid, dashed, dotted, double, etc. */
    border-color: black;         /* Border color */
    border-radius: 5px;          /* Rounded corners */
    
    margin: 10px;                /* Space outside the border (all sides) */
    margin-top: 5px;             /* Space outside the border (specific side) */
    margin-right: 10px;
    margin-bottom: 15px;
    margin-left: 20px;
}
```

### Display and Positioning Properties

```css
div {
    display: block;              /* Display type: block, inline, inline-block, flex, grid, none */
    position: relative;          /* Positioning: static, relative, absolute, fixed, sticky */
    top: 10px;                   /* Position offset from top (works with non-static positions) */
    right: 20px;
    bottom: 10px;
    left: 20px;
    z-index: 1;                  /* Stacking order (higher numbers appear on top) */
    float: left;                 /* Float element: left, right, none */
    clear: both;                 /* Prevent floating: none, left, right, both */
}
```

### Color Values in CSS

1. **Named Colors**:
```css
p { color: red; }
```

2. **Hexadecimal Colors**:
```css
p { color: #ff0000; } /* Full form */
p { color: #f00; }    /* Shorthand for #ff0000 */
```

3. **RGB and RGBA Colors**:
```css
p { color: rgb(255, 0, 0); }         /* Red */
p { color: rgba(255, 0, 0, 0.5); }   /* Semi-transparent red */
```

4. **HSL and HSLA Colors**:
```css
p { color: hsl(0, 100%, 50%); }      /* Red */
p { color: hsla(0, 100%, 50%, 0.5); } /* Semi-transparent red */
```

## CSS Comments

Use comments to explain your code:

```css
/* This is a CSS comment */
p {
    color: blue; /* This sets the text color to blue */
}

/*
This is a
multi-line
comment
*/
```

## The Cascade and Specificity

CSS stands for "Cascading Style Sheets," and the cascade refers to how styles are applied when there are multiple rules targeting the same element.

Styles are applied based on:

1. **Importance**: `!important` declarations override normal declarations
2. **Specificity**: More specific selectors override less specific ones
3. **Source Order**: Later rules override earlier rules

### Specificity Hierarchy (from highest to lowest):

1. Inline styles (using the style attribute)
2. ID selectors (#example)
3. Class selectors (.example), attribute selectors ([type="text"]), and pseudo-classes (:hover)
4. Element selectors (p) and pseudo-elements (::first-line)

## Additional Resources

- [MDN Web Docs: CSS Basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics)
- [CSS-Tricks: CSS Almanac](https://css-tricks.com/almanac/)
- [W3Schools CSS Tutorial](https://www.w3schools.com/css/)
- [CSS Specificity Calculator](https://specificity.keegan.st/)
- [Can I Use](https://caniuse.com/) (for checking browser support)