// ============================================================================
// 1. TYPE ASSERTION WITH JSON.PARSE (Screenshot 1 - Top Part)
// ============================================================================

// Defining a structure for our book object
interface Book {
  name: string;
}

let bookString = '{"name":"Who moved my cheese"}';

/**
 * 💡 CONCEPT: Type Assertion using 'as'
 * JavaScript's JSON.parse() always returns the 'any' type because it doesn't
 * know what data is inside the string.
 * By using 'as Book', we explicitly tell TypeScript: "Trust me, this is a Book object."
 */
let bookObject = JSON.parse(bookString) as Book;

console.log("Book Name:", bookObject.name); // Now safe to access '.name'

// ============================================================================
// 2. DOM MANIPULATION & ELEMENT CASTING (Screenshot 1 - Middle Part)
// ============================================================================

/**
 * 💡 CONCEPT: HTML Element Casting
 * document.getElementById returns a generic 'HTMLElement | null'.
 * Generic HTMLElements do not have input-specific properties like '.value'.
 * We use 'as HTMLInputElement' to open up input-specific access.
 */
// Note: This code expects a browser environment, but we can declare it for type safety tracking.
const inputElement = {
  id: "username",
  value: "chai_aur_code",
} as unknown as HTMLInputElement;

console.log("Input Element Value:", inputElement.value);

// ============================================================================
// 3. SAFE ERROR HANDLING IN CATCH BLOCKS (Screenshot 2 - Top Part)
// ============================================================================

/**
 * 💡 CONCEPT: Safe Runtime Exception Catching
 * In TypeScript, the caught 'error' in a catch block is implicitly of type 'unknown'.
 * We must narrow it down using 'instanceof Error' before accessing '.message'.
 */
try {
  // Simulating an operational failure
  throw new Error("Database connection failed!");
} catch (error) {
  // Type Guard checking if 'error' is an actual structural Error instance
  if (error instanceof Error) {
    console.log("Handled Error Message:", error.message); // ✅ Safe
  } else {
    console.log("An unexpected primitive error occurred:", error);
  }
}

// ============================================================================
// 4. FORCING UNKNOWN TO PRIMITIVES (Screenshot 2 - Bottom Part)
// ============================================================================

/**
 * 💡 CONCEPT: Casting 'unknown' variables
 * You cannot assign an 'unknown' type directly to a strict 'string' variable.
 * We assert it using 'as string' to resolve assignment constraints.
 */
const data: unknown = "chai aur code";
const strData: string = data as string; // ✅ Type enforced successfully

console.log("Strict String Content:", strData.toUpperCase());

// ============================================================================
// 5. CUSTOM UNION TYPE LITERALS (Screenshot 2 - Last Line)
// ============================================================================

// Defining specific allowed string options using literal unions
type Role = "admin" | "user" | "superadmin";

let currentSessionRole: Role = "admin"; // ✅ Valid Assignment
// currentSessionRole = "guest";       // ❌ Error: Type '"guest"' is not assignable to type 'Role'.

console.log("Current Session User Role:", currentSessionRole);
