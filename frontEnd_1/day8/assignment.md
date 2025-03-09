# Day 8 Assignment: Introduction to JavaScript

## Task 1: JavaScript Syntax and Basic Operations

Create a JavaScript file that demonstrates your understanding of basic JavaScript syntax and operations. Complete the following steps:

1. Create a new HTML file with appropriate structure
2. Link an external JavaScript file named `script.js`
3. In the JavaScript file:
   - Create variables using `let`, `const`, and `var` to understand their differences
   - Demonstrate all primitive data types (number, string, boolean, null, undefined, symbol, and BigInt)
   - Showcase arithmetic, assignment, comparison, and logical operators
   - Display the results in the browser console

Example starter template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Basics</title>
</head>
<body>
    <h1>Open the browser console to see results (F12 or Ctrl+Shift+I)</h1>
    
    <script src="script.js"></script>
</body>
</html>
```

## Task 2: Control Flow and Functions

Create a program that implements conditional statements and loops, and demonstrates functions. Your program should:

1. Create a function called `generateMultiplicationTable` that:
   - Takes two parameters: `number` and `limit`
   - Generates a multiplication table for the given number up to the limit
   - Returns the multiplication table as an array of strings (e.g. "5 x 1 = 5")

2. Create a function called `isPrime` that:
   - Takes a number as a parameter
   - Returns `true` if the number is prime, and `false` otherwise

3. Create a function called `processNumbers` that:
   - Takes an array of numbers as a parameter
   - Uses a loop to process each number
   - For each number, if it's prime, add it to a "primes" array
   - If the number is even, add it to an "evens" array
   - If the number is odd and not prime, add it to an "odds" array
   - Returns an object containing all three arrays

4. Demonstrate the use of the functions in the console

Example starter template:

```javascript
// Function to generate multiplication table
function generateMultiplicationTable(number, limit) {
    // Your code here
}

// Function to check if a number is prime
function isPrime(number) {
    // Your code here
}

// Function to process an array of numbers
function processNumbers(numbers) {
    // Your code here
}

// Test your functions
console.log(generateMultiplicationTable(5, 10));
console.log(isPrime(7));
console.log(isPrime(10));
console.log(processNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
```

## Task 3: DOM Manipulation

Create a simple interactive web page that demonstrates DOM manipulation. Your page should:

1. Have a form with:
   - A text input field for a task name
   - A button to add the task

2. Display a list of tasks:
   - Each task should have a delete button
   - Clicking on a task should toggle it as "completed" (strike-through)
   - Clicking the delete button should remove the task

3. Add some styling to make the page look presentable

Example starter template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task List</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 500px;
            margin: 0 auto;
            padding: 20px;
        }
        .completed {
            text-decoration: line-through;
            color: #888;
        }
        /* Add more styling as needed */
    </style>
</head>
<body>
    <h1>Task List</h1>
    
    <form id="task-form">
        <input type="text" id="task-input" placeholder="Add a new task" required>
        <button type="submit">Add Task</button>
    </form>
    
    <ul id="task-list">
        <!-- Tasks will be added here by JavaScript -->
    </ul>
    
    <script>
        // Your JavaScript code here
        
        // 1. Get references to DOM elements
        
        // 2. Add event listener to form submission
        
        // 3. Create function to add new tasks
        
        // 4. Create function to handle task completion
        
        // 5. Create function to handle task deletion
    </script>
</body>
</html>
```

## Task 4: Calculator Web Application

Create a basic calculator web application using HTML, CSS, and JavaScript. Your calculator should:

1. Have a display for showing input and results
2. Have buttons for:
   - Numbers 0-9
   - Basic operations (+, -, *, /)
   - Clear/reset (C)
   - Equals (=)
3. Implement the following functionality:
   - Users can input numbers by clicking buttons
   - Users can perform basic calculations
   - The display shows the current input and calculation results
   - Clear button resets the calculator
   - Handle errors such as division by zero

Example starter template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Calculator</title>
    <style>
        /* Add your CSS styling here */
        .calculator {
            width: 300px;
            margin: 0 auto;
            /* Add more styling */
        }
        
        .display {
            /* Style the display */
        }
        
        .buttons {
            /* Style the button container */
        }
        
        button {
            /* Style individual buttons */
        }
    </style>
</head>
<body>
    <div class="calculator">
        <div class="display" id="display">0</div>
        
        <div class="buttons">
            <!-- Add your calculator buttons here -->
            <!-- Example button layout:
            <button class="number" value="7">7</button>
            <button class="number" value="8">8</button>
            etc.
            <button class="operator" value="+">+</button>
            <button id="equals">=</button>
            <button id="clear">C</button>
            -->
        </div>
    </div>
    
    <script>
        // Your calculator JavaScript code goes here
        
        // 1. Get references to DOM elements
        
        // 2. Add event listeners to buttons
        
        // 3. Implement calculator logic
        
        // 4. Handle display updates
        
        // 5. Implement clear functionality
        
        // 6. Implement error handling
    </script>
</body>
</html>
```

## Submission

Submit all your completed files:
1. `basics.html` and `script.js` for Task 1
2. `control-flow.html` and `control-flow.js` for Task 2
3. `task-list.html` for Task 3
4. `calculator.html` for Task 4

Run the test case provided to verify your solutions meet the requirements.

## Bonus Challenge:

Create a more advanced version of the calculator that includes:
- Support for parentheses
- Scientific functions (square, square root, etc.)
- Memory functions (MS, MR, M+, M-)
- History of calculations
- Keyboard support (users can type calculations)

This will stretch your JavaScript skills and help you apply what you've learned about DOM manipulation in a more complex scenario.