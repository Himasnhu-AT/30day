# Day 10 Assignment: Build a Calculator Library

## Objective
Create a comprehensive calculator library using different types of JavaScript functions and demonstrate proper scope management.

## Requirements

### Core Requirements
1. Create a JavaScript library called `calculatorLib` that includes the following calculator functionality:
   - Basic operations: add, subtract, multiply, divide
   - Advanced operations: power, square root, percentage, factorial
   - Memory functions: store, recall, clear memory
   - History tracking: record calculations, retrieve history, clear history

2. Implement the following function types within your library:
   - Function declarations
   - Function expressions
   - Arrow functions
   - Constructor functions
   - Immediately Invoked Function Expressions (IIFE)

3. Demonstrate proper scope management:
   - Use closures to protect private data
   - Implement module pattern
   - Properly handle variable scope (global vs local)
   - Use lexical environment appropriately

### Implementation Details

1. Your calculator library should be structured as follows:
   ```javascript
   const calculatorLib = (function() {
       // Private variables (using closure)
       let memory = 0;
       let history = [];
       
       // Return public API
       return {
         // Basic operations (implement as function declarations)
         add: function(a, b) { /* your code */ },
         subtract: /* your code */,
         multiply: /* your code */,
         divide: /* your code */,
         
         // Advanced operations (implement as arrow functions)
         power: /* your code */,
         squareRoot: /* your code */,
         percentage: /* your code */,
         factorial: /* your code */,
         
         // Memory functions (implement as function expressions)
         memory: {
           store: /* your code */,
           recall: /* your code */,
           clear: /* your code */
         },
         
         // History functions
         history: {
           add: /* your code */,
           get: /* your code */,
           clear: /* your code */
         },
         
         // Calculator constructor (for creating calculator instances)
         Calculator: /* implement as constructor function */
       };
   })();
   ```

2. Create a separate test file that demonstrates the use of all functions in your library.

### Advanced Features (implement at least two)
1. Implement a scientific calculator with additional functions (sin, cos, tan, log)
2. Add support for working with different number bases (binary, octal, hexadecimal)
3. Implement a function to parse and evaluate mathematical expressions as strings (e.g., "2 + 3 * 4")
4. Create a custom error handling system for mathematical errors (division by zero, etc.)
5. Add a function that generates step-by-step solutions for complex calculations

## Files to Submit
1. `calculatorLib.js` - Your calculator library
2. `testCalculator.js` - Test file demonstrating usage of your library
3. `index.html` - A simple HTML file that incorporates your library
4. `README.md` - Documentation for your calculator library

## Evaluation Criteria
1. Correct implementation of the different function types
2. Proper scope management and closure usage
3. Functionality and correctness of calculator operations
4. Code organization and modularity
5. Documentation quality and test coverage

## Example Usage of Your Library

```javascript
// Basic operations
console.log(calculatorLib.add(5, 3));        // 8
console.log(calculatorLib.subtract(10, 4));  // 6
console.log(calculatorLib.multiply(3, 7));   // 21
console.log(calculatorLib.divide(20, 5));    // 4

// Advanced operations
console.log(calculatorLib.power(2, 3));      // 8
console.log(calculatorLib.squareRoot(16));   // 4
console.log(calculatorLib.percentage(50, 20)); // 10 (20% of 50)
console.log(calculatorLib.factorial(5));     // 120

// Memory operations
calculatorLib.memory.store(100);
console.log(calculatorLib.memory.recall());  // 100
calculatorLib.memory.clear();
console.log(calculatorLib.memory.recall());  // 0

// History operations
calculatorLib.history.add("5 + 3 = 8");
calculatorLib.history.add("10 - 4 = 6");
console.log(calculatorLib.history.get());    // ["5 + 3 = 8", "10 - 4 = 6"]
calculatorLib.history.clear();
console.log(calculatorLib.history.get());    // []

// Creating a calculator instance
const myCalculator = new calculatorLib.Calculator();
console.log(myCalculator.add(10, 20));       // 30
```

## Bonus Challenge
Create a simple web UI that uses your calculator library to provide a functioning calculator interface. This is not required but will help reinforce your understanding of DOM manipulation from previous lessons.

## Resources
- [MDN Web Docs: Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
- [MDN Web Docs: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [JavaScript.info: Functions](https://javascript.info/function-basics)
- [JavaScript.info: Function expressions](https://javascript.info/function-expressions)
- [JavaScript.info: Arrow functions](https://javascript.info/arrow-functions-basics)