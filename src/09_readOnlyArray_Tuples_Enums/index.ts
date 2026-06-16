// ============================================================================
// 1. READONLY ARRAYS (IMMUTABLE LISTS)
// ============================================================================

/**
 * 💡 CORE CONCEPT:
 * Readonly arrays prevent direct modifications (push, pop, or changing indices).
 * However, functions like .map() work perfectly because they don't change the original array;
 * they read from it and return a brand new array!
 */
const primaryPorts: readonly number[] = [5213, 8080, 443, 83];

console.log("--- 1. Testing Readonly Arrays & .map() ---");

// ❌ Modifying original array is strictly blocked by TypeScript:
// primaryPorts.push(9000);
// primaryPorts[0] = 80;

// ✅ Mapping works perfectly (Requires a clean return statement or inline implicit return)
const doubledPorts = primaryPorts.map((item) => item * 2);

console.log("Original Readonly Array:", primaryPorts);
console.log("New Mapped Array (Doubled):", doubledPorts);

// ============================================================================
// 2. TUPLES (STRICT FIXED-SIZE & FIXED-TYPE PAIRS)
// ============================================================================

/**
 * 💡 CORE CONCEPT:
 * Tuples lock down both the exact length of the array and the strict sequence of data types.
 * Using 'readonly' with tuples is best practice to fully freeze JavaScript's native .push() loophole.
 */
console.log("\n--- 2. Testing Strict Tuples ---");

// Strict Rule: Element 1 must be string, Element 2 must be number
const studentRecord: readonly [string, number] = ["Hardeep_SDE", 2026];

console.log(
  `Student User: ${studentRecord[0]} | Active Year: ${studentRecord[1]}`,
);

// ❌ TypeScript blocks incorrect assignment order or changing lengths:
// const invalidRecord: [string, number] = [2026, "Hardeep"]; // Type mismatched
// studentRecord.push("Extra Data"); // Blocked perfectly because of readonly!

// ============================================================================
// 3. ENUMS (SAFE NAMED CONSTANTS & NODE.JS V24 STACK FIX)
// ============================================================================

/**
 * 💡 CORE CONCEPT & NODE.JS FIXED TRICK:
 * Standard 'enum' generates an entire custom JavaScript object behind the scenes at runtime.
 * Node.js v24 native 'strip-only' mode cannot compile standard enums without extra compilers.
 * Solution: Using 'const enum' tells TypeScript to directly inject the raw values inline,
 * making it 100% compatible with both 'ts-node' and native 'node' execution commands!
 */
console.log("\n--- 3. Testing Const Enums (Node.js v24 Friendly) ---");

const enum GameDirection {
  North, // 0
  East, // 1
  South, // 2
  West, // 3
}

let currentMove = GameDirection.North;

if (currentMove === GameDirection.North) {
  console.log(`Player Action: Moving UP! (Internal Value: ${currentMove})`);
}

// String Enum Version for clean application logic
const enum UserRole {
  Admin = "ADMIN_PANEL",
  User = "USER_DASHBOARD",
}

const currentSessionRole = UserRole.Admin;
console.log(`Current Application Route Target: ${currentSessionRole}`);
