# Day 5: Responsive Design & Media Queries

## Learning Objectives
By the end of this day, you should understand:
- The principles of responsive web design
- How to use media queries to adapt layouts to different devices
- How to create fluid layouts with relative units
- The importance of the viewport meta tag

## What is Responsive Web Design?

Responsive Web Design (RWD) is an approach to web design that makes websites render well on a variety of devices and window or screen sizes. It's about creating websites that work and look good on desktop computers, tablets, and smartphones without requiring separate websites for each device type.

### Core Principles of Responsive Design:

1. **Fluid Layouts**: Using relative units instead of fixed pixel values
2. **Flexible Images**: Making images scale properly with the layout
3. **Media Queries**: Applying different styles based on device characteristics
4. **Mobile-First Approach**: Designing for mobile devices first, then enhancing for larger screens

## The Viewport Meta Tag

The viewport meta tag is crucial for responsive websites. It tells the browser how to control the page's dimensions and scaling on different devices.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

This tag should be placed in the `<head>` section of your HTML document.

### What it does:

- `width=device-width`: Sets the width of the viewport to match the device's width
- `initial-scale=1.0`: Sets the initial zoom level when the page is first loaded
- `user-scalable=no` (optional): Prevents users from zooming (generally not recommended for accessibility reasons)

## Relative Units vs. Absolute Units

### Absolute Units:
- `px` (pixels): Fixed size on screen
- `pt` (points): 1/72 of an inch
- `cm`, `mm`, `in`: Physical measurements

### Relative Units:
- `%`: Relative to the parent element
- `em`: Relative to the font-size of the element (1em = current font-size)
- `rem`: Relative to the font-size of the root element (html)
- `vw`: 1% of viewport width
- `vh`: 1% of viewport height
- `vmin`: 1% of smaller dimension (height or width)
- `vmax`: 1% of larger dimension (height or width)

### Examples:

```css
/* Absolute units (less flexible) */
.container {
    width: 960px;
    padding: 20px;
    font-size: 16px;
}

/* Relative units (more responsive) */
.container {
    width: 80%;         /* 80% of parent width */
    max-width: 1200px;  /* Maximum width cap */
    padding: 2em;       /* 2 × current font size */
    font-size: 1rem;    /* 1 × root font size */
}

/* Viewport-relative units */
.hero {
    height: 50vh;       /* 50% of viewport height */
    width: 100vw;       /* 100% of viewport width */
    font-size: calc(16px + 1vw); /* Responsive font size */
}
```

## Creating Fluid Layouts

A fluid layout stretches and contracts based on the screen size. Here are some techniques:

### Percentage-based widths:

```css
.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
}

.column {
    width: 50%;
    float: left;
}
```

### Flexbox for fluid layouts:

```css
.container {
    display: flex;
    flex-wrap: wrap;
}

.column {
    flex: 1;
    min-width: 300px;
}
```

## Flexible Images

To make images responsive:

```css
img {
    max-width: 100%;
    height: auto;
}
```

This ensures images never exceed their container width but maintain their aspect ratio.

## Media Queries

Media queries allow you to apply styles based on the device's characteristics, like screen width, height, or orientation.

### Basic Syntax:

```css
@media media-type and (condition) {
    /* CSS rules to apply when condition is met */
}
```

### Common Media Types:
- `all`: All devices (default)
- `screen`: Screens (computers, tablets, phones)
- `print`: Print preview mode/printed pages
- `speech`: Screen readers

### Common Conditions:
- `width`, `min-width`, `max-width`: Browser viewport width
- `height`, `min-height`, `max-height`: Browser viewport height
- `orientation: portrait` or `orientation: landscape`: Device orientation
- `aspect-ratio`: Width to height ratio
- `resolution`: Pixel density

### Examples:

```css
/* Base styles (mobile-first) */
body {
    font-size: 16px;
    line-height: 1.5;
}

/* Styles for tablets and larger */
@media screen and (min-width: 768px) {
    body {
        font-size: 18px;
    }
    
    .column {
        width: 50%;
        float: left;
    }
}

/* Styles for desktop */
@media screen and (min-width: 1024px) {
    body {
        font-size: 20px;
    }
    
    .container {
        padding: 2rem;
    }
}

/* Print styles */
@media print {
    .nav, .footer {
        display: none;
    }
    
    body {
        font-size: 12pt;
    }
}

/* Orientation-based styles */
@media (orientation: landscape) {
    .sidebar {
        width: 30%;
        float: left;
    }
    
    .content {
        width: 70%;
        float: right;
    }
}
```

## Combining Media Queries

You can combine multiple conditions using logical operators:

```css
/* AND operator (both conditions must be true) */
@media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Styles that apply only to tablets */
}

/* OR operator (either condition can be true) */
@media screen and (max-width: 767px), (orientation: portrait) {
    /* Styles that apply to either small screens OR portrait orientation */
}

/* NOT operator */
@media not screen and (min-width: 768px) {
    /* Styles that apply to everything EXCEPT screens 768px and wider */
}
```

## Common Breakpoints

While breakpoints should ideally be based on your specific design rather than devices, these are commonly used widths:

```css
/* Small devices (phones) */
@media (min-width: 320px) and (max-width: 767px) { ... }

/* Medium devices (tablets) */
@media (min-width: 768px) and (max-width: 1023px) { ... }

/* Large devices (desktops) */
@media (min-width: 1024px) and (max-width: 1279px) { ... }

/* Extra large devices (large desktops) */
@media (min-width: 1280px) { ... }
```

## Mobile-First vs. Desktop-First Approach

### Mobile-First:

Start with styles for the smallest screens, then add media queries with `min-width` to enhance design for larger screens.

```css
/* Base styles for mobile */
.container {
    width: 100%;
}

/* Enhancement for tablets */
@media (min-width: 768px) {
    .container {
        width: 750px;
        margin: 0 auto;
    }
}

/* Enhancement for desktops */
@media (min-width: 1024px) {
    .container {
        width: 960px;
    }
}
```

### Desktop-First:

Start with styles for the desktop layout, then add media queries with `max-width` to adjust for smaller screens.

```css
/* Base styles for desktop */
.container {
    width: 960px;
    margin: 0 auto;
}

/* Adjustments for tablets */
@media (max-width: 1023px) {
    .container {
        width: 750px;
    }
}

/* Adjustments for mobile */
@media (max-width: 767px) {
    .container {
        width: 100%;
        margin: 0;
    }
}
```

## Best Practices

### 1. Start with a mobile-first approach
This forces you to prioritize content and focus on core functionality first.

### 2. Use relative units whenever possible
Prefer `%`, `em`, `rem`, `vw`, and `vh` over `px` for more fluid layouts.

### 3. Set appropriate breakpoints
Don't base breakpoints solely on common device sizes; set them where your design naturally breaks.

### 4. Test on multiple devices
Always test your responsive designs on various screens and devices.

### 5. Consider touch versus mouse interaction
Remember that touch interfaces require larger clickable areas than mouse interfaces.

### 6. Consider loading times
Mobile devices often have slower connections, so optimize images and minimize resource usage.

### 7. Use meta viewport tag
Always include the viewport meta tag.

### 8. Keep layout simple
Simpler layouts are easier to make responsive and generally provide better user experience.

## Common Responsive Design Patterns

### Mostly Fluid

The layout shifts from multi-column to single-column as the screen gets smaller, with minor adjustments to margins and padding.

### Column Drop

Columns stack vertically as the screen width narrows.

### Layout Shifter

Different layouts are used for different screen sizes, not just stacking elements.

### Off Canvas

Less frequently used content (like navigation) is hidden off-screen and shown when needed (common on mobile websites).

## Testing Responsive Designs

### Browser DevTools:
- Chrome, Firefox, Safari, and other browsers have built-in responsive design testing tools
- These allow you to simulate different screen sizes and devices

### Actual Devices:
- Always test on real devices when possible
- Consider factors like touch input, actual device performance, and real-world conditions

## Additional Resources

- [MDN Web Docs: Responsive design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Google Web Fundamentals: Responsive Web Design Basics](https://developers.google.com/web/fundamentals/design-and-ux/responsive)
- [CSS-Tricks: Media Queries](https://css-tricks.com/css-media-queries/)
- [Smashing Magazine: Responsive Design](https://www.smashingmagazine.com/category/responsive-design/)
- [Brad Frost: Responsive Patterns](https://bradfrost.github.io/this-is-responsive/patterns.html)