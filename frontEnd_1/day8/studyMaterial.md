# Day 8: Introduction to JavaScript

## Learning Objectives
By the end of this day, you should understand:
- What JavaScript is and its role in web development
- Basic JavaScript syntax and structure
- Variables, data types, and operators
- Control structures (conditionals and loops)
- Functions and scope
- Basic DOM manipulation

## What is JavaScript?

JavaScript is a high-level, interpreted programming language that is one of the core technologies of the World Wide Web. Unlike HTML (which structures content) and CSS (which styles content), JavaScript allows you to create dynamic and interactive web pages.

### Key Characteristics of JavaScript

- **Client-side scripting language**: Runs in the user's browser
- **Interpreted**: Code is executed line by line, not compiled in advance
- **Dynamic typing**: Variables can hold different types of values during execution
- **Prototype-based object-oriented**: Uses prototypes instead of classes (though ES6+ introduces class syntax)
- **First-class functions**: Functions can be passed as arguments, returned from other functions, and assigned to variables
- **Event-driven**: Can respond to user actions like clicks, keystrokes, and mouse movements

### Role in Web Development

JavaScript enables web pages to:
- Respond to user interactions
- Update content dynamically without requiring page reloads
- Validate form inputs before submission
- Create animations and visual effects
- Store data on the client side
- Communicate with servers (AJAX)
- Build full-scale web applications

## Getting Started with JavaScript

### Including JavaScript in HTML

There are three ways to include JavaScript in your web page:

1. **Inline JavaScript** (not recommended for anything but quick testing):

```html
<button onclick="alert('Hello, World!')">Click me</button>
```

2. **Internal JavaScript** (using `<script>` tags in the HTML file):

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
    <script>
        function sayHello() {
            alert('Hello, World!');
        }
    </script>
</head>
<body>
    <button onclick="sayHello()">Click me</button>
</body>
</html>
```

3. **External JavaScript** (recommended for better organization):

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
    <script src="script.js"></script>
    <!-- Alternatively, place scripts at the end of the body for better performance -->
</head>
<body>
    <button onclick="sayHello()">Click me</button>
    
    <!-- Sometimes better to place scripts here -->
    <!-- <script src="script.js"></script> -->
</body>
</html>
```

In an external file named `script.js`:
```javascript
function sayHello() {
    alert('Hello, World!');
}
```

### The `defer` and `async` Attributes

When loading external scripts, you can use these attributes to control how scripts are loaded and executed:

```html
<!-- Download in parallel, but execute after HTML parsing is complete -->
<script src="script.js" defer></script>

<!-- Download in parallel, execute as soon as possible -->
<script src="script.js" async></script>
```

### Using the Browser Console

The browser console is a powerful tool for testing JavaScript and debugging:

1. Open Developer Tools:
   - Chrome/Edge: F12 or Ctrl+Shift+I (Windows/Linux) or Cmd+Option+I (Mac)
   - Firefox: F12 or Ctrl+Shift+I (Windows/Linux) or Cmd+Option+I (Mac)
   - Safari: Cmd+Option+I

2. Go to the "Console" tab

You can directly type JavaScript commands in the console:

```javascript
console.log("Hello, World!"); // Outputs text to the console
```

## JavaScript Syntax Basics

### Comments

```javascript
// This is a single-line comment

/* This is a 
   multi-line comment */
```

### Statements and Semicolons

JavaScript statements are separated by semicolons, though they're often optional due to automatic semicolon insertion:

```javascript
console.log("Hello"); console.log("World");

// Better formatted as:
console.log("Hello");
console.log("World");
```

### Case Sensitivity

JavaScript is case-sensitive. `variable`, `Variable`, and `VARIABLE` are three different variables.

### White Space and Line Breaks

JavaScript ignores extra white spaces and line breaks in your code:

```javascript
let x = 10;

// Same as:
let x=10;
```

## Variables and Data Types

### Declaring Variables

There are three ways to declare variables in JavaScript:

```javascript
var oldWay = "I'm the old way"; // Function-scoped, avoid using
let modern = "I'm block-scoped"; // Introduced in ES6, preferred
const constant = "I cannot be reassigned"; // Constant value, also block-scoped
```

### Naming Rules for Variables

