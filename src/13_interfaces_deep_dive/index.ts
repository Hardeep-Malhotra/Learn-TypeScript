// ============================================================================
// 1. STANDARD CONTRACT & GENERICS INTRO
// ============================================================================

/**
 * 💡 CORE CONCEPT: THE STRUCTURAL CONTRACT
 * An interface defines the exact shape that an object must satisfy.
 * - 'readonly' locks specific fields from mutation.
 * - '?' marks a field as fully optional.
 */
interface DeveloperProfile {
  readonly githubUser: string; // Immutable identifier
  skills: string[];
  portfolioUrl?: string; // Optional configuration
}

console.log("--- 1. Testing Structural Interfaces ---");

const activeCoder: DeveloperProfile = {
  githubUser: "Hardeep-SDE", // Matches professional profile update
  skills: ["MERN Stack", "TypeScript", "C++"],
};

console.log(`Active Developer Registered: ${activeCoder.githubUser}`);
// activeCoder.githubUser = "Hacker_New_Name"; // ❌ ERROR: Cannot assign to 'githubUser' because it is a read-only property.

// ============================================================================
// 2. INTERFACES FOR FUNCTIONS (CALL SIGNATURES)
// ============================================================================

/**
 * 💡 CORE CONCEPT: FUNCTIONAL CONTRACTS
 * Interfaces can define type signatures for entire executable functions,
 * enforcing strict parameter mapping and precise return types.
 */
interface EncryptorEngine {
  // Call Signature: Takes two strings, must return a single string
  (payload: string, saltKey: string): string;
}

console.log("\n--- 2. Testing Function Interfaces ---");

// Implementing the interface contract on a concrete variable arrow function
const hashData: EncryptorEngine = (payload, saltKey) => {
  return `${payload}_SECURED_VIA_${saltKey}`; // ✅ Perfectly satisfies string return rule
};

console.log(`Cipher Output: ${hashData("ApexRide_Auth_Token", "SALT_5213")}`);

// ============================================================================
// 3. INDEX SIGNATURES & DYNAMIC KEYS (CRITICAL EDGE CASE)
// ============================================================================

/**
 * 💡 CORE CONCEPT: INDEX SIGNATURES
 * Used when handling dynamic runtime payloads (e.g., unpredictable API responses),
 * where exact key names are unknown beforehand, but the data type rules are strict.
 *
 * ⚠️ EDGE CASE DANGER: All explicitly named properties MUST return a type
 * compatible with the index signature's value type, or the compiler will throw a conflict error!
 */
interface DynamicApiResponse {
  status: "success" | "failed"; // Fixed literal union constraint
  statusCode: number; // Fixed structural tracking property

  // 🎯 Index Signature: Accepts any dynamic string key, as long as value is string or number
  [dynamicMetadataKey: string]: string | number;
}

console.log("\n--- 3. Testing Dynamic Index Signatures ---");

const serverGatewayResponse: DynamicApiResponse = {
  status: "success",
  statusCode: 200,
  serverIp: "192.168.43.10", // ✅ Dynamically injected string property
  responseDelayMs: 45, // ✅ Dynamically injected number property
  triggeredBy: "Hardeep_SDE", // ✅ Dynamically injected string property
};

console.log(`API Status Code: ${serverGatewayResponse.statusCode}`);
console.log(`Dynamic Host Metadata: ${serverGatewayResponse.serverIp}`);

// ============================================================================
// 4. INTERFACE MERGING (DECLARATION MERGING LOGIC)
// ============================================================================

/**
 * 💡 CORE CONCEPT: DECLARATION MERGING
 * Unlike 'type' aliases which cannot be redeclared, multiple interfaces with the
 * exact same name in the same scope automatically merge their property definitions.
 * This is widely used when modifying global objects or extending third-party library configurations.
 */
interface AppSystemContext {
  engineName: string;
}

// Interface is redeclared down the execution line (mimicking an external plugin injection)
interface AppSystemContext {
  assignedPort: number;
}

console.log("\n--- 4. Testing Interface Declaration Merging ---");

// 🎯 The final compiled object structure forces compliance with BOTH declarations simultaneously!
const coreMobilityApp: AppSystemContext = {
  engineName: "ApexRide_Core_Engine",
  assignedPort: 8080, // ✅ Compiled seamlessly without modifying the initial baseline interface definition block
};

console.log(
  `Active App Deployment: ${coreMobilityApp.engineName} running on Port ${coreMobilityApp.assignedPort}`,
);
