# Day 4: CSS Box Model & Layout

## Learning Objectives
By the end of this day, you should understand:
- The CSS Box Model and its components
- How to control element dimensions with width, height, padding, border, and margin
- Different display properties and their effects
- How to position elements on a webpage

## The CSS Box Model

Every HTML element is represented as a box in CSS. The CSS Box Model is a fundamental concept that describes the space occupied by an element, which consists of:

1. **Content**: The actual content of the box (text, images, etc.)
2. **Padding**: The space between the content and the border
3. **Border**: The line that surrounds the padding
4. **Margin**: The space outside the border, between this element and other elements

![Box Model Diagram](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model/box-model.png)

### Standard vs. Alternative Box Model

In CSS, there are two box sizing models:

1. **Standard/Content Box Model** (default):
   - `width` and `height` properties define the content area only
   - Total width = width + padding-left + padding-right + border-left + border-right
   - Total height = height + padding-top + padding-bottom + border-top + border-bottom

2. **Alternative/Border Box Model**:
   - `width` and `height` properties define the border area (content + padding + border)
   - Total width = width (includes content, padding, and border)
   - Total height = height (includes content, padding, and border)

To use the alternative box model for all elements:

```css
* {
  box-sizing: border-box;
}
```

This is often preferred by developers because it makes sizing elements more intuitive.

## Box Model Properties

### Width and Height

```css
div {
    width: 300px;       /* Width of the content area */
    height: 200px;      /* Height of the content area */
    max-width: 100%;    /* Maximum width */
    min-width: 200px;   /* Minimum width */
    max-height: 300px;  /* Maximum height */
    min-height: 100px;  /* Minimum height */
}
```

### Padding

```css
div {
    /* Individual sides */
    padding-top: 10px;
    padding-right: 20px;
    padding-bottom: 10px;
    padding-left: 20px;
    
    /* Shorthand - all sides */
    padding: 10px;
    
    /* Shorthand - vertical | horizontal */
    padding: 10px 20px;
    
    /* Shorthand - top | horizontal | bottom */
    padding: 10px 20px 15px;
    
    /* Shorthand - top | right | bottom | left (clockwise) */
    padding: 10px 20px 15px 25px;
}
```

### Border

```css
div {
    /* Individual properties */
    border-width: 2px;
    border-style: solid;
    border-color: #000;
    
    /* Shorthand */
    border: 2px solid #000;
    
    /* Individual sides */
    border-top: 2px solid #000;
    border-right: 1px dashed #999;
    border-bottom: 3px dotted #333;
    border-left: 1px solid #999;
    
    /* Border radius (rounded corners) */
    border-radius: 10px;
    border-radius: 10px 5px;           /* top-left/bottom-right | top-right/bottom-left */
    border-radius: 10px 5px 8px 15px;  /* top-left | top-right | bottom-right | bottom-left */
}
```

### Margin

```css
div {
    /* Individual sides */
    margin-top: 10px;
    margin-right: 20px;
    margin-bottom: 10px;
    margin-left: 20px;
    
    /* Shorthand - all sides */
    margin: 10px;
    
    /* Shorthand - vertical | horizontal */
    margin: 10px 20px;
    
    /* Shorthand - top | horizontal | bottom */
    margin: 10px 20px 15px;
    
    /* Shorthand - top | right | bottom | left (clockwise) */
    margin: 10px 20px 15px 25px;
    
    /* Auto margins for horizontal centering */
    margin: 0 auto;
}
```

### Margin Collapse

Vertical margins between adjacent elements can collapse (combine), with the larger margin being used:

```
Element 1: margin-bottom: 20px
Element 2: margin-top: 30px

The space between Element 1 and Element 2 will be 30px (not 50px)
```

Margin collapse only happens with block elements and only with vertical margins.

## Display Property

The `display` property determines how an element is displayed in the flow of the document.

### Common Display Values

```css
div {
    display: block;         /* Takes up full width, creates line breaks */
    display: inline;        /* Takes up only necessary width, no line breaks */
    display: inline-block;  /* Combines features of block and inline */
    display: flex;          /* Creates a flex container */
    display: grid;          /* Creates a grid container */
    display: none;          /* Removes element from layout (not visible) */
}
```

### Block vs. Inline vs. Inline-Block

1. **Block Elements**:
   - Start on a new line
   - Take up the full width available
   - Can set width and height
   - Examples: `<div>`, `<p>`, `<h1>` to `<h6>`, `<section>`

2. **Inline Elements**:
   - Flow within text
   - Take up only as much width as necessary
   - Cannot set width and height
   - Ignore top and bottom margins
   - Examples: `<span>`, `<a>`, `<strong>`, `<em>`

3. **Inline-Block Elements**:
   - Flow within text (like inline)
   - Can set width and height (like block)
   - Respect margins and padding on all sides
   - Examples: `<button>`, `<input>`, elements styled with `display: inline-block`

## Position Property

The `position` property determines how an element is positioned in the document flow.

```css
div {
    position: static;    /* Default, follows normal flow */
    position: relative;  /* Relative to normal position, creates positioning context */
    position: absolute;  /* Removed from flow, positioned relative to nearest positioned ancestor */
    position: fixed;     /* Removed from flow, positioned relative to viewport */
    position: sticky;    /* Hybrid of relative and fixed */
}
```

### Position Examples

#### Static (Default)
```css
div {
    position: static;
    /* top, right, bottom, left have no effect */
}
```

#### Relative
```css
div {
    position: relative;
    top: 20px;     /* Shifted 20px down from normal position */
    left: 30px;    /* Shifted 30px right from normal position */
}
```

#### Absolute
```css
.container {
    position: relative;  /* Creates positioning context */
}

.container .child {
    position: absolute;
    top: 0;       /* Positioned at the top of the container */
    right: 0;     /* Positioned at the right of the container */
    /* This element is removed from normal flow */
}
```

#### Fixed
```css
div {
    position: fixed;
    top: 0;        /* Sticks to the top of the viewport */
    left: 0;       /* Sticks to the left of the viewport */
    width: 100%;   /* Full width */
    /* Stays fixed even when scrolling */
}
```

#### Sticky
```css
div {
    position: sticky;
    top: 20px;    /* Sticks when scrolled to this position */
    /* Acts like relative until scrolled to threshold, then like fixed */
}
```

### Z-Index

The `z-index` property controls the stacking order of positioned elements:

```css
div {
    position: relative;  /* Must be positioned (not static) */
    z-index: 10;         /* Higher values appear on top */
}
```

## Overflow Property

The `overflow` property controls what happens when content exceeds the element's dimensions:

```css
div {
    width: 300px;
    height: 200px;
    
    overflow: visible;  /* Default, content can spill outside box */
    overflow: hidden;   /* Extra content is clipped/hidden */
    overflow: scroll;   /* Always show scrollbars */
    overflow: auto;     /* Show scrollbars only when needed */
    
    /* Individual axes */
    overflow-x: auto;   /* Horizontal overflow */
    overflow-y: hidden; /* Vertical overflow */
}
```

## Float Property

The `float` property moves an element to the left or right, allowing text and inline elements to wrap around it:

```css
img {
    float: left;    /* Float to the left */
    margin: 0 20px 10px 0;  /* Space around the floated element */
}

.clear {
    clear: both;    /* Stops wrapping around floated elements */
}
```

### Clearing Floats

To ensure a container properly encompasses floated children:

```css
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}
```

## Common Layout Patterns

### Centering Elements

#### Horizontally center a block element:
```css
div {
    width: 300px;      /* Must have a width */
    margin: 0 auto;    /* Auto left and right margins */
}
```

#### Horizontally and vertically center with flexbox:
```css
.container {
    display: flex;
    justify-content: center;  /* Horizontal centering */
    align-items: center;      /* Vertical centering */
    height: 300px;            /* Container needs a height */
}
```

#### Absolute positioning center:
```css
.container {
    position: relative;
}

.centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

### Multi-Column Layout with Floats

```css
.column {
    float: left;
    width: 33.33%;
    padding: 15px;
    box-sizing: border-box;
}

.row::after {
    content: "";
    display: table;
    clear: both;
}
```

## Best Practices

1. **Use `box-sizing: border-box`** for more predictable sizing
2. **Be mindful of margin collapse** when spacing elements vertically
3. **Choose the right display property** for your layout needs
4. **Use modern layout methods** (flexbox or grid) over floats when possible
5. **Keep z-index values organized** to avoid stacking issues
6. **Avoid magic numbers** - use relative units and calculations where appropriate
7. **Test your layouts at different screen sizes**

## Additional Resources

- [MDN Web Docs: The Box Model](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model)
- [CSS-Tricks: The CSS Box Model](https://css-tricks.com/the-css-box-model/)
- [MDN Web Docs: Positioning](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning)
- [CSS-Tricks: All About Floats](https://css-tricks.com/all-about-floats/)