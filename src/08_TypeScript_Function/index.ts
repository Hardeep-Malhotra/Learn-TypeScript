// ============================================================================
// 1. BASIC FUNCTION WITH TYPE ANNOTATIONS
// ============================================================================

/**
 * 💡 CORE CONCEPT:
 * We must explicitly specify what type of inputs (parameters) the function accepts
 * and what type of output (return) it will send back.
 */
function doubleNumber(value: number): number {
  return value * 2;
}

console.log("--- 1. Testing Basic Type Annotations ---");
const result1 = doubleNumber(25);
console.log(`Double of 25 is: ${result1}`); // Output: 50

// ============================================================================
// 2. OPTIONAL AND DEFAULT PARAMETERS
// ============================================================================

/**
 * 💡 CORE CONCEPT:
 * - Optional parameter (?) means you don't have to send it when calling the function.
 * - Default parameter (= value) automatically gives a fallback value if nothing is passed.
 */
function greetUser(
  name: string,
  title?: string,
  greeting: string = "Hello",
): string {
  if (title) {
    return `${greeting}, ${title}. ${name}!`;
  }
  return `${greeting}, ${name}!`;
}

console.log("\n--- 2. Testing Optional & Default Parameters ---");
console.log(greetUser("Hardeep")); // Output: Hello, Hardeep! (Uses default)
console.log(greetUser("Hardeep", "Sir")); // Output: Hello, Sir. Hardeep! (Uses optional)
console.log(greetUser("Hardeep", undefined, "Welcome")); // Output: Welcome, Hardeep! (Overrides default)

// ============================================================================
// 3. ARROW FUNCTIONS & FUNCTION BLUEPRINTS
// ============================================================================

/**
 * 💡 CORE CONCEPT:
 * We can create a 'type' blueprint for a whole function signature itself.
 * This forces any variable using this type to match the exact mathematical rule.
 */
type MathOperation = (a: number, b: number) => number;

// Implementing standard arrow functions using our MathOperation blueprint
const addNumbers: MathOperation = (x, y) => x + y;
const multiplyNumbers: MathOperation = (x, y) => x * y;

console.log("\n--- 3. Testing Function Blueprint Contracts ---");
console.log(`Addition Result: ${addNumbers(10, 20)}`); // Output: 30
console.log(`Multiplication Result: ${multiplyNumbers(5, 6)}`); // Output: 30

// ============================================================================
// 4. SPECIAL RETURN TYPES: VOID VS NEVER
// ============================================================================

/**
 * 💡 CORE CONCEPT:
 * - void: The function runs completely but returns absolutely nothing.
 * - never: The function never ever finishes or finishes execution normally. It crashes or loops forever.
 */
function logMessage(msg: string): void {
  console.log(`[LOG STAMP]: ${msg}`);
  // returns nothing
}

function triggerSystemCrash(errorMsg: string): never {
  throw new Error(`Execution stopped immediately: ${errorMsg}`);
  // Code execution stops completely here. It will NEVER return anything.
}

console.log("\n--- 4. Testing Void and Never Types ---");
logMessage("Everything is running fine.");

// To test never type, you can uncomment the line below:
// triggerSystemCrash("Manual shutdown triggered.");
