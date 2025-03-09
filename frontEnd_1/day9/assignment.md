# Day 9 Assignment: Create an Interactive Image Gallery

## Objective
Build an interactive image gallery with DOM manipulation and events that showcases different interaction techniques.

## Requirements

### Core Requirements
1. Create an image gallery that displays at least 6 images in a grid layout
2. Implement the following features using JavaScript DOM manipulation and events:
   - Clicking an image opens a modal with an enlarged version of the image
   - Modal includes navigation arrows to browse through the gallery
   - Modal can be closed by clicking outside, pressing ESC key, or clicking a close button
   - Implement a lightbox effect (darkened background when modal is open)
   - Add a caption to each image in the modal view

### Advanced Features (implement at least 2)
1. Image filtering based on categories or tags
2. Lazy loading of images (load images as they come into the viewport)
3. Smooth transitions/animations between images in the modal
4. Touch swipe support for mobile devices
5. Keyboard navigation (left/right arrow keys to navigate)
6. Zoom functionality on the enlarged images
7. Slideshow mode with play/pause controls
8. Image favorites system (allow users to mark and filter favorite images)

## Files to Submit
1. `index.html` - The HTML structure of your gallery
2. `styles.css` - Styling for your gallery
3. `gallery.js` - All your JavaScript code for DOM manipulation and events
4. A `README.md` file explaining your approach and any additional features

## Technical Requirements
1. Use only vanilla JavaScript (no libraries or frameworks like jQuery)
2. Follow best practices for DOM manipulation (minimize direct manipulations)
3. Use event delegation where appropriate
4. Ensure proper event cleanup to avoid memory leaks
5. Use semantic HTML elements and ensure accessibility
6. Make your gallery responsive (works well on different screen sizes)

## Detailed Tasks

### HTML Structure
1. Create a container for the gallery grid
2. Create individual image items with appropriate HTML structure
3. Create a modal container with all necessary elements:
   - Close button
   - Image container
   - Navigation buttons
   - Caption area

### CSS Styling
1. Style the gallery grid (responsive, visually appealing)
2. Style the modal and overlay
3. Style navigation and control elements
4. Add transitions and animations where appropriate
5. Make sure the design works on mobile devices

### JavaScript Functionality
1. Select DOM elements you'll need to manipulate
2. Create functions to:
   - Open/close the modal
   - Navigate between images
   - Update the modal content (image, caption)
   - Implement keyboard controls
   - Handle any additional features you've chosen

## Example HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Image Gallery</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Image Gallery Grid -->
    <div class="gallery-container">
        <div class="gallery">
            <div class="gallery-item" data-category="nature">
                <img src="images/image1.jpg" alt="Nature scene" data-index="0">
            </div>
            <!-- More gallery items... -->
        </div>
    </div>

    <!-- Modal/Lightbox -->
    <div class="modal">
        <span class="close">&times;</span>
        <div class="modal-content">
            <img id="modal-image" src="" alt="">
            <div class="modal-caption"></div>
            <a class="prev">&#10094;</a>
            <a class="next">&#10095;</a>
        </div>
    </div>

    <script src="gallery.js"></script>
</body>
</html>
```

## Evaluation Criteria
1. Code quality and organization
2. Correctness of implementation
3. Visual design and user experience
4. Responsiveness and accessibility
5. Implementation of advanced features

## Bonus Challenges
1. Implement a masonry layout for the gallery
2. Add drag-and-drop sorting of images
3. Create a fullscreen mode for the gallery
4. Add image upload functionality for users to add their own images
5. Implement a gallery state that persists after page reload (using localStorage)

## Resources
* [MDN: Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
* [MDN: Event reference](https://developer.mozilla.org/en-US/docs/Web/Events)
* [CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
* [JavaScript: The Definitive Guide - Chapter on DOM Scripting](https://www.oreilly.com/library/view/javascript-the-definitive/9781449393854/)
* [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) (for lazy loading)