- Can contain letters, digits, underscores, and dollar signs
- Must begin with a letter, underscore (_), or dollar sign ($)
- Names are case-sensitive
- Cannot use reserved words like `let`, `class`, `return`, etc.
- Should use camelCase by convention (e.g., `firstName`, not `firstname`)

### Data Types

JavaScript has seven primitive data types:

1. **Number**: Represents both integer and floating-point numbers
```javascript
let integer = 42;
let float = 3.14;
let exponential = 2.5e5; // 250000
let binary = 0b1010; // 10 in decimal
let octal = 0o744; // 484 in decimal
let hex = 0xFF; // 255 in decimal
let infinity = Infinity;
let notANumber = NaN; // Result of invalid math operations
```

2. **String**: Sequences of characters
```javascript
let singleQuoted = 'Hello';
let doubleQuoted = "World";
let backticks = `Hello ${singleQuoted}`; // Template literals with variable interpolation
let multiLine = `This is a
multi-line string`;
```

3. **Boolean**: `true` or `false`
```javascript
let isActive = true;
let isCompleted = false;
```

4. **Undefined**: Variable declared but not assigned a value
```javascript
let notDefined;
console.log(notDefined); // undefined
```

5. **Null**: Represents the intentional absence of any value
```javascript
let empty = null;
```

6. **Symbol**: Unique and immutable primitive values (ES6)
```javascript
const uniqueKey = Symbol('description');
```

7. **BigInt**: For integers of arbitrary length (ES2020)
```javascript
const bigNumber = 1234567890123456789012345678901234567890n;
```

JavaScript also has one complex data type:

8. **Object**: Collection of key-value pairs
```javascript
let person = {
    firstName: "John",
    lastName: "Doe",
    age: 30
};
```

### Checking Types

The `typeof` operator returns a string indicating the type of an operand:

```javascript
console.log(typeof 42); // "number"
console.log(typeof "Hello"); // "string"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" (this is a known JavaScript quirk)
console.log(typeof Symbol('unique')); // "symbol"
console.log(typeof {}); // "object"
console.log(typeof []); // "object" (arrays are objects in JavaScript)
console.log(typeof function() {}); // "function"
```

### Type Conversion

JavaScript performs automatic type conversion (coercion) when needed:

```javascript
console.log("5" + 2); // "52" (string concatenation)
console.log("5" - 2); // 3 (numeric subtraction - string is converted to number)
console.log("5" * "2"); // 10 (both are converted to numbers)
```

Explicit conversion:

```javascript
Number("5"); // 5
String(5); // "5"
Boolean(0); // false (0, "", null, undefined, and NaN convert to false)
Boolean(1); // true (all other values convert to true)
```

## Operators in JavaScript

### Arithmetic Operators

```javascript
let a = 5;
let b = 2;

console.log(a + b);  // 7 (Addition)
console.log(a - b);  // 3 (Subtraction)
console.log(a * b);  // 10 (Multiplication)
console.log(a / b);  // 2.5 (Division)
console.log(a % b);  // 1 (Modulus - remainder)
console.log(a ** b); // 25 (Exponentiation - a to the power of b)

// Increment and Decrement
let c = 5;
console.log(c++); // 5 (post-increment: returns, then increments)
console.log(c);   // 6
console.log(++c); // 7 (pre-increment: increments, then returns)

let d = 5;
console.log(d--); // 5 (post-decrement)
console.log(d);   // 4
console.log(--d); // 3 (pre-decrement)
```

### Assignment Operators

```javascript
let x = 10;      // Basic assignment
x += 5;          // x = x + 5
x -= 3;          // x = x - 3
x *= 2;          // x = x * 2
x /= 4;          // x = x / 4
x %= 3;          // x = x % 3
x **= 2;         // x = x ** 2
```

### Comparison Operators

```javascript
let a = 5;
let b = "5";

console.log(a == b);   // true (equal value, but not equal type)
console.log(a === b);  // false (strict equality: equal value and equal type)
console.log(a != b);   // false (not equal value)
console.log(a !== b);  // true (strict inequality: not equal value or not equal type)
console.log(a > 3);    // true (greater than)
console.log(a < 10);   // true (less than)
console.log(a >= 5);   // true (greater than or equal to)
console.log(a <= 5);   // true (less than or equal to)
```

