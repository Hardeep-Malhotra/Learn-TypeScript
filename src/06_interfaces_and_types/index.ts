// ============================================================================
// 1. CLASS BLUEPRINTING USING INTERFACES
// ============================================================================

/**
 * 💡 CORE CONCEPT:
 * An interface acts as a mandatory contract or blueprint. Any class that
 * uses the 'implements' keyword with an interface is strictly required
 * to define all the properties and methods declared inside that interface.
 */
interface PaymentGateway {
  gatewayName: string;
  processPayment(amount: number): void;
}

// Concrete Class 1: Custom implementation for Stripe
class StripeProcessor implements PaymentGateway {
  gatewayName = "Stripe Core Engine";

  processPayment(amount: number): void {
    console.log(
      `[${this.gatewayName}] Processing payment of \$${amount} successfully.`,
    );
  }
}

// Concrete Class 2: Custom implementation for PayPal
class PayPalProcessor implements PaymentGateway {
  gatewayName = "PayPal Secure Relay";

  processPayment(amount: number): void {
    console.log(
      `[${this.gatewayName}] Redirecting to portal to process \$${amount}.`,
    );
  }
}

console.log("--- 1. Testing Interface Implementation with Classes ---");
const stripe = new StripeProcessor();
const paypal = new PayPalProcessor();

stripe.processPayment(250); // Output: [Stripe Core Engine] Processing payment of $250 successfully.
paypal.processPayment(499); // Output: [PayPal Secure Relay] Redirecting to portal to process $499.

// ============================================================================
// 2. INTERSECTION TYPES (&) — COMBINING MULTIPLE OBJECT SHAPES
// ============================================================================

/**
 * 💡 CORE CONCEPT:
 * An Intersection type ('&') combines multiple type definitions into one
 * single, comprehensive type. The resulting object must strictly satisfy
 * all properties from every combined type.
 */
type UserBasicInfo = {
  username: string;
  email: string;
};

type DatabaseTimestamps = {
  id: string;
  createdAt: Date;
};

// Combining both type structures using the '&' operator
type ServerUserRecord = UserBasicInfo & DatabaseTimestamps;

console.log("\n--- 2. Testing Intersection Types (&) ---");
const newUser: ServerUserRecord = {
  username: "hardeep_sde",
  email: "hardeep@example.com",
  id: "usr_db_99812",
  createdAt: new Date(),
};

console.log(
  `Loaded DB User: ${newUser.username} (Created At: ${newUser.createdAt.toLocaleDateString()})`,
);

// ============================================================================
// 3. IMMUTABILITY WITH THE 'READONLY' MODIFIER
// ============================================================================

/**
 * 💡 CORE CONCEPT:
 * The 'readonly' modifier freezes a property after its initial assignment.
 * TypeScript completely blocks any attempts to overwrite or modify this
 * property at compile-time, providing deep security for configuration settings.
 */
type SystemConfig = {
  readonly environment: string; // Locked / Immutable
  port: number; // Mutable / Can be updated
};

console.log("\n--- 3. Testing Readonly Security Asset ---");
const applicationConfig: SystemConfig = {
  environment: "production",
  port: 8080,
};

// Modifying a standard mutable property
applicationConfig.port = 9000; // ✅ Allowed
console.log(`App running on port: ${applicationConfig.port}`);

// Modifying a locked readonly property
// applicationConfig.environment = "development"; // ❌ TS Compiler Error: Cannot assign to 'environment' because it is a read-only property.
