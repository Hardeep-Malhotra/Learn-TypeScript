// Here, id can ONLY be a string OR a number. Nothing else!
let userId: string | number;

userId = "hardeep_123"; // ✅ Valid
userId = 45672; // ✅ Valid

// userId = true;       // ❌ Error: Type 'boolean' is not assignable to type 'string | number'.

// ===========================================================
// ===========================================================

let userData: any = "Hardeep";

userData = 21; // ✅ Valid (No error)
userData = false; // ✅ Valid (No error)
userData = [1, 2]; // ✅ Valid (No error)

// =================================================
// Function using Union Type
// =================================================

function printReceipt(amount: string | number) {
  console.log(`Your total amount is: ${amount}`);
}

printReceipt(250); // ✅ Works
printReceipt("$250"); // ✅ Works
// =====================================
// Variable using any
// =====================================

let dynamicValue: any = "Coding";
console.log(dynamicValue.toUpperCase()); // ✅ Works

dynamicValue = 100;
// console.log(dynamicValue.toUpperCase()); // ❌ Runtime Crash! (But TS won't show warning because of 'any')
