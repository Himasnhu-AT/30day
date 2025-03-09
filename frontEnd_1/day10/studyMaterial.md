# Day 10: Functions & Scope in JavaScript

## Learning Objectives
By the end of this day, you should understand:
- How to define and use different types of functions in JavaScript
- The concept of function scope and variable scope
- How closures work and their practical applications
- How to use the module pattern for organizing code
- The different ways of passing parameters to functions

## 1. Introduction to Functions in JavaScript

Functions are one of the fundamental building blocks in JavaScript. A function is a reusable block of code designed to perform a particular task. Functions allow you to structure your code, make it more readable, reusable, and maintainable.

### Why Functions Matter

- **Code Reusability**: Write once, use many times
- **Abstraction**: Hide complex implementation details
- **Organization**: Group related code together
- **Testing**: Isolate functionality for easier testing
- **Maintainability**: Update code in one place

## 2. Different Ways to Define Functions

JavaScript provides several ways to define functions, each with its own use cases and benefits.

### Function Declarations

The most common way to define a function is using a function declaration:

```javascript
function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet('Alex')); // "Hello, Alex!"
```

**Characteristics:**
- **Hoisted**: You can call the function before its declaration in the code
- **Has a name**: Useful for recursion and stack traces
- **Has a function context (`this`)**: The value of `this` depends on how the function is called

### Function Expressions

A function expression defines a function as part of a larger expression syntax (typically a variable assignment):

```javascript
const greet = function(name) {
    return `Hello, ${name}!`;
};

console.log(greet('Alex')); // "Hello, Alex!"
```

**Characteristics:**
- **Not hoisted**: You must define the function before calling it
- **Can be anonymous or named**: `const greet = function sayHello(name) {...}`
- **Has a function context (`this`)**: The value of `this` depends on how the function is called

### Arrow Functions (ES6)

Arrow functions provide a more concise syntax for writing functions:

```javascript
const greet = (name) => {
    return `Hello, ${name}!`;
};

// Even shorter for single expressions:
const greetConcise = name => `Hello, ${name}!`;

console.log(greetConcise('Alex')); // "Hello, Alex!"
```

**Characteristics:**
- **Not hoisted**: You must define the function before calling it
- **Always anonymous**: No name in the function definition
- **No `this` binding**: Inherits `this` from the surrounding code (lexical `this`)
- **No `arguments` object**: Use rest parameters instead
- **Cannot be used as constructors**: No `new` keyword

### Immediately Invoked Function Expressions (IIFE)

An IIFE is a function that is executed as soon as it is defined:

```javascript
(function() {
    const message = 'This runs immediately!';
    console.log(message);
})();

// With parameters:
(function(name) {
    console.log(`Hello, ${name}!`);
})('Alex');
```

**Characteristics:**
- **Executes immediately**: No need to call it separately
- **Creates a private scope**: Variables inside are not accessible from outside
- **Prevents pollution of global namespace**: Useful for isolating code

### Constructor Functions

Constructor functions are used with the `new` keyword to create object instances:

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.greet = function() {
        return `Hello, my name is ${this.name}`;
    };
}

const alex = new Person('Alex', 30);
console.log(alex.greet()); // "Hello, my name is Alex"
```

**Characteristics:**
- **Used with `new` keyword**: Creates new object instances
- **`this` refers to the new object**: When called with `new`
- **By convention, start with capital letter**: `Person` not `person`
- **Note**: ES6 classes provide a more modern alternative

### Method Shorthand (ES6)

In object literals, you can define methods using a shorthand syntax:

```javascript
const calculator = {
    add(a, b) {
        return a + b;
    },
    subtract(a, b) {
        return a - b;
    }
};

console.log(calculator.add(5, 3)); // 8
```

### Generator Functions (ES6)

Generator functions return an iterator that can be used to generate a sequence of values:

```javascript
function* countUp(max) {
    for (let i = 0; i < max; i++) {
        yield i;
    }
}

const counter = countUp(5);
console.log(counter.next().value); // 0
console.log(counter.next().value); // 1
console.log(counter.next().value); // 2
```

## 3. Function Parameters and Arguments

### Basic Parameters

```javascript
function add(a, b) {
    return a + b;
}

console.log(add(5, 3)); // 8
```

### Default Parameters (ES6)

```javascript
function greet(name = 'Guest') {
    return `Hello, ${name}!`;
}

console.log(greet()); // "Hello, Guest!"
console.log(greet('Alex')); // "Hello, Alex!"
```

### Rest Parameters (ES6)

Rest parameters allow you to represent an indefinite number of arguments as an array:

```javascript
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15
```

### The `arguments` Object (older approach)

In non-arrow functions, you can access all passed arguments via the `arguments` object:

```javascript
function oldSum() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}

console.log(oldSum(1, 2, 3, 4, 5)); // 15
```

### Parameter Destructuring (ES6)

```javascript
function displayPerson({ name, age }) {
    console.log(`Name: ${name}, Age: ${age}`);
}

const person = { name: 'Alex', age: 30, country: 'USA' };
displayPerson(person); // "Name: Alex, Age: 30"
```

## 4. Scope in JavaScript

Scope defines the accessibility of variables, functions, and objects during runtime.

### Global Scope

Variables declared outside any function or block have global scope:

```javascript
const globalVar = 'I am global';

function someFunction() {
    console.log(globalVar); // Accessible here
}

console.log(globalVar); // Accessible here too
```

### Function Scope (Local Scope)

Variables declared inside a function are only accessible within that function:

```javascript
function someFunction() {
    const localVar = 'I am local';
    console.log(localVar); // Accessible
}

someFunction();
// console.log(localVar); // Error: localVar is not defined
```

### Block Scope (ES6)

Variables declared with `let` and `const` inside a block (`{}`) are only accessible within that block:

```javascript
if (true) {
    let blockVar = 'I am block-scoped';
    const anotherBlockVar = 'Me too';
    var notBlockScoped = 'I am function-scoped';
    
    console.log(blockVar); // Accessible
}

// console.log(blockVar); // Error: blockVar is not defined
// console.log(anotherBlockVar); // Error: anotherBlockVar is not defined
console.log(notBlockScoped); // Accessible (var ignores block scope)
```

### Lexical Scope (Static Scope)

A function's access to variables is determined by its location in the source code:

```javascript
const outerVar = 'I am from outer scope';

function outerFunction() {
    const innerVar = 'I am from inner scope';
    
    function innerFunction() {
        console.log(outerVar); // Accessible
        console.log(innerVar); // Accessible
    }
    
    innerFunction();
}

outerFunction();
```

### Scope Chain

When a variable is used, JavaScript looks for it in the current scope, then in the outer scope, and so on up to the global scope:

```javascript
const globalVar = 'global';

function outerFunction() {
    const outerVar = 'outer';
    
    function innerFunction() {
        const innerVar = 'inner';
        
        console.log(innerVar); // Looks in innerFunction scope first
        console.log(outerVar); // Then looks in outerFunction scope
        console.log(globalVar); // Finally looks in global scope
    }
    
    innerFunction();
}

outerFunction();
```

## 5. Closures

A closure is a function that has access to variables from its outer (enclosing) scope, even after the outer function has finished executing.

### Basic Closure Example

```javascript
function createCounter() {
    let count = 0; // This variable is "captured" by the inner function
    
    return function() {
        count++; // Can access and modify count
        return count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

const counter2 = createCounter(); // A new closure with its own count
console.log(counter2()); // 1
```

### Practical Uses of Closures

#### 1. Data Encapsulation / Private Variables

```javascript
function createBankAccount(initialBalance) {
    let balance = initialBalance; // Private variable
    
    return {
        deposit: function(amount) {
            balance += amount;
            return balance;
        },
        withdraw: function(amount) {
            if (amount <= balance) {
                balance -= amount;
                return balance;
            } else {
                return "Insufficient funds";
            }
        },
        getBalance: function() {
            return balance;
        }
    };
}

const account = createBankAccount(100);
console.log(account.getBalance()); // 100
account.deposit(50);
console.log(account.getBalance()); // 150
account.withdraw(30);
console.log(account.getBalance()); // 120
// console.log(account.balance); // undefined - balance is private
```

#### 2. Function Factories

```javascript
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

#### 3. Maintaining State in Callbacks

```javascript
function handleButtonClick() {
    let clickCount = 0;
    
    return function() {
        clickCount++;
        console.log(`Button clicked ${clickCount} times`);
    };
}

const buttonHandler = handleButtonClick();
// Imagine these are button clicks:
buttonHandler(); // "Button clicked 1 times"
buttonHandler(); // "Button clicked 2 times"
buttonHandler(); // "Button clicked 3 times"
```

## 6. The Module Pattern

The module pattern uses closures to create private and public methods and variables, providing a way to encapsulate functionality:

```javascript
const calculator = (function() {
    // Private variables and functions
    let result = 0;
    
    function validate(n) {
        return typeof n === 'number';
    }
    
    // Public API
    return {
        add: function(n) {
            if (validate(n)) {
                result += n;
            }
            return this; // For method chaining
        },
        subtract: function(n) {
            if (validate(n)) {
                result -= n;
            }
            return this;
        },
        getResult: function() {
            return result;
        },
        reset: function() {
            result = 0;
            return this;
        }
    };
})();

console.log(calculator.add(5).add(3).subtract(2).getResult()); // 6
// console.log(calculator.result); // undefined - private variable
// calculator.validate(5); // Error - private function
```

### Benefits of the Module Pattern

1. **Encapsulation**: Hide implementation details
2. **State Management**: Maintain private state
3. **Namespace Protection**: Avoid global namespace pollution
4. **API Design**: Expose only what's necessary

## 7. Advanced Function Concepts

### Function Composition

Function composition is combining two or more functions to create a new function:

```javascript
const add5 = x => x + 5;
const multiply2 = x => x * 2;

// Compose functions manually
const add5ThenMultiply2 = x => multiply2(add5(x));

console.log(add5ThenMultiply2(10)); // (10 + 5) * 2 = 30

// Helper for function composition
function compose(...functions) {
    return input => functions.reduceRight((result, fn) => fn(result), input);
}

const calculate = compose(multiply2, add5);
console.log(calculate(10)); // (10 + 5) * 2 = 30
```

### Currying

Currying transforms a function with multiple arguments into a sequence of functions, each taking a single argument:

```javascript
// Regular function
function add(a, b, c) {
    return a + b + c;
}

// Curried version
function curriedAdd(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}

console.log(add(1, 2, 3)); // 6
console.log(curriedAdd(1)(2)(3)); // 6

// Arrow function syntax for currying is even cleaner:
const arrowCurriedAdd = a => b => c => a + b + c;
console.log(arrowCurriedAdd(1)(2)(3)); // 6
```

### Memoization

Memoization is an optimization technique that speeds up function calls by caching results:

```javascript
function memoize(fn) {
    const cache = {};
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache[key]) {
            console.log('Returning from cache');
            return cache[key];
        }
        
        console.log('Computing result');
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

// Expensive calculation
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Memoized version
const memoizedFibonacci = memoize(function(n) {
    if (n <= 1) return n;
    return memoizedFibonacci(n - 1) + memoizedFibonacci(n - 2);
});

console.time('regular');
fibonacci(35); // Very slow
console.timeEnd('regular');

console.time('memoized');
memoizedFibonacci(35); // Much faster
console.timeEnd('memoized');
```

### Higher-Order Functions

A higher-order function is a function that takes one or more functions as arguments or returns a function:

```javascript
// Function that takes a function as an argument
function doTwice(fn, value) {
    return fn(fn(value));
}

function addOne(x) {
    return x + 1;
}

console.log(doTwice(addOne, 5)); // 7

// Array methods are common higher-order functions
const numbers = [1, 2, 3, 4, 5];

// map takes a function and applies it to each element
const doubled = numbers.map(x => x * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter takes a function that returns true/false
const evens = numbers.filter(x => x % 2 === 0);
console.log(evens); // [2, 4]

// reduce takes a function to accumulate values
const sum = numbers.reduce((total, x) => total + x, 0);
console.log(sum); // 15
```

## 8. Function Best Practices

### 1. Keep Functions Small and Focused

Each function should do one thing and do it well. If your function is getting long or handling multiple concerns, consider breaking it down.

```javascript
// Bad: One function doing multiple things
function processUser(user) {
    // Validate user
    if (!user.name) throw new Error("Name required");
    if (!user.email) throw new Error("Email required");
    
    // Format user data
    user.name = user.name.trim();
    user.email = user.email.toLowerCase();
    
    // Save user to database
    database.save(user);
    
    return user;
}

// Better: Split into focused functions
function validateUser(user) {
    if (!user.name) throw new Error("Name required");
    if (!user.email) throw new Error("Email required");
    return user;
}

function formatUserData(user) {
    return {
        ...user,
        name: user.name.trim(),
        email: user.email.toLowerCase()
    };
}

function saveUser(user) {
    return database.save(user);
}

function processUser(user) {
    const validUser = validateUser(user);
    const formattedUser = formatUserData(validUser);
    return saveUser(formattedUser);
}
```

### 2. Use Clear and Descriptive Names

Function names should clearly indicate what the function does:

```javascript
// Bad: Unclear name
function process(data) { /* ... */ }

// Better: Descriptive name
function calculateTotalPrice(items) { /* ... */ }
```

### 3. Default Parameters Over Conditionals

```javascript
// Less ideal
function createUser(name, role) {
    role = role || 'member';
    // ...
}

// Better
function createUser(name, role = 'member') {
    // ...
}
```

### 4. Return Early for Edge Cases

```javascript
// Avoid deeply nested conditionals
function getInsuranceDeductible(insurance) {
    if (insurance) {
        if (insurance.coverage) {
            if (insurance.coverage.deductible) {
                return insurance.coverage.deductible;
            }
        }
    }
    return null;
}

// Better: Return early
function getInsuranceDeductible(insurance) {
    if (!insurance) return null;
    if (!insurance.coverage) return null;
    if (!insurance.coverage.deductible) return null;
    
    return insurance.coverage.deductible;
}

// Even better: Use optional chaining (ES2020)
function getInsuranceDeductible(insurance) {
    return insurance?.coverage?.deductible ?? null;
}
```

### 5. Avoid Side Effects

Functions should ideally be "pure" – they should return the same output for the same input and not modify external state:

```javascript
// With side effects
let total = 0;
function addToTotal(value) {
    total += value; // Side effect: modifies external variable
}

// Pure function (no side effects)
function add(a, b) {
    return a + b; // Just returns a value, no external changes
}
```

### 6. Handle Errors Gracefully

```javascript
// Using try/catch for error handling
function fetchData(url) {
    try {
        const response = fetch(url);
        return response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // Or a default value
    }
}
```

## 9. Real-World Examples

### Creating a Simple Logger with Closures

```javascript
function createLogger(logLevel) {
    const levels = {
        debug: 0,
        info: 1,
        warning: 2,
        error: 3
    };
    
    const currentLevel = levels[logLevel] || 0;
    
    return {
        debug: function(message) {
            if (currentLevel <= levels.debug) {
                console.log(`[DEBUG]: ${message}`);
            }
        },
        info: function(message) {
            if (currentLevel <= levels.info) {
                console.log(`[INFO]: ${message}`);
            }
        },
        warning: function(message) {
            if (currentLevel <= levels.warning) {
                console.log(`[WARNING]: ${message}`);
            }
        },
        error: function(message) {
            if (currentLevel <= levels.error) {
                console.log(`[ERROR]: ${message}`);
            }
        }
    };
}

const logger = createLogger('warning');
logger.debug('This won\'t be logged'); // Not logged
logger.info('This won\'t be logged either'); // Not logged
logger.warning('This will be logged'); // [WARNING]: This will be logged
logger.error('This will also be logged'); // [ERROR]: This will also be logged
```

### Building a Simple Event System

```javascript
function createEventSystem() {
    const events = {}; // Private storage for event handlers
    
    return {
        on: function(eventName, handler) {
            if (!events[eventName]) {
                events[eventName] = [];
            }
            events[eventName].push(handler);
            return this;
        },
        off: function(eventName, handler) {
            if (!events[eventName]) return this;
            
            if (!handler) {
                delete events[eventName];
                return this;
            }
            
            events[eventName] = events[eventName].filter(h => h !== handler);
            return this;
        },
        emit: function(eventName, ...args) {
            const handlers = events[eventName] || [];
            handlers.forEach(handler => {
                handler(...args);
            });
            return this;
        },
        once: function(eventName, handler) {
            const onceHandler = (...args) => {
                handler(...args);
                this.off(eventName, onceHandler);
            };
            
            return this.on(eventName, onceHandler);
        }
    };
}

const events = createEventSystem();

function userLoggedIn(user) {
    console.log(`User logged in: ${user}`);
}

events.on('login', userLoggedIn)
      .once('login', user => {
          console.log(`Welcome message for ${user}`);
      });

events.emit('login', 'John'); // Both handlers fire
events.emit('login', 'Jane'); // Only the userLoggedIn handler fires

events.off('login', userLoggedIn);
events.emit('login', 'Bob'); // Nothing happens
```

### Creating a Memoization Decorator

```javascript
function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

class MathUtils {
    @memoize
    static fibonacci(n) {
        if (n <= 1) return n;
        return MathUtils.fibonacci(n - 1) + MathUtils.fibonacci(n - 2);
    }
}
```

## 10. Resources for Further Learning

- [MDN Web Docs: Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
- [MDN Web Docs: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [JavaScript.info: Functions](https://javascript.info/function-basics)
- [JavaScript.info: Function expressions](https://javascript.info/function-expressions)
- [JavaScript.info: Arrow functions](https://javascript.info/arrow-functions-basics)
- [JavaScript.info: Closure](https://javascript.info/closure)
- [You Don't Know JS: Scope & Closures](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/README.md)