### Logical Operators

```javascript
let x = 5;
let y = 10;

// AND operator: returns true if both operands are true
console.log(x > 3 && y < 15); // true

// OR operator: returns true if at least one operand is true
console.log(x > 7 || y < 15); // true

// NOT operator: returns the opposite Boolean value
console.log(!(x > 3)); // false
```

### String Operators

```javascript
// Concatenation
let firstName = "John";
let lastName = "Doe";
let fullName = firstName + " " + lastName; // "John Doe"

// Template literals (ES6)
let greeting = `Hello, ${firstName} ${lastName}!`; // "Hello, John Doe!"
```

### Ternary Operator

```javascript
let age = 20;
let status = (age >= 18) ? "Adult" : "Minor";
console.log(status); // "Adult"
```

### Nullish Coalescing Operator (ES2020)

Returns the right-hand operand when the left-hand operand is `null` or `undefined`:

```javascript
let user = null;
let defaultUser = "Guest";
console.log(user ?? defaultUser); // "Guest"

let username = "";
console.log(username ?? defaultUser); // "" (empty string is not null or undefined)
```

## Control Structures

### Conditional Statements

#### if, else if, else

```javascript
let hour = new Date().getHours();

if (hour < 12) {
    console.log("Good morning!");
} else if (hour < 18) {
    console.log("Good afternoon!");
} else {
    console.log("Good evening!");
}
```

#### switch

```javascript
let day = new Date().getDay();
let dayName;

switch (day) {
    case 0:
        dayName = "Sunday";
        break;
    case 1:
        dayName = "Monday";
        break;
    case 2:
        dayName = "Tuesday";
        break;
    case 3:
        dayName = "Wednesday";
        break;
    case 4:
        dayName = "Thursday";
        break;
    case 5:
        dayName = "Friday";
        break;
    case 6:
        dayName = "Saturday";
        break;
    default:
        dayName = "Unknown";
}

console.log(`Today is ${dayName}`);
```

### Loops

#### for

```javascript
// Basic for loop
for (let i = 0; i < 5; i++) {
    console.log(i); // 0, 1, 2, 3, 4
}

// Loop through an array
let fruits = ["Apple", "Banana", "Cherry"];
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}
```

#### for...in (for object properties)

```javascript
let person = {
    firstName: "John",
    lastName: "Doe",
    age: 30
};

for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}
```

#### for...of (for iterable objects like arrays)

```javascript
let fruits = ["Apple", "Banana", "Cherry"];

for (let fruit of fruits) {
    console.log(fruit);
}
```

#### while

```javascript
let i = 0;
while (i < 5) {
    console.log(i); // 0, 1, 2, 3, 4
    i++;
}
```

#### do...while

```javascript
let i = 0;
do {
    console.log(i); // 0, 1, 2, 3, 4
    i++;
} while (i < 5);
```

### Break and Continue

```javascript
// break: exits the loop
for (let i = 0; i < 10; i++) {
    if (i === 5) break;
    console.log(i); // 0, 1, 2, 3, 4
}

// continue: skips the current iteration
for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) continue;
    console.log(i); // 1, 3, 5, 7, 9
}
```

## Functions

### Function Declarations

```javascript
// Basic function
function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet("Alice")); // "Hello, Alice!"

// Function with default parameters (ES6)
function greetWithDefault(name = "Guest") {
    return `Hello, ${name}!`;
}

console.log(greetWithDefault()); // "Hello, Guest!"
```

### Function Expressions

```javascript
// Anonymous function expression
let greet = function(name) {
    return `Hello, ${name}!`;
};

// Named function expression
let factorial = function fact(n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
};

console.log(factorial(5)); // 120
```

### Arrow Functions (ES6)

```javascript
// Concise arrow function
let add = (a, b) => a + b;
console.log(add(5, 3)); // 8

// Multi-line arrow function with explicit return
let multiply = (a, b) => {
    let result = a * b;
    return result;
};
console.log(multiply(5, 3)); // 15
```

### Function Scope

Variables defined inside a function cannot be accessed from outside:

```javascript
function myFunction() {
    let localVar = "I'm local!";
    console.log(localVar); // "I'm local!"
}

myFunction();
// console.log(localVar); // ReferenceError: localVar is not defined
```

Functions can access variables defined in parent scopes:

```javascript
let globalVar = "I'm global!";

function myFunction() {
    console.log(globalVar); // "I'm global!"
}

myFunction();
```

## Basic DOM Manipulation

The Document Object Model (DOM) is a programming interface for web documents. It represents the page as nodes and objects that can be manipulated with JavaScript.

### Selecting DOM Elements

```javascript
// By ID
let elementById = document.getElementById("myId");

// By class name (returns a live HTMLCollection)
let elementsByClass = document.getElementsByClassName("myClass");

// By tag name (returns a live HTMLCollection)
let elementsByTag = document.getElementsByTagName("div");

// Using CSS selectors (returns the first matching element)
let elementBySelector = document.querySelector(".myClass");

// Using CSS selectors (returns all matching elements as a static NodeList)
let elementsBySelectorAll = document.querySelectorAll(".myClass");
```

### Modifying DOM Elements

```javascript
// Changing text content
element.textContent = "New text";

// Changing HTML content (be careful with this due to XSS security concerns)
element.innerHTML = "<span>New HTML</span>";

// Changing attributes
element.setAttribute("href", "https://example.com");
element.id = "newId";
element.className = "newClass";

// Changing styles
element.style.color = "red";
element.style.fontWeight = "bold";
element.style.backgroundColor = "lightblue";
```

### Creating and Appending Elements

```javascript
// Create a new element
let newElement = document.createElement("div");

// Add content to the element
newElement.textContent = "I'm a new element!";

// Append it to an existing element
document.body.appendChild(newElement);

// Insert before a specific element
let referenceElement = document.getElementById("reference");
document.body.insertBefore(newElement, referenceElement);

// Modern methods (not supported in older browsers)
referenceElement.before(newElement); // Insert before
referenceElement.after(newElement);  // Insert after
referenceElement.prepend(newElement); // Insert as first child
referenceElement.append(newElement);  // Insert as last child
```

### Removing Elements

```javascript
// Remove an element
element.remove(); // Modern approach

// Traditional approach
element.parentNode.removeChild(element);
```

### Event Handling

```javascript
// Using addEventListener (preferred method)
let button = document.querySelector("#myButton");

button.addEventListener("click", function(event) {
    console.log("Button clicked!");
});

// Using event object
button.addEventListener("click", function(event) {
    console.log("Clicked at coordinates: " + event.clientX + ", " + event.clientY);
    event.preventDefault(); // Prevent default behavior
    event.stopPropagation(); // Stop event bubbling
});

// Common events:
// - click: mouse click
// - dblclick: double click
// - mousedown/mouseup: mouse button press/release
// - mouseover/mouseout: mouse enters/leaves element
// - keydown/keyup: keyboard key press/release
// - submit: form submission
// - load: page or resource loaded
// - resize: window resize
// - scroll: element scrolling
```

## Best Practices in JavaScript

1. **Use strict mode** to catch common coding mistakes:
```javascript
"use strict";
// Your code here
```

2. **Avoid global variables** to prevent naming conflicts:
```javascript
// Bad practice
globalVariable = "I'm global";

// Good practice
let localVariable = "I'm local";
```

3. **Use === instead of ==** for more predictable comparisons:
```javascript
// Not recommended
if (x == "5") { /*...*/ }

// Recommended
if (x === "5") { /*...*/ }
```

4. **Use meaningful variable and function names**:
```javascript
// Not descriptive
let x = getItems();

// Descriptive
let userProfiles = getUserProfiles();
```

5. **Comment your code** but focus on why, not what:
```javascript
// Bad comment
// Increment i by 1
i++;

// Good comment
// Skip even numbers to save processing time
if (i % 2 !== 0) {
    processItem(items[i]);
}
```

## Resources for Further Learning

- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Comprehensive reference
- [JavaScript.info](https://javascript.info/) - Modern JavaScript tutorial
- [Eloquent JavaScript](https://eloquentjavascript.net/) - Free book about JavaScript
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS) - Book series on JavaScript fundamentals
- [JavaScript30](https://javascript30.com/) - 30-day vanilla JavaScript coding challenge