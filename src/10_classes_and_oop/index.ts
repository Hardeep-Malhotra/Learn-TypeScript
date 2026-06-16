// ============================================================================
// 1. CLASS BLUEPRINT & CONSTRUCTOR
// ============================================================================

/**
 * 💡 CORE CONCEPT:
 * - A Class is a blueprint for creating objects.
 * - The constructor() is a special function that runs automatically when we type 'new ClassName()'.
 */
class BaseBankAtm {
  // 🛡️ Access Modifiers definition
  public bankName: string; // 🌍 public: Accessible from anywhere (default)
  protected vaultCode: string; // 👪 protected: Accessible only inside this class AND its child classes
  private masterPin: number; // 🔒 private: Strict lock! Accessible ONLY inside this exact class

  constructor(name: string, vault: string, pin: number) {
    this.bankName = name;
    this.vaultCode = vault;
    this.masterPin = pin;
  }

  // A public helper function to read private data safely from inside the class
  public triggerInternalAudit(): void {
    console.log(`[Internal Audit] Verifying Master PIN: ${this.masterPin}`); // ✅ Allowed inside the same class
  }
}

// ============================================================================
// 2. INHERITANCE & PROTECTED BEHAVIOR (Child Class)
// ============================================================================

/**
 * 💡 CORE CONCEPT:
 * A child class (subclass) extends a parent class.
 * It can access 'public' and 'protected' properties of the parent, but NOT 'private' ones.
 */
class LocalAtmBranch extends BaseBankAtm {
  public branchLocation: string;

  constructor(location: string, bankName: string, vault: string, pin: number) {
    // 'super' calls the constructor of the parent class
    super(bankName, vault, pin);
    this.branchLocation = location;
  }

  public printAtmStatus(): void {
    console.log(`ATM Location: ${this.branchLocation}`);
    console.log(`Bank Provider: ${this.bankName}`); // ✅ Allowed (public)
    console.log(`Vault Status Code: ${this.vaultCode}`); // ✅ Allowed (protected - Child can read it)

    // ❌ Error: Property 'masterPin' is private and only accessible within class 'BaseBankAtm'
    // console.log(this.masterPin);
  }
}

// ============================================================================
// 3. EXECUTION & VERIFICATION TEST
// ============================================================================

console.log("--- Testing TypeScript Classes & Access Modifiers --- \n");

// Creating an instance of the child class
const myAtm = new LocalAtmBranch(
  "Yamunanagar",
  "StateBank",
  "SECURE_VAULT_XYZ",
  5213,
);

// 1. Testing Public Members (Accessible Everywhere)
console.log(`Direct Public Access -> Bank Name: ${myAtm.bankName}`); // ✅ Allowed

// 2. Testing Internal Class Access for Private Data
myAtm.triggerInternalAudit(); // ✅ Allowed (Function is public, reads private inside)

// 3. Testing Child Class Capabilities
console.log("");
myAtm.printAtmStatus(); // ✅ Allowed (Prints internal branch parameters)

// ============================================================================
// 4. THE OUTSIDE BOUNDARY RESTRICTIONS (STRICT COMPILER BLOCKS)
// ============================================================================

// ❌ If you uncomment these lines below, TypeScript compiler will throw errors instantly:
// myAtm.vaultCode = "HACKED_CODE"; // ❌ Error: Property 'vaultCode' is protected and only accessible within class...
// myAtm.masterPin = 0000;          // ❌ Error: Property 'masterPin' is private and only accessible within class...
