# Day 9: JavaScript DOM Manipulation and Events

## Learning Objectives
By the end of this day, you should understand:
- How to access and manipulate the DOM in greater depth
- How to create, modify, and delete DOM elements
- JavaScript events and event handling
- Event propagation, bubbling, and capturing
- Event delegation pattern
- Creating interactive web components

## Understanding the Document Object Model (DOM)

The Document Object Model (DOM) is a programming interface for web documents. It represents the page as a tree of objects that can be manipulated with JavaScript.

### DOM Tree Structure

The DOM represents an HTML document as a hierarchy of nodes:
- Document node: The root node of the DOM tree
- Element nodes: HTML elements like `<div>`, `<p>`, etc.
- Text nodes: Text content within elements
- Attribute nodes: Element attributes like `class`, `id`, etc.
- Comment nodes: HTML comments

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1 id="main-title">Hello World</h1>
    <p>This is a paragraph.</p>
    <!-- This is a comment -->
</body>
</html>
```

In this example:
- `document` is the document node
- `<html>`, `<head>`, `<title>`, `<body>`, `<h1>`, and `<p>` are element nodes
- The text inside `<title>`, `<h1>`, and `<p>` are text nodes
- `id="main-title"` is an attribute node
- `<!-- This is a comment -->` is a comment node

## Advanced DOM Selection Methods

### querySelector and querySelectorAll

These methods use CSS selectors to select elements:

```javascript
// Select the first element that matches the CSS selector
let element = document.querySelector('.className');

// Select all elements that match the CSS selector (returns a NodeList)
let elements = document.querySelectorAll('p.intro');

// Combining selectors
let specificElement = document.querySelector('div.container > p:first-child');
```

### Traversing the DOM

Navigate between DOM nodes using relationships:

```javascript
// Parent node
let parent = element.parentNode; // or element.parentElement

// Child nodes
let children = element.childNodes; // All child nodes including text and comment nodes
let elementChildren = element.children; // Only element nodes

// First and last child
let firstChild = element.firstChild; // Might be a text node
let firstElementChild = element.firstElementChild; // First element child
let lastChild = element.lastChild;
let lastElementChild = element.lastElementChild;

// Siblings
let nextSibling = element.nextSibling; // Might be a text node
let nextElementSibling = element.nextElementSibling;
let previousSibling = element.previousSibling;
let previousElementSibling = element.previousElementSibling;
```

### Testing Relationships

```javascript
// Check if an element contains another element
let contains = parentElement.contains(childElement); // true if childElement is inside parentElement

// Check if an element matches a CSS selector
let matches = element.matches('.someClass'); // true if element has class "someClass"

// Get the closest ancestor that matches a selector
let closestAncestor = element.closest('.container');
```

## Creating and Modifying DOM Elements

### Creating Elements

```javascript
// Create a new element
let newDiv = document.createElement('div');

// Create a text node
let newText = document.createTextNode('Hello, world!');

// Create a comment
let newComment = document.createComment('This is a comment');

// Create a document fragment (a lightweight container for nodes)
let fragment = document.createDocumentFragment();
```

### Cloning Elements

```javascript
// Clone an element (false: don't clone children, true: clone children too)
let clone = element.cloneNode(false); // Shallow clone
let deepClone = element.cloneNode(true); // Deep clone
```

### Adding Elements to the DOM

```javascript
// Append a node as the last child
parent.appendChild(newElement);

// Insert a node before a reference node
parent.insertBefore(newElement, referenceElement);

// Modern methods (not supported in older browsers)
parent.append(newElement); // Insert at the end (can append multiple nodes)
parent.prepend(newElement); // Insert at the beginning
referenceElement.before(newElement); // Insert before the reference element
referenceElement.after(newElement); // Insert after the reference element
```

### Replacing and Removing Elements

```javascript
// Replace one node with another
parent.replaceChild(newElement, oldElement);

// Modern method
oldElement.replaceWith(newElement);

// Remove a node
parent.removeChild(element);

// Modern method
element.remove();
```

### Working with Element Content

```javascript
// Set or get text content (safer, prevents XSS attacks)
element.textContent = 'New text content';
let text = element.textContent;

// Set or get HTML content (caution: potential XSS risk)
element.innerHTML = '<span>New HTML content</span>';
let html = element.innerHTML;

// Get only the text visible to the user (excludes hidden elements)
let visibleText = element.innerText;

// Set or get the HTML including the element itself
element.outerHTML = '<div class="new">Replace completely</div>';
let outerHtml = element.outerHTML;
```

### Working with Attributes

```javascript
// Check if an element has an attribute
let hasAttr = element.hasAttribute('class');

// Get an attribute value
let value = element.getAttribute('class');

// Set an attribute
element.setAttribute('class', 'new-class');

// Remove an attribute
element.removeAttribute('class');

// Get all attributes
let attributes = element.attributes; // Returns a NamedNodeMap

// Data attributes
let dataValue = element.dataset.userInfo; // Gets the value of data-user-info attribute
element.dataset.userInfo = 'new value'; // Sets the value of data-user-info attribute
```

### Working with Classes

```javascript
// Add, remove, toggle, and check classes
element.classList.add('new-class');
element.classList.remove('old-class');
element.classList.toggle('active'); // Add if missing, remove if present
let hasClass = element.classList.contains('active');
element.classList.replace('old-class', 'new-class');

// Multiple operations
element.classList.add('class1', 'class2', 'class3');
```

### Working with Styles

```javascript
// Inline styles
element.style.color = 'red';
element.style.backgroundColor = 'lightblue'; // Note camelCase for CSS properties
element.style.cssText = 'color: red; background-color: lightblue;'; // Set multiple styles

// Get computed style (actual applied styles)
let computedStyle = window.getComputedStyle(element);
let color = computedStyle.color;
```

## JavaScript Events and Event Handling

Events are signals that something has happened in the browser, such as a user clicking, a page loading, or input being changed.

### Event Types

#### Mouse Events
- `click`: Click on an element
- `dblclick`: Double-click on an element
- `mousedown`: Mouse button is pressed
- `mouseup`: Mouse button is released
- `mousemove`: Mouse is moved
- `mouseover`: Mouse enters an element
- `mouseout`: Mouse leaves an element
- `mouseenter`: Mouse enters an element (doesn't bubble)
- `mouseleave`: Mouse leaves an element (doesn't bubble)
- `contextmenu`: Right-click to open context menu

#### Keyboard Events
- `keydown`: Key is pressed down
- `keyup`: Key is released
- `keypress`: Character key is pressed (deprecated)

#### Form Events
- `submit`: Form is submitted
- `reset`: Form is reset
- `change`: Form control value changes
- `input`: Value of input/textarea changes
- `focus`: Element receives focus
- `blur`: Element loses focus
- `select`: Text is selected in input/textarea

#### Document/Window Events
- `load`: Resource and dependencies finished loading
- `DOMContentLoaded`: HTML loaded and DOM tree built
- `resize`: Window size changes
- `scroll`: Element or window is scrolled
- `beforeunload`: Before user leaves the page
- `unload`: User leaves the page

#### Touch Events
- `touchstart`: Touch begins
- `touchmove`: Touch moves
- `touchend`: Touch ends
- `touchcancel`: Touch is interrupted

### Event Handlers

There are three ways to assign event handlers:

#### 1. HTML Attribute (not recommended)

```html
<button onclick="alert('Hello!')">Click me</button>
```

#### 2. DOM Property

```javascript
let button = document.querySelector('button');
button.onclick = function() {
    alert('Hello!');
};
```

Limitations:
- Can only assign one handler per event type
- Can't control the event phase (capturing vs bubbling)

#### 3. addEventListener (recommended)

```javascript
let button = document.querySelector('button');
button.addEventListener('click', function() {
    alert('Hello!');
});

// Remove event listener (must reference the same function)
function handleClick() {
    alert('Hello!');
}
button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick);
```

### The Event Object

When an event occurs, the browser creates an event object with details about the event and passes it to the event handler.

```javascript
button.addEventListener('click', function(event) {
    // The event object contains information about the event
    console.log(event.type); // "click"
    console.log(event.target); // The element that triggered the event
    console.log(event.currentTarget); // The element the listener is attached to
    console.log(event.clientX, event.clientY); // Mouse coordinates
});
```

### Common Event Object Properties and Methods

#### General Properties
- `event.type`: Type of event (e.g., "click", "keydown")
- `event.target`: Element that triggered the event
- `event.currentTarget`: Element that the event listener is attached to
- `event.timeStamp`: Time when the event was created
- `event.defaultPrevented`: Whether preventDefault() was called

#### Methods
- `event.preventDefault()`: Prevents the default browser action
- `event.stopPropagation()`: Stops the event from bubbling up the DOM
- `event.stopImmediatePropagation()`: Prevents other listeners of the same event from being called

#### Mouse Event Properties
- `event.clientX`, `event.clientY`: Mouse coordinates relative to the viewport
- `event.pageX`, `event.pageY`: Mouse coordinates relative to the document
- `event.screenX`, `event.screenY`: Mouse coordinates relative to the screen
- `event.button`: Which mouse button was pressed
- `event.altKey`, `event.ctrlKey`, `event.shiftKey`: Whether modifier keys were pressed

#### Keyboard Event Properties
- `event.key`: Value of the key pressed
- `event.code`: Physical key code
- `event.altKey`, `event.ctrlKey`, `event.shiftKey`: Whether modifier keys were pressed

### Event Propagation: Bubbling and Capturing

When an event occurs on an element that has parent elements, modern browsers run three phases:

1. **Capturing phase**: The event goes from the document's root down to the event target
2. **Target phase**: The event reaches the target element
3. **Bubbling phase**: The event bubbles up from the target to the root

```html
<div id="outer">
    <div id="inner">
        <button id="button">Click me</button>
    </div>
</div>
```

```javascript
// Third parameter of addEventListener:
// false (default) - listen during bubbling phase
// true - listen during capturing phase

// Bubbling example (default)
document.getElementById('outer').addEventListener('click', function(e) {
    console.log('Outer div clicked (bubbling)');
});

document.getElementById('inner').addEventListener('click', function(e) {
    console.log('Inner div clicked (bubbling)');
});

document.getElementById('button').addEventListener('click', function(e) {
    console.log('Button clicked (bubbling)');
});

// Capturing example
document.getElementById('outer').addEventListener('click', function(e) {
    console.log('Outer div clicked (capturing)');
}, true);

document.getElementById('inner').addEventListener('click', function(e) {
    console.log('Inner div clicked (capturing)');
}, true);

document.getElementById('button').addEventListener('click', function(e) {
    console.log('Button clicked (capturing)');
}, true);
```

When clicking the button, the output order will be:
1. Outer div clicked (capturing)
2. Inner div clicked (capturing)
3. Button clicked (capturing)
4. Button clicked (bubbling)
5. Inner div clicked (bubbling)
6. Outer div clicked (bubbling)

### Event Delegation

Event delegation is a technique of handling events at a higher level in the DOM than the element on which the event originated. It takes advantage of event bubbling.

Benefits:
- More efficient: attach one handler instead of many
- Works for dynamically added elements
- Less memory usage and better performance

```html
<ul id="todo-list">
    <li>Task 1</li>
    <li>Task 2</li>
    <li>Task 3</li>
    <!-- More items can be added dynamically -->
</ul>
```

```javascript
// Without event delegation (problematic for dynamic elements)
document.querySelectorAll('#todo-list li').forEach(function(item) {
    item.addEventListener('click', function() {
        this.classList.toggle('completed');
    });
});

// With event delegation (better approach)
document.getElementById('todo-list').addEventListener('click', function(e) {
    // Check if the clicked element is an li
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('completed');
    }
});
```

## Creating Interactive Web Components

Let's put all this knowledge together to create some interactive components.

### Modal Dialog

```html
<button id="open-modal">Open Modal</button>

<div id="modal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Modal Title</h2>
        <p>This is a modal dialog window.</p>
        <button id="modal-button">OK</button>
    </div>
</div>

<style>
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background-color: white;
    margin: 15% auto;
    padding: 20px;
    width: 70%;
    max-width: 500px;
    border-radius: 5px;
    position: relative;
}

.close {
    position: absolute;
    right: 10px;
    top: 5px;
    font-size: 24px;
    cursor: pointer;
}

.show-modal {
    display: block;
}
</style>
```

```javascript
const modal = document.getElementById('modal');
const openButton = document.getElementById('open-modal');
const closeButton = document.querySelector('.close');
const modalButton = document.getElementById('modal-button');

// Open the modal
openButton.addEventListener('click', () => {
    modal.classList.add('show-modal');
});

// Close the modal with the X button
closeButton.addEventListener('click', () => {
    modal.classList.remove('show-modal');
});

// Close the modal with the OK button
modalButton.addEventListener('click', () => {
    modal.classList.remove('show-modal');
});

// Close the modal if clicking outside the modal content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show-modal');
    }
});

// Close the modal with Escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show-modal')) {
        modal.classList.remove('show-modal');
    }
});
```

### Tabbed Interface

```html
<div class="tab-container">
    <div class="tabs">
        <button class="tab-button active" data-tab="tab1">Tab 1</button>
        <button class="tab-button" data-tab="tab2">Tab 2</button>
        <button class="tab-button" data-tab="tab3">Tab 3</button>
    </div>
    
    <div class="tab-content">
        <div id="tab1" class="tab-pane active">
            <h2>Tab 1 Content</h2>
            <p>This is the content for tab 1.</p>
        </div>
        <div id="tab2" class="tab-pane">
            <h2>Tab 2 Content</h2>
            <p>This is the content for tab 2.</p>
        </div>
        <div id="tab3" class="tab-pane">
            <h2>Tab 3 Content</h2>
            <p>This is the content for tab 3.</p>
        </div>
    </div>
</div>

<style>
.tabs {
    display: flex;
    border-bottom: 1px solid #ddd;
}

.tab-button {
    background: #f1f1f1;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px 5px 0 0;
    margin-right: 5px;
}

.tab-button.active {
    background: #fff;
    border: 1px solid #ddd;
    border-bottom: none;
}

.tab-pane {
    display: none;
    padding: 20px;
    border: 1px solid #ddd;
    border-top: none;
}

.tab-pane.active {
    display: block;
}
</style>
```

```javascript
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');

// Using event delegation for the tab buttons
document.querySelector('.tabs').addEventListener('click', (e) => {
    if (e.target.classList.contains('tab-button')) {
        // Get the tab ID from the data-tab attribute
        const tabId = e.target.dataset.tab;
        
        // Remove active class from all buttons and panes
        tabButtons.forEach(button => button.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to the clicked button and corresponding pane
        e.target.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    }
});
```

### Drag and Drop

```html
<div class="drop-zone">
    <div class="draggable" draggable="true">Item 1</div>
    <div class="draggable" draggable="true">Item 2</div>
    <div class="draggable" draggable="true">Item 3</div>
</div>

<div class="drop-zone"></div>

<style>
.drop-zone {
    width: 200px;
    height: 200px;
    border: 2px dashed #ccc;
    margin: 20px;
    padding: 10px;
    display: inline-block;
    vertical-align: top;
}

.draggable {
    padding: 10px;
    background-color: #f1f1f1;
    margin-bottom: 10px;
    cursor: move;
}

.draggable.dragging {
    opacity: 0.5;
}

.drop-zone.dragover {
    background-color: #e1e1e1;
}
</style>
```

```javascript
// Keep track of the dragged element
let draggedItem = null;

// Set up all draggable elements
document.querySelectorAll('.draggable').forEach(item => {
    // When drag starts
    item.addEventListener('dragstart', (e) => {
        draggedItem = item;
        setTimeout(() => {
            item.classList.add('dragging');
        }, 0);
    });
    
    // When drag ends
    item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
        draggedItem = null;
    });
});

// Set up drop zones
document.querySelectorAll('.drop-zone').forEach(zone => {
    // When a draggable element enters the zone
    zone.addEventListener('dragenter', (e) => {
        e.preventDefault(); // Necessary to allow drop
        zone.classList.add('dragover');
    });
    
    // When a draggable element is over the zone
    zone.addEventListener('dragover', (e) => {
        e.preventDefault(); // Necessary to allow drop
    });
    
    // When a draggable element leaves the zone
    zone.addEventListener('dragleave', () => {
        zone.classList.remove('dragover');
    });
    
    // When a draggable element is dropped in the zone
    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('dragover');
        
        // Append the dragged item to the drop zone
        if (draggedItem) {
            zone.appendChild(draggedItem);
        }
    });
});
```

### Custom Form Validation

```html
<form id="registration-form">
    <div class="form-group">
        <label for="username">Username (at least 3 characters):</label>
        <input type="text" id="username" name="username" required>
        <span class="error-message"></span>
    </div>
    
    <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <span class="error-message"></span>
    </div>
    
    <div class="form-group">
        <label for="password">Password (at least 8 characters):</label>
        <input type="password" id="password" name="password" required>
        <span class="error-message"></span>
    </div>
    
    <div class="form-group">
        <label for="confirm-password">Confirm Password:</label>
        <input type="password" id="confirm-password" name="confirm-password" required>
        <span class="error-message"></span>
    </div>
    
    <button type="submit">Register</button>
</form>

<style>
.form-group {
    margin-bottom: 15px;
}

input:invalid {
    border-color: #ff6b6b;
}

.error-message {
    color: #ff6b6b;
    font-size: 0.8em;
    margin-top: 5px;
    display: block;
}
</style>
```

```javascript
const form = document.getElementById('registration-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

// Show error message
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.textContent = message;
}

// Clear error message
function clearError(input) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.textContent = '';
}

// Validate username
username.addEventListener('input', () => {
    if (username.value.length < 3) {
        showError(username, 'Username must be at least 3 characters long');
    } else {
        clearError(username);
    }
});

// Validate email
email.addEventListener('input', () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        showError(email, 'Please enter a valid email address');
    } else {
        clearError(email);
    }
});

// Validate password
password.addEventListener('input', () => {
    if (password.value.length < 8) {
        showError(password, 'Password must be at least 8 characters long');
    } else {
        clearError(password);
    }
    
    // Check if confirm password matches
    if (confirmPassword.value && confirmPassword.value !== password.value) {
        showError(confirmPassword, 'Passwords do not match');
    } else if (confirmPassword.value) {
        clearError(confirmPassword);
    }
});

// Validate confirm password
confirmPassword.addEventListener('input', () => {
    if (confirmPassword.value !== password.value) {
        showError(confirmPassword, 'Passwords do not match');
    } else {
        clearError(confirmPassword);
    }
});

// Form submission
form.addEventListener('submit', (e) => {
    let isValid = true;
    
    // Check username
    if (username.value.length < 3) {
        showError(username, 'Username must be at least 3 characters long');
        isValid = false;
    }
    
    // Check email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Check password
    if (password.value.length < 8) {
        showError(password, 'Password must be at least 8 characters long');
        isValid = false;
    }
    
    // Check confirm password
    if (confirmPassword.value !== password.value) {
        showError(confirmPassword, 'Passwords do not match');
        isValid = false;
    }
    
    // Prevent form submission if validation fails
    if (!isValid) {
        e.preventDefault();
    } else {
        alert('Registration successful!');
    }
});
```

## Best Practices for DOM Manipulation and Events

1. **Minimize DOM manipulations**: DOM operations are expensive
   ```javascript
   // Bad: Multiple individual DOM operations
   for (let i = 0; i < 100; i++) {
       document.body.appendChild(document.createElement('div'));
   }
   
   // Good: Use DocumentFragment for batch operations
   const fragment = document.createDocumentFragment();
   for (let i = 0; i < 100; i++) {
       fragment.appendChild(document.createElement('div'));
   }
   document.body.appendChild(fragment);
   ```

2. **Cache DOM references**: Store references to elements you use frequently
   ```javascript
   // Bad: Querying the DOM repeatedly
   document.getElementById('myButton').addEventListener('click', () => {
       document.getElementById('myResult').textContent = 'Clicked';
   });
   
   // Good: Cache DOM references
   const myButton = document.getElementById('myButton');
   const myResult = document.getElementById('myResult');
   myButton.addEventListener('click', () => {
       myResult.textContent = 'Clicked';
   });
   ```

3. **Use event delegation**: Attach a single event listener to a parent element
   ```javascript
   // Bad: Attaching many event listeners
   document.querySelectorAll('button').forEach(button => {
       button.addEventListener('click', handleClick);
   });
   
   // Good: Use event delegation
   document.getElementById('buttonContainer').addEventListener('click', (e) => {
       if (e.target.tagName === 'BUTTON') {
           handleClick(e);
       }
   });
   ```

4. **Clean up event listeners**: Remove listeners when they're no longer needed
   ```javascript
   // Add named function as event listener
   function handleClick() {
       console.log('Clicked');
       // Clean up after it's no longer needed
       button.removeEventListener('click', handleClick);
   }
   
   const button = document.getElementById('myButton');
   button.addEventListener('click', handleClick);
   ```

5. **Use modern DOM methods**: They're often more efficient and readable
   ```javascript
   // Old way
   parent.insertBefore(newElement, referenceElement);
   
   // Modern way
   referenceElement.before(newElement);
   ```

6. **Avoid inline event handlers**: Separate JavaScript from HTML
   ```javascript
   // Bad: Inline event handler
   <button onclick="handleClick()">Click me</button>
   
   // Good: Unobtrusive JavaScript
   <button id="myButton">Click me</button>
   <script>
       document.getElementById('myButton').addEventListener('click', handleClick);
   </script>
   ```

7. **Use debouncing and throttling** for frequent events like scroll or resize
   ```javascript
   // Debounce function
   function debounce(func, delay) {
       let timeout;
       return function() {
           const context = this;
           const args = arguments;
           clearTimeout(timeout);
           timeout = setTimeout(() => func.apply(context, args), delay);
       };
   }
   
   // Usage
   window.addEventListener('resize', debounce(() => {
       console.log('Window resized');
   }, 200));
   ```

8. **Prefer classList over className**: It's more powerful and easier to use
   ```javascript
   // Less convenient
   element.className = element.className + ' new-class';
   
   // Better
   element.classList.add('new-class');
   ```

9. **Avoid unnecessary reflows and repaints**
   ```javascript
   // Bad: Causes multiple reflows
   const element = document.getElementById('myElement');
   element.style.width = '100px';
   element.style.height = '100px';
   element.style.margin = '10px';
   
   // Good: Batch style changes
   const element = document.getElementById('myElement');
   element.style.cssText = 'width: 100px; height: 100px; margin: 10px;';
   
   // Alternative good approach
   const element = document.getElementById('myElement');
   element.classList.add('my-style'); // Define all styles in CSS
   ```

10. **Use custom events** for component communication
    ```javascript
    // Create a custom event
    const customEvent = new CustomEvent('userLoggedIn', {
        detail: { userId: 123, username: 'john_doe' }
    });
    
    // Dispatch the event
    document.dispatchEvent(customEvent);
    
    // Listen for the custom event
    document.addEventListener('userLoggedIn', (e) => {
        console.log(`User ${e.detail.username} logged in`);
    });
    ```

## Resources for Further Learning

- [MDN Web Docs - Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [MDN Web Docs - Event reference](https://developer.mozilla.org/en-US/docs/Web/Events)
- [JavaScript.info - Document](https://javascript.info/document)
- [JavaScript.info - Events](https://javascript.info/events)
- [JavaScript.info - UI Events](https://javascript.info/event-details)