// Day 10: Functions & Scope - Test Cases

/**
 * This file contains test cases for the calculator library assignment
 */

interface CalculatorLib {
  // Basic operations
  add: (a: number, b: number) => number;
  subtract: (a: number, b: number) => number;
  multiply: (a: number, b: number) => number;
  divide: (a: number, b: number) => number | string;
  
  // Advanced operations
  power: (base: number, exponent: number) => number;
  squareRoot: (value: number) => number;
  percentage: (value: number, percent: number) => number;
  factorial: (value: number) => number;
  
  // Memory functions
  memory: {
    store: (value: number) => void;
    recall: () => number;
    clear: () => void;
  };
  
  // History functions
  history: {
    add: (entry: string) => void;
    get: () => string[];
    clear: () => void;
  };
  
  // Calculator constructor
  Calculator: new () => {
    add: (a: number, b: number) => number;
    subtract: (a: number, b: number) => number;
    multiply: (a: number, b: number) => number;
    divide: (a: number, b: number) => number | string;
  };
}

// Mock implementation for testing (students should replace with their own)
const calculatorLib = {
  // Basic operations implemented as function declarations
  add: function(a: number, b: number): number {
    return a + b;
  },
  subtract: function(a: number, b: number): number {
    return a - b;
  },
  multiply: function(a: number, b: number): number {
    return a * b;
  },
  divide: function(a: number, b: number): number | string {
    if (b === 0) return "Cannot divide by zero";
    return a / b;
  },
  
  // Advanced operations implemented as arrow functions
  power: (base: number, exponent: number): number => Math.pow(base, exponent),
  squareRoot: (value: number): number => Math.sqrt(value),
  percentage: (value: number, percent: number): number => (value * percent) / 100,
  factorial: (value: number): number => {
    if (value <= 1) return 1;
    return value * calculatorLib.factorial(value - 1);
  },
  
  // Memory functions implemented as function expressions
  memory: {
    _value: 0,
    store: function(value: number): void {
      this._value = value;
    },
    recall: function(): number {
      return this._value;
    },
    clear: function(): void {
      this._value = 0;
    }
  },
  
  // History functions
  history: {
    _entries: [] as string[],
    add: function(entry: string): void {
      this._entries.push(entry);
    },
    get: function(): string[] {
      return [...this._entries];
    },
    clear: function(): void {
      this._entries = [];
    }
  },
  
  // Calculator constructor function
  Calculator: function(this: any) {
    this.add = function(a: number, b: number): number {
      return a + b;
    };
    this.subtract = function(a: number, b: number): number {
      return a - b;
    };
    this.multiply = function(a: number, b: number): number {
      return a * b;
    };
    this.divide = function(a: number, b: number): number | string {
      if (b === 0) return "Cannot divide by zero";
      return a / b;
    };
  } as any
};

/**
 * Tests for basic operations
 */
function testBasicOperations() {
  console.group('Basic Operations Tests:');
  
  console.log(`Addition: 5 + 3 = ${calculatorLib.add(5, 3)}`);
  console.assert(calculatorLib.add(5, 3) === 8, 'Addition test failed');
  
  console.log(`Subtraction: 10 - 4 = ${calculatorLib.subtract(10, 4)}`);
  console.assert(calculatorLib.subtract(10, 4) === 6, 'Subtraction test failed');
  
  console.log(`Multiplication: 3 * 7 = ${calculatorLib.multiply(3, 7)}`);
  console.assert(calculatorLib.multiply(3, 7) === 21, 'Multiplication test failed');
  
  console.log(`Division: 20 / 5 = ${calculatorLib.divide(20, 5)}`);
  console.assert(calculatorLib.divide(20, 5) === 4, 'Division test failed');
  
  console.log(`Division by zero: 10 / 0 = ${calculatorLib.divide(10, 0)}`);
  console.assert(calculatorLib.divide(10, 0) === "Cannot divide by zero", 'Division by zero test failed');
  
  console.groupEnd();
}

/**
 * Tests for advanced operations
 */
function testAdvancedOperations() {
  console.group('Advanced Operations Tests:');
  
  console.log(`Power: 2 ^ 3 = ${calculatorLib.power(2, 3)}`);
  console.assert(calculatorLib.power(2, 3) === 8, 'Power test failed');
  
  console.log(`Square root: √16 = ${calculatorLib.squareRoot(16)}`);
  console.assert(calculatorLib.squareRoot(16) === 4, 'Square root test failed');
  
  console.log(`Percentage: 20% of 50 = ${calculatorLib.percentage(50, 20)}`);
  console.assert(calculatorLib.percentage(50, 20) === 10, 'Percentage test failed');
  
  console.log(`Factorial: 5! = ${calculatorLib.factorial(5)}`);
  console.assert(calculatorLib.factorial(5) === 120, 'Factorial test failed');
  
  console.groupEnd();
}

/**
 * Tests for memory operations
 */
function testMemoryOperations() {
  console.group('Memory Operations Tests:');
  
  calculatorLib.memory.store(100);
  console.log(`Memory stored: 100`);
  
  const recallValue = calculatorLib.memory.recall();
  console.log(`Memory recalled: ${recallValue}`);
  console.assert(recallValue === 100, 'Memory recall test failed');
  
  calculatorLib.memory.clear();
  console.log(`Memory cleared`);
  
  const afterClearValue = calculatorLib.memory.recall();
  console.log(`Memory after clear: ${afterClearValue}`);
  console.assert(afterClearValue === 0, 'Memory clear test failed');
  
  console.groupEnd();
}

/**
 * Tests for history operations
 */
function testHistoryOperations() {
  console.group('History Operations Tests:');
  
  calculatorLib.history.add("5 + 3 = 8");
  calculatorLib.history.add("10 - 4 = 6");
  console.log(`History entries added: "5 + 3 = 8", "10 - 4 = 6"`);
  
  const historyEntries = calculatorLib.history.get();
  console.log(`History entries:`, historyEntries);
  console.assert(historyEntries.length === 2, 'History get test failed');
  console.assert(historyEntries[0] === "5 + 3 = 8", 'History first entry test failed');
  
  calculatorLib.history.clear();
  console.log(`History cleared`);
  
  const clearedHistory = calculatorLib.history.get();
  console.log(`History after clear:`, clearedHistory);
  console.assert(clearedHistory.length === 0, 'History clear test failed');
  
  console.groupEnd();
}

/**
 * Tests for calculator constructor
 */
function testCalculatorConstructor() {
  console.group('Calculator Constructor Tests:');
  
  const myCalculator = new calculatorLib.Calculator();
  
  console.log(`Instance add: 10 + 20 = ${myCalculator.add(10, 20)}`);
  console.assert(myCalculator.add(10, 20) === 30, 'Instance add test failed');
  
  console.log(`Instance subtract: 30 - 15 = ${myCalculator.subtract(30, 15)}`);
  console.assert(myCalculator.subtract(30, 15) === 15, 'Instance subtract test failed');
  
  console.groupEnd();
}

/**
 * Run all tests
 */
function runAllTests() {
  console.log('=== CALCULATOR LIBRARY TESTS ===');
  testBasicOperations();
  testAdvancedOperations();
  testMemoryOperations();
  testHistoryOperations();
  testCalculatorConstructor();
  console.log('=== ALL TESTS COMPLETED ===');
}

// Run the tests - uncomment this line to execute
// runAllTests();

export {};