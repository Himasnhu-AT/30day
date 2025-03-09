# Day 7: CSS Grid

## Learning Objectives
By the end of this day, you should understand:
- What CSS Grid is and how it differs from Flexbox
- How to create grid layouts using CSS Grid
- Key properties for grid containers and grid items
- Advanced grid techniques for responsive layouts
- When to use Grid vs. Flexbox

## Introduction to CSS Grid

CSS Grid Layout is a two-dimensional layout system designed specifically for creating complex grid-based user interfaces. Unlike Flexbox, which is primarily one-dimensional, Grid allows you to control both rows and columns simultaneously, making it ideal for overall page layouts and complex components.

### Why Use CSS Grid?

- **Two-dimensional control**: Manage both rows and columns simultaneously
- **Grid-based design**: Perfect for implementing design systems based on grids
- **Complex layouts**: Create intricate layouts with precise item placement
- **Responsive design**: Build layouts that adapt gracefully to different screen sizes
- **Reduced markup**: Accomplish complex layouts with fewer nested containers
- **Content organization**: Place items in any order regardless of HTML structure

## Basic Concepts

### Grid Container and Grid Items

To use CSS Grid, you define a **grid container** by setting `display: grid` or `display: inline-grid` on a parent element. All direct children of this container become **grid items**.

```html
<div class="grid-container">
    <div class="item">Item 1</div>
    <div class="item">Item 2</div>
    <div class="item">Item 3</div>
    <div class="item">Item 4</div>
    <div class="item">Item 5</div>
    <div class="item">Item 6</div>
</div>
```

```css
.grid-container {
    display: grid;
}
```

### Grid Lines, Tracks, Cells, and Areas

- **Grid Lines**: The horizontal and vertical dividing lines that create the grid structure
- **Grid Tracks**: The space between adjacent grid lines (rows or columns)
- **Grid Cells**: The intersection of a row and column
- **Grid Areas**: A rectangular area consisting of one or more grid cells

![Grid Concepts](https://css-tricks.com/wp-content/uploads/2018/11/terms-grid-anatomy.svg)

## Grid Container Properties

### display

Defines the element as a grid container:

```css
.container {
    display: grid; /* or inline-grid */
}
```

### grid-template-columns and grid-template-rows

Defines the columns and rows of the grid with a space-separated list of values:

```css
.container {
    grid-template-columns: 100px 200px 100px;  /* 3 columns */
    grid-template-rows: 50px 100px;            /* 2 rows */
}
```

You can use various measurement units:
- Fixed units: `px`, `em`, `rem`
- Percentages: `%` (relative to container)
- Fractional units: `fr` (shares of available space)
- `auto` (sized based on content)
- `min-content`, `max-content`
- `minmax(min, max)` (sets a size range)

#### Using repeat() function:

```css
.container {
    /* Creates 4 equal-width columns */
    grid-template-columns: repeat(4, 1fr);
    
    /* Creates a pattern of columns that repeats */
    grid-template-columns: repeat(3, 100px 200px);
}
```

#### Using the fr unit:

```css
.container {
    /* Three columns where the middle takes twice as much space as the others */
    grid-template-columns: 1fr 2fr 1fr;
}
```

### grid-template-areas

Defines named grid areas:

```css
.container {
    grid-template-areas: 
        "header header header"
        "sidebar main main"
        "footer footer footer";
}
```

Each string represents a row, and each word represents a cell. Use `.` for an empty cell.

### grid-template

A shorthand for `grid-template-rows`, `grid-template-columns`, and `grid-template-areas`:

```css
.container {
    grid-template: 
        "header header header" 100px
        "sidebar main main" auto
        "footer footer footer" 50px
        / 200px 1fr 1fr;
}
```

In this example, we define three rows with heights 100px, auto, and 50px, and three columns with widths 200px, 1fr, and 1fr.

### column-gap, row-gap, and gap

Specifies the size of grid lines:

```css
.container {
    column-gap: 10px;
    row-gap: 15px;
    
    /* Shorthand for both */
    gap: 15px 10px; /* row-gap column-gap */
    
    /* Equal gaps */
    gap: 20px;
}
```

### justify-items and align-items

Controls alignment of grid items within their cells:

```css
.container {
    justify-items: start | end | center | stretch;  /* horizontal alignment */
    align-items: start | end | center | stretch;    /* vertical alignment */
}
```

### place-items

Shorthand for `justify-items` and `align-items`:

```css
.container {
    place-items: center;         /* centers items both horizontally and vertically */
    place-items: start center;   /* vertically start, horizontally center */
}
```

### justify-content and align-content

Controls alignment of the entire grid within the container:

```css
.container {
    justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
    align-content: start | end | center | stretch | space-around | space-between | space-evenly;
}
```

### place-content

Shorthand for `justify-content` and `align-content`:

```css
.container {
    place-content: center;           /* centers the grid both horizontally and vertically */
    place-content: space-between center;
}
```

### grid-auto-columns and grid-auto-rows

Specifies the size of automatically generated grid tracks:

```css
.container {
    grid-auto-columns: 100px;
    grid-auto-rows: minmax(100px, auto);
}
```

### grid-auto-flow

Controls how auto-placed items are inserted in the grid:

```css
.container {
    grid-auto-flow: row;      /* default: fills each row in turn */
    grid-auto-flow: column;   /* fills each column in turn */
    grid-auto-flow: row dense; /* attempts to fill in holes earlier in the grid */
}
```

### grid

Shorthand for all grid properties:

```css
.container {
    grid: 100px 300px / 3fr 1fr;  /* rows / columns */
    
    /* Complex example */
    grid: 
        [row1-start] "header header" 80px
        [row1-end row2-start] "sidebar content" auto 
        [row2-end] / 150px 1fr;
}
```

## Grid Item Properties

### grid-column-start, grid-column-end, grid-row-start, grid-row-end

Determines a grid item's location within the grid by referring to specific grid lines:

```css
.item {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 4;
}
```

You can use named lines, line numbers, or the `span` keyword:

```css
.item {
    grid-column-start: 1;
    grid-column-end: span 2;  /* spans 2 columns */
}
```

### grid-column and grid-row

Shorthand for `grid-column-start` / `grid-column-end` and `grid-row-start` / `grid-row-end`:

```css
.item {
    grid-column: 1 / 3;         /* start at line 1, end at line 3 */
    grid-row: 2 / 4;            /* start at line 2, end at line 4 */
    
    /* Using span */
    grid-column: 1 / span 2;    /* start at line 1, span 2 columns */
    
    /* Negative values count from the end */
    grid-column: 1 / -1;        /* spans all columns from left to right */
}
```

### grid-area

Can be used in two ways:

1. As a reference to a named grid area:

```css
.item {
    grid-area: header;  /* places item in the area named "header" */
}
```

2. As a shorthand for `grid-row-start` / `grid-column-start` / `grid-row-end` / `grid-column-end`:

```css
.item {
    grid-area: 2 / 1 / 4 / 3;  /* row-start / column-start / row-end / column-end */
}
```

### justify-self and align-self

Controls alignment of an individual grid item within its cell:

```css
.item {
    justify-self: start | end | center | stretch;  /* horizontal alignment */
    align-self: start | end | center | stretch;    /* vertical alignment */
}
```

### place-self

Shorthand for `justify-self` and `align-self`:

```css
.item {
    place-self: center;        /* centers item both horizontally and vertically */
    place-self: start center;  /* vertically start, horizontally center */
}
```

## Responsive Grid Layouts

### Using minmax()

The `minmax()` function creates responsive tracks by setting minimum and maximum sizes:

```css
.container {
    grid-template-columns: 1fr minmax(200px, 800px) 1fr;
}
```

### Using auto-fill and auto-fit

`auto-fill` and `auto-fit` create as many tracks as will fit in the container:

```css
.container {
    /* Creates as many 250px columns as will fit */
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    
    /* Similar to auto-fill but collapses empty tracks */
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
```

### CSS Grid with Media Queries

Combine CSS Grid with media queries for powerful responsive layouts:

```css
.container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
}

@media (min-width: 768px) {
    .container {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .container {
        grid-template-columns: repeat(4, 1fr);
    }
}
```

## Common CSS Grid Patterns

### Basic Grid System

```css
.grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 20px;
}

.span-1 { grid-column: span 1; }
.span-2 { grid-column: span 2; }
/* ... */
.span-12 { grid-column: span 12; }

@media (max-width: 768px) {
    .grid {
        grid-template-columns: repeat(6, 1fr);
    }
}

@media (max-width: 480px) {
    .grid {
        grid-template-columns: 1fr;
    }
    
    /* All spans become full width on mobile */
    [class*="span-"] {
        grid-column: 1 / -1;
    }
}
```

### Magazine Layout

```css
.magazine-layout {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(100px, auto);
    gap: 20px;
}

.featured {
    grid-column: span 2;
    grid-row: span 2;
}

.standard {
    grid-column: span 1;
    grid-row: span 1;
}

@media (max-width: 768px) {
    .magazine-layout {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

### Holy Grail Layout with Grid

```css
.holy-grail {
    display: grid;
    grid-template-areas:
        "header header header"
        "nav main aside"
        "footer footer footer";
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}

.header { grid-area: header; }
.nav { grid-area: nav; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

@media (max-width: 768px) {
    .holy-grail {
        grid-template-areas:
            "header"
            "nav"
            "main"
            "aside"
            "footer";
        grid-template-columns: 1fr;
    }
}
```

### Masonry-like Layout

While CSS Grid doesn't natively support true masonry layouts yet, you can create similar effects:

```css
.masonry-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: 20px;
    gap: 20px;
}

.masonry-item {
    /* This is set dynamically with JavaScript based on content height */
    grid-row-end: span 10; /* arbitrary number of rows to span */
}
```

## CSS Grid vs. Flexbox

### When to Use Grid

- For two-dimensional layouts (managing both rows and columns)
- For complex overall page layouts
- When you need precise control over placement in both directions
- For grid-based designs that need alignment in rows and columns
- When the layout is not dependent on content size

### When to Use Flexbox

- For one-dimensional layouts (either row OR column)
- For components like navigation menus, form controls
- When content size should dictate layout
- For flexible width/height distributions
- When you need alignment and distribution within a single axis

### Using Grid and Flexbox Together

For the most powerful layouts, use Grid and Flexbox together:

```css
/* Overall page layout with Grid */
.page {
    display: grid;
    grid-template-columns: 1fr min(1200px, 94%) 1fr;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}

.page > * {
    grid-column: 2; /* Center all content in the middle column */
}

/* Navigation menu with Flexbox */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-links {
    display: flex;
    gap: 20px;
}
```

## Browser Support

CSS Grid is supported in all modern browsers. For older browsers, consider providing a fallback layout or using a feature detection approach.

## Best Practices

1. **Start with Grid Container**: Define your grid structure before placing items
2. **Name Grid Areas**: Use `grid-template-areas` for complex layouts to make them more readable
3. **Combine with Flexbox**: Use Grid for overall layout and Flexbox for component-level alignment
4. **Mobile-First**: Start with a single column layout and expand to multi-column for larger screens
5. **Use fr Units**: Prefer fractional units over percentages for flexibility
6. **Mind the Gap**: Use `gap` property instead of margins on individual items
7. **Use Auto-Placement** when possible rather than explicitly placing every item
8. **Set Box-Sizing**: Use `box-sizing: border-box` to make size calculations more predictable
9. **Test Responsiveness**: Test your grid layouts at various screen sizes

## Advanced Techniques

### Subgrid (Upcoming Feature)

Subgrid allows a grid item that is itself a grid container to inherit its parent's grid lines:

```css
.parent-grid {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
}

.child-grid {
    grid-column: 2 / 7;
    display: grid;
    grid-template-columns: subgrid; /* inherits parent's columns */
}
```

Note: Subgrid is still gaining browser support.

### Grid Template Areas with Media Queries

```css
.dashboard {
    display: grid;
    gap: 20px;
    grid-template-areas:
        "header header header"
        "sidebar main main"
        "sidebar widgets widgets"
        "footer footer footer";
}

@media (max-width: 768px) {
    .dashboard {
        grid-template-areas:
            "header"
            "main"
            "widgets"
            "sidebar"
            "footer";
    }
}
```

### Auto-Placement with Dense Packing

```css
.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-auto-flow: dense; /* fills in holes in the grid */
    gap: 10px;
}

.gallery .wide {
    grid-column: span 2;
}

.gallery .tall {
    grid-row: span 2;
}
```

## Additional Resources

- [CSS-Tricks: A Complete Guide to CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [MDN Web Docs: CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [Grid By Example](https://gridbyexample.com/) - Examples and patterns
- [CSS Grid Garden](https://cssgridgarden.com/) - A game for learning CSS Grid
- [Can I Use: CSS Grid](https://caniuse.com/css-grid) - Browser support table