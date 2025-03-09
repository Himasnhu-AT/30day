# Day 6: CSS Flexbox

## Learning Objectives
By the end of this day, you should understand:
- What Flexbox is and its purpose in CSS layouts
- How to create flexible layouts using Flexbox
- The main properties for flex containers and flex items
- Common Flexbox patterns for responsive design

## Introduction to Flexbox

Flexbox (Flexible Box Layout) is a one-dimensional layout model designed to provide a more efficient way to arrange, align, and distribute space among items in a container, even when their size is unknown or dynamic. It's called "one-dimensional" because it deals with layout in a single direction at a time – either as a row or as a column.

### Why Use Flexbox?

- **Simplifies Complex Layouts**: Achieve complex layouts with cleaner code
- **Direction-Agnostic**: Easily switch between horizontal and vertical layouts
- **Alignment Control**: Precisely align items within containers
- **Space Distribution**: Intelligently distribute space between or around items
- **Order Control**: Change visual order without modifying the HTML
- **Flexibility**: Items can grow or shrink based on available space

## Basic Concepts

### Flex Container and Flex Items

To use Flexbox, you first define a **flex container** by setting `display: flex` or `display: inline-flex` on a parent element. All direct children of this container become **flex items**.

```html
<div class="flex-container">
    <div class="item">Item 1</div>
    <div class="item">Item 2</div>
    <div class="item">Item 3</div>
</div>
```

```css
.flex-container {
    display: flex;
}
```

### Main Axis and Cross Axis

Flexbox works with two axes:

- **Main Axis**: The primary axis along which flex items are laid out
- **Cross Axis**: Perpendicular to the main axis

The direction of these axes depends on the `flex-direction` property.

## Flex Container Properties

### display

Sets the element as a flex container:

```css
.container {
    display: flex; /* or inline-flex */
}
```

### flex-direction

Establishes the main axis, defining the direction flex items are placed:

```css
.container {
    flex-direction: row; /* default: left to right */
    flex-direction: row-reverse; /* right to left */
    flex-direction: column; /* top to bottom */
    flex-direction: column-reverse; /* bottom to top */
}
```

### flex-wrap

Controls whether flex items are forced in a single line or can be wrapped onto multiple lines:

```css
.container {
    flex-wrap: nowrap; /* default: single line */
    flex-wrap: wrap; /* multiple lines, if needed */
    flex-wrap: wrap-reverse; /* wrap from bottom to top */
}
```

### flex-flow

Shorthand for `flex-direction` and `flex-wrap`:

```css
.container {
    flex-flow: row wrap; /* direction wrap */
}
```

### justify-content

Defines alignment along the main axis, distributing free space:

```css
.container {
    justify-content: flex-start; /* default: items at start */
    justify-content: flex-end; /* items at end */
    justify-content: center; /* items at center */
    justify-content: space-between; /* equal space between items */
    justify-content: space-around; /* equal space around items */
    justify-content: space-evenly; /* even spacing between and around items */
}
```

![justify-content examples](https://css-tricks.com/wp-content/uploads/2018/10/justify-content.svg)

### align-items

Defines alignment along the cross axis:

```css
.container {
    align-items: stretch; /* default: items stretch to fill container */
    align-items: flex-start; /* items aligned at start of cross axis */
    align-items: flex-end; /* items aligned at end of cross axis */
    align-items: center; /* items centered on cross axis */
    align-items: baseline; /* items aligned by text baseline */
}
```

![align-items examples](https://css-tricks.com/wp-content/uploads/2018/10/align-items.svg)

### align-content

Aligns lines within a flex container when there's extra space on the cross axis (only applies when there are multiple rows/columns of flex items):

```css
.container {
    align-content: flex-start; /* lines packed at start */
    align-content: flex-end; /* lines packed at end */
    align-content: center; /* lines packed at center */
    align-content: space-between; /* equal space between lines */
    align-content: space-around; /* equal space around lines */
    align-content: stretch; /* default: lines stretch to fill container */
}
```

![align-content examples](https://css-tricks.com/wp-content/uploads/2018/10/align-content.svg)

## Flex Item Properties

### order

Controls the order in which flex items appear:

```css
.item {
    order: 0; /* default: follows source order */
    order: 1; /* appears after items with lower values */
    order: -1; /* appears before items with higher values */
}
```

### flex-grow

Defines the ability for a flex item to grow when there's extra space:

```css
.item {
    flex-grow: 0; /* default: does not grow */
    flex-grow: 1; /* grows to fill available space */
    flex-grow: 2; /* grows to fill available space at twice the rate of flex-grow: 1 */
}
```

### flex-shrink

Defines the ability for a flex item to shrink when there's not enough space:

```css
.item {
    flex-shrink: 1; /* default: can shrink if needed */
    flex-shrink: 0; /* will not shrink */
    flex-shrink: 2; /* shrinks at twice the rate of flex-shrink: 1 */
}
```

### flex-basis

Defines the default size of an element before remaining space is distributed:

```css
.item {
    flex-basis: auto; /* default: based on item's content */
    flex-basis: 0; /* ignores item's content size */
    flex-basis: 25%; /* sets initial size to 25% of container */
    flex-basis: 200px; /* sets initial size to 200px */
}
```

### flex

Shorthand for `flex-grow`, `flex-shrink`, and `flex-basis`:

```css
.item {
    flex: 0 1 auto; /* default: don't grow, can shrink, base size is auto */
    flex: 1; /* equivalent to flex: 1 1 0 (can grow and shrink, base size is 0) */
    flex: auto; /* equivalent to flex: 1 1 auto */
    flex: none; /* equivalent to flex: 0 0 auto (rigid item) */
}
```

### align-self

Overrides the container's `align-items` for a specific flex item:

```css
.item {
    align-self: auto; /* default: follows container's align-items */
    align-self: flex-start; /* aligned at start of cross axis */
    align-self: flex-end; /* aligned at end of cross axis */
    align-self: center; /* centered on cross axis */
    align-self: baseline; /* aligned by text baseline */
    align-self: stretch; /* stretched to fill cross axis */
}
```

## Common Flexbox Patterns

### Centering an Element

```css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* for vertical centering in viewport */
}
```

### Navigation Bar

```css
.navbar {
    display: flex;
    justify-content: space-between; /* or space-around */
    align-items: center;
    padding: 1rem;
}

.nav-items {
    display: flex;
    gap: 1rem; /* modern way to add space between items */
}
```

### Card Layout

```css
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.card {
    flex: 0 1 300px; /* don't grow, can shrink, 300px base width */
    /* other card styling */
}
```

### Holy Grail Layout

A classic web layout with header, footer, and three columns:

```css
.holy-grail {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.header, .footer {
    flex: 0 0 auto;
}

.content-wrapper {
    display: flex;
    flex: 1 0 auto;
}

.main-content {
    flex: 1 0 auto;
}

.sidebar-left, .sidebar-right {
    flex: 0 0 200px; /* fixed width sidebars */
}

/* Make it responsive */
@media (max-width: 768px) {
    .content-wrapper {
        flex-direction: column;
    }
    
    .sidebar-left, .sidebar-right {
        flex: 0 0 auto;
    }
}
```

## Flexbox for Responsive Design

Flexbox is ideal for responsive layouts:

```css
.responsive-container {
    display: flex;
    flex-wrap: wrap;
}

.responsive-item {
    flex: 1 1 300px; /* grow, shrink, and min-width of 300px */
    margin: 10px;
}

/* Items will wrap when container is too narrow */
```

## Gap in Flexbox

Modern browsers now support the `gap` property for Flexbox, which adds space between flex items without affecting outer margins:

```css
.container {
    display: flex;
    gap: 20px; /* adds 20px gap between all items */
    /* can also use row-gap and column-gap separately */
}
```

## Browser Support

Flexbox is supported in all modern browsers. For older browsers (like IE 10), some properties may have limited support or require vendor prefixes.

## Best Practices

1. **Use Flexbox for one-dimensional layouts** - For complex grid systems, consider CSS Grid
2. **Set box-sizing: border-box** on all elements to make size calculations more intuitive
3. **Remember flex-basis vs width/height** - flex-basis takes precedence in the flex direction
4. **Test on different screen sizes** - Flexbox layouts can behave differently at various breakpoints
5. **Use gap property** where supported, instead of margins on individual items
6. **Be careful with flex-grow and flex-shrink ratios** - They can lead to complex layouts that are difficult to maintain

## Advanced Techniques

### Flex Auto Margins

Using `margin: auto` with flex items creates powerful alignment options:

```css
.flex-container {
    display: flex;
}

.push-right {
    margin-left: auto; /* pushes item to the far right */
}

.push-down {
    margin-top: auto; /* pushes item to the bottom (in a column layout) */
}
```

### Nested Flexbox

You can nest flex containers for more complex layouts:

```css
.outer-flex {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.inner-flex {
    display: flex;
    flex: 1;
}

.inner-flex > div {
    flex: 1;
}
```

## Additional Resources

- [CSS-Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [MDN Web Docs: Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)
- [Flexbox Froggy](https://flexboxfroggy.com/) - A game for learning Flexbox
- [Flexbox Defense](http://www.flexboxdefense.com/) - Another game for practicing Flexbox
- [Can I Use: Flexbox](https://caniuse.com/flexbox) - Browser support table