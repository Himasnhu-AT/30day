# Day 5 Assignment: Responsive Design & Media Queries

## Task 1: Create a Responsive Navigation Menu

Create an HTML file with a navigation menu that adapts to different screen sizes:
- On large screens (desktop), the navigation should be horizontal with menu items side by side
- On medium screens (tablets), the navigation should remain horizontal but with adjusted spacing and possibly font size
- On small screens (mobile), the navigation should become a vertical list OR transform into a "hamburger menu" that expands when clicked

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Navigation</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <div class="logo">My Website</div>
        <nav class="nav-menu">
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Portfolio</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
        <!-- Uncomment for hamburger menu implementation
        <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>
        -->
    </header>
    <main>
        <h1>Welcome to My Responsive Website</h1>
        <p>This page demonstrates responsive design principles.</p>
    </main>
</body>
</html>
```

## Task 2: Create a Responsive Grid Layout

Create a responsive grid layout with cards that adjust based on screen size:
- Large screens: 4 cards per row
- Medium screens: 2 cards per row
- Small screens: 1 card per row

Each card should contain an image, heading, and short text.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Grid</title>
    <link rel="stylesheet" href="grid.css">
</head>
<body>
    <header>
        <h1>Responsive Grid Layout</h1>
    </header>
    <main>
        <div class="grid-container">
            <!-- You'll need to create 8 of these card divs -->
            <div class="card">
                <img src="https://via.placeholder.com/300x200" alt="Placeholder image">
                <h2>Card Title 1</h2>
                <p>This is the description for card 1. It contains text that describes the card content.</p>
            </div>
            <!-- Repeat for cards 2-8 -->
        </div>
    </main>
</body>
</html>
```

## Task 3: Responsive Typography and Images

Create a blog post page with responsive typography and images:

1. Font sizes should scale proportionally across different device sizes
2. Images should be responsive and never overflow their containers
3. Create at least two breakpoints to adjust layout and typography
4. Implement a "reading width" that's comfortable on large screens (not full-width text)
5. Include proper spacing that adjusts for different screen sizes

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Blog Post</title>
    <link rel="stylesheet" href="blog.css">
</head>
<body>
    <header>
        <h1>My Blog</h1>
    </header>
    <main class="blog-post">
        <article>
            <h2>Understanding Responsive Design</h2>
            <div class="post-meta">Posted on June 15, 2023 by Admin</div>
            
            <figure class="featured-image">
                <img src="https://via.placeholder.com/1200x800" alt="Responsive Design Concept">
                <figcaption>A visual representation of responsive design across devices</figcaption>
            </figure>
            
            <p class="lead">Responsive web design is an approach that makes web pages render well on a variety of devices and window or screen sizes. Recent work also considers the viewer proximity as part of the viewing context as an extension for RWD.</p>
            
            <h3>The Principles of Responsive Design</h3>
            <p>The main principles of responsive design include fluid grids, flexible images, and media queries. Together, these principles allow a webpage to adapt to any screen size, from desktop computers to smartphones.</p>
            
            <p>With fluid grids, page elements are sized in relative units like percentages rather than absolute units like pixels. This allows the layout to resize based on the screen size without creating fixed breakpoints.</p>
            
            <figure class="image-right">
                <img src="https://via.placeholder.com/600x400" alt="Mobile responsive design">
                <figcaption>Mobile-first approach</figcaption>
            </figure>
            
            <p>Flexible images are sized in relative units to prevent them from displaying outside their containing element. The most common approach is setting the CSS property max-width to 100%.</p>
            
            <p>Media queries allow developers to apply different styles based on the device's characteristics, most commonly the width of the browser. This enables completely different layouts on different screen sizes.</p>
            
            <h3>Mobile-First Approach</h3>
            <p>The mobile-first approach to responsive design starts with designing for the smallest screen size, then progressively enhancing the design for larger screens. This approach ensures that mobile users have all the necessary content and functionality.</p>
            
            <blockquote>
                "Mobile-first isn't just a trend; it's a reflection of how people are accessing the internet today."
            </blockquote>
            
            <p>By starting with mobile designs, designers are forced to prioritize content and focus on what's really important. This leads to cleaner, more focused designs across all screen sizes.</p>
            
            <h3>Testing Responsive Designs</h3>
            <p>Testing responsive designs across multiple devices and screen sizes is crucial for ensuring a good user experience. Browsers' developer tools offer device emulation features, but there's no substitute for testing on actual devices.</p>
            
            <p>Responsive design isn't just about making a site look good on different screen sizes; it's about creating an optimal experience regardless of how users access your content.</p>
        </article>
    </main>
    <footer>
        <p>&copy; 2023 My Blog. All rights reserved.</p>
    </footer>
</body>
</html>
```

## Task 4: Mobile-First Approach

Create a product landing page using a mobile-first approach:

1. Start by designing for mobile devices first
2. Use `min-width` media queries to enhance the design for larger screens
3. Include navigation, a hero section, product features, and a call to action
4. Implement at least three breakpoints (mobile, tablet, desktop)
5. Use relative units (rem, em, %, vw/vh) for sizing elements
6. Ensure all interactive elements are touch-friendly (adequately sized)

## Submission
Submit your HTML and CSS files for each task. Make sure to test your solutions in different browsers and at various screen sizes before submission.

## Bonus Challenge
Implement a fully responsive image gallery with the following features:
- A grid of thumbnails that adjusts based on screen size
- Lightbox functionality when an image is clicked (the image appears larger in an overlay)
- Touch-friendly navigation for the lightbox gallery on mobile devices
- Optimized image loading (hint: look up the `srcset` attribute for responsive images)