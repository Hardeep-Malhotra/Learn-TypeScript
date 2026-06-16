// ============================================================================
// 1. SINGLE GENERIC FUNCTION (<T>) - YOUR EXACT LOGIC
// ============================================================================

/**
 * 💡 HARDEEP'S CORE LOGIC LOGGING:
 * As you correctly said: We don't know what data will come. So we pass <T>
 * on the function, assign the parameter as 'T', and set the return type as 'T'.
 * Now, whatever data the user passes, Generics automatically locks that type!
 */
function smartIdentityExchange<T>(userData: T): T {
  // It takes 'T', processes it safely, and returns 'T'
  return userData;
}

console.log("--- 1. Testing Single Generic Type (<T>) ---");

// Case A: User passes a string. <T> dynamically locks onto 'string'
let userString = smartIdentityExchange<string>("Hardeep-SDE");
console.log(`String Data Locked: ${userString.toUpperCase()}`); // ✅ toUpperCase() works perfectly!

// Case B: User passes a number. <T> dynamically locks onto 'number'
let userNumber = smartIdentityExchange<number>(5213);
console.log(`Number Data Locked: ${userNumber.toFixed(2)}`); // ✅ toFixed() works perfectly!

// ============================================================================
// 2. MULTIPLE GENERIC TYPES (<T, U>)
// ============================================================================

/**
 * 💡 CORE CONCEPT: MULTIPLE PLACEHOLDERS
 * What if we have two different parameters, and both can be of different dynamic types?
 * We can pass multiple type variables like <T, U>.
 */
function makeDynamicKeyValuePair<T, U>(key: T, value: U): void {
  console.log(
    `Key: ${key} (Type: ${typeof key}) | Value: ${value} (Type: ${typeof value})`,
  );
}

console.log("\n--- 2. Testing Multiple Generic Types (<T, U>) ---");

// Pairing a string with a number
makeDynamicKeyValuePair<string, number>("Account_ID", 98412);

// Pairing a number with a boolean
makeDynamicKeyValuePair<number, boolean>(200, true);

// ============================================================================
// 3. GENERIC INTERFACES (REUSABLE BLUEPRINTS)
// ============================================================================

/**
 * 💡 CORE CONCEPT: GENERIC CONTRACTS
 * Just like functions, an interface can also take a generic placeholder <T>
 * to make the structure completely reusable for different API payloads.
 */
interface ServerResponseWrapper<T> {
  status: "success" | "error";
  statusCode: number;
  payload: T; // This data type changes dynamically based on what we pass!
}

console.log("\n--- 3. Testing Generic Interfaces ---");

// Example A: Response containing User Data profile (string)
const profileResponse: ServerResponseWrapper<string> = {
  status: "success",
  statusCode: 200,
  payload: "User Authenticated Successfully",
};

// Example B: Response containing Hackathon Rankings (array of numbers)
const hackathonScores: ServerResponseWrapper<number[]> = {
  status: "success",
  statusCode: 200,
  payload: [1, 2, 3], // 3rd Place representation
};

console.log(`Profile Response Payload: ${profileResponse.payload}`);
console.log(`Hackathon Scores Position: ${hackathonScores.payload}`);
