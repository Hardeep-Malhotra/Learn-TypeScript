// ============================================================================
// PATTERN 1: STATIC MEMBERS (CLASS-LEVEL SHARED STATE)
// ============================================================================

/**
 * 💡 CORE CONCEPT: STATIC
 * Regular properties belong to the individual object instances (created via 'new').
 * Static properties and methods belong strictly to the Class itself!
 * They are shared globally across the entire application and can be accessed
 * directly using the Class name without creating any objects.
 */
class ServerConfigTracker {
  // Static Property: Keeps a single global counter for all instances
  public static activeConnections: number = 0;

  // Static Constants: Often used for environment configurations
  public static readonly ENVIRONMENT: string = "PRODUCTION";

  constructor() {
    // Every time a new server connection object is created, increment the global static count
    ServerConfigTracker.activeConnections++;
  }

  // Static Method: Utility function that runs on the class level
  public static getServerStatus(): string {
    return `System Mode: ${this.ENVIRONMENT} | Total Handshakes: ${this.activeConnections}`;
  }
}

console.log("--- 1. Testing Static Members (No Instance Needed) ---");

// Notice: We do NOT use 'new'. We access properties directly via the Class Name!
console.log(
  `Initial Active Connections: ${ServerConfigTracker.activeConnections}`,
); // Output: 0
console.log(`Current Deployment Mode: ${ServerConfigTracker.ENVIRONMENT}`); // Output: PRODUCTION

// Creating new individual server instances
const clientSession1 = new ServerConfigTracker();
const clientSession2 = new ServerConfigTracker();

// The static counter tracks the shared state across both instances
console.log(
  `Updated Active Connections: ${ServerConfigTracker.activeConnections}`,
); // Output: 2
console.log(ServerConfigTracker.getServerStatus());

// ============================================================================
// PATTERN 2: ABSTRACT CLASSES (THE ENFORCED STRUCTURAL BLUEPRINT)
// ============================================================================

/**
 * 💡 CORE CONCEPT: ABSTRACT CLASSES
 * An abstract class is an incomplete template. You CANNOT instantiate it directly using 'new'.
 * It serves two structural purposes:
 * 1. Concrete Methods: Implements common code shared by all child classes (e.g., printing receipts).
 * 2. Abstract Methods: Declares a rule (name and signature) without any code body.
 * Every child class MUST implement its own unique version of this method.
 */
abstract class BasePaymentProcessor {
  // Concrete Method: Standard logic inherited by all payment variants out of the box
  public generateSystemReceipt(transactionId: string, amount: number): void {
    console.log(
      `[RECEIPT LOG] Txn ID: ${transactionId} | Settled Amount: ₹${amount}`,
    );
  }

  // Abstract Method: No implementation body here. Child classes must code their own behavior.
  public abstract executeTransaction(amount: number): void;
}

// ❌ TypeScript Blocks Direct Instantiation:
// const invalidAttempt = new BasePaymentProcessor(); // Error: Cannot create an instance of an abstract class.

// --- Child Class A: UPI Integration ---
class UpiGateway extends BasePaymentProcessor {
  // Implementing the required abstract rule from the parent
  public executeTransaction(amount: number): void {
    const mockTxId = "UPI" + Math.floor(Math.random() * 90000 + 10000);
    console.log(`\nProcessing UPI Intent... Generating Dynamic QR Code.`);
    console.log(`Success: Debited ₹${amount} safely via UPI.`);

    // Calling the inherited parent method
    this.generateSystemReceipt(mockTxId, amount);
  }
}

// --- Child Class B: Credit Card Integration ---
class CardGateway extends BasePaymentProcessor {
  // Implementing the required abstract rule from the parent in a different way
  public executeTransaction(amount: number): void {
    const mockTxId = "CRD" + Math.floor(Math.random() * 90000 + 10000);
    console.log(
      `\nContacting Banking Gateways... Tokenizing Credit Card Credentials.`,
    );
    console.log(
      `Success: Auth Approved! Charged ₹${amount} to Credit Statement.`,
    );

    // Calling the inherited parent method
    this.generateSystemReceipt(mockTxId, amount);
  }
}

console.log("\n--- 2. Testing Abstract Classes & Polymorphism ---");

// We instantiate and execute through the valid child classes
const upiPayment = new UpiGateway();
upiPayment.executeTransaction(1200);

const cardPayment = new CardGateway();
cardPayment.executeTransaction(45000);
