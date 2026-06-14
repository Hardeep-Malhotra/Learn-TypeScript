// ============================================================================
// 1. DUCK TYPING / STRUCTURAL TYPING DEMONSTRATION
// ============================================================================

/**
 * 💡 CORE CORE CONCEPT (What you just mastered):
 * TypeScript checks the dynamic 'shape' of the object reference rather than its name.
 * If the minimum required keys exist in a referenced variable, extra fields are ignored safely.
 */
type MinimalUser = {
  id: string;
  email: string;
};

function logUserEmail(user: MinimalUser): void {
  console.log(`[Structural Match] Alert sent to user email: ${user.email}`);
}

// 📦 Scenario A: Passing via variable reference (ALLOWED - Extra properties ignored)
const databaseUser = {
  id: "usr_101",
  email: "hardeep@dev.com",
  role: "admin", // Extra field
  token: "jwt_secret", // Extra field
};

console.log("--- 1. Testing Structural (Duck) Typing ---");
logUserEmail(databaseUser); // ✅ Perfectly safe

// 📦 Scenario B: Direct inline object argument (PROHIBITED - Throws error)
/*
logUserEmail({
  id: "usr_101",
  email: "hardeep@dev.com",
  role: "admin" // ❌ TS Error: Object literal may only specify known properties!
});
*/

// ============================================================================
// 2. TYPESCRIPT UTILITY TYPES (PARTIAL, REQUIRED, PICK, OMIT)
// ============================================================================

// Base structure of a core production application profile
type EnterpriseProfile = {
  uid: string;
  displayName: string;
  accountEmail: string;
  bio?: string; // Optional field
  phoneNumber?: string; // Optional field
};

// 🛠️ A. Partial<T> — Perfect for PATCH/Update account API profiles
// Automatically wraps all fields inside the type with an optional '?' flag.
type ProfileUpdateRequest = Partial<EnterpriseProfile>;

// 🛠️ B. Required<T> — Perfect for database commits validation before saving
// Strips away all optional '?' flags, forcing every key to be absolute concrete.
type MandatedDatabaseSchema = Required<EnterpriseProfile>;

// 🛠️ C. Pick<T, Keys> — Perfect for public scoreboards/leaderboards
// Selects only specified fields from the base enterprise interface structure.
type PublicAccountMetrics = Pick<EnterpriseProfile, "displayName" | "uid">;

// 🛠️ D. Omit<T, Keys> — Perfect for client-side API sanitization payloads
// Drops sensitive elements entirely and keeps everything else.
type ClientSafePayload = Omit<EnterpriseProfile, "uid">;

console.log("\n--- 2. Testing Application Utility Implementations ---");

// Verification instance for Update (Everything is optional here)
const partialUpdate: ProfileUpdateRequest = {
  displayName: "Hardeep (SDE)", // Only changing display name, other fields omitted safely
};
console.log(`Partial Update requested for field: ${partialUpdate.displayName}`);

// Verification instance for Public Analytics (Only contains displayName and uid)
const scoreboardUser: PublicAccountMetrics = {
  uid: "auth_99182",
  displayName: "CodeWithHardeep",
};
console.log(`Leaderboard track initialized for: ${scoreboardUser.displayName}`);
