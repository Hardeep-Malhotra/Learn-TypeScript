// ============================================================================
// GETTERS & SETTERS (ENCAPSULATION SANDBOX)
// ============================================================================

class EmployeeAccount {
  public readonly employeeName: string;
  // 🔒 Private field: Cannot be accessed or changed directly from outside
  private _salary: number;

  constructor(name: string, initialSalary: number) {
    this.employeeName = name;
    this._salary = initialSalary;
  }

  /**
   * 💡 1. THE GETTER (Read Access Control)
   * It looks like a function but acts like a standard property when calling.
   * We can format the output before sending it to the client.
   */
  get salaryInfo(): string {
    return `₹${this._salary.toLocaleString("en-IN")} INR`;
  }

  /**
   * 💡 2. THE SETTER (Write Access Control with Validation)
   * This intercepts any update attempts and runs a strict business check.
   */
  set updateSalary(newAmount: number) {
    if (newAmount <= 0) {
      console.log(
        `❌ ERROR: Invalid entry! Salary for ${this.employeeName} cannot be zero or negative.`,
      );
      return; // Stops the update right here
    }

    console.log(
      `✅ SUCCESS: Salary updated from ₹${this._salary} to ₹${newAmount}`,
    );
    this._salary = newAmount;
  }
}

// ============================================================================
// EXECUTION AND VERIFICATION RUN
// ============================================================================

console.log("--- Testing Getters and Setters in TypeScript --- \n");

const worker = new EmployeeAccount("Hardeep Singh", 50000);

// 🌍 1. Reading data via GETTER
// Note: We don't use brackets () like ordinary functions. It acts just like a variable!
console.log(`Employee: ${worker.employeeName}`);
console.log(`Current CTC: ${worker.salaryInfo}\n`);

// 🌍 2. Attempting an Invalid Update via SETTER
// Note: We assign values using the ordinary assignment operator '='
worker.updateSalary = -5000; // ❌ Should hit the validation block
console.log(`Salary Check after bad hack attempt: ${worker.salaryInfo}\n`);

// 🌍 3. Attempting a Valid Update via SETTER
worker.updateSalary = 65000; // ✅ Safe and verified update
console.log(`Final Updated CTC: ${worker.salaryInfo}`);
