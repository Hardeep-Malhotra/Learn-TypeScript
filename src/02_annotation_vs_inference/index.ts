// ==========================================
// 1. TYPE ANNOTATION (Explicitly Telling TS)
// ==========================================

// Used when you declare a variable now but will assign its value later
let collegeName: string;
collegeName = "MLN College"; // This is perfectly fine

// If you try to assign a number to it, TS will throw an error immediately
// collegeName = 12345; // ❌ Error: Type 'number' is not assignable to type 'string'.

// ==========================================
// 2. TYPE INFERENCE (TS Guessing Automatically)
// ==========================================

// We didn't specify any type here, but TS looks at the value '45' and knows it's a 'number'
let totalSubmissions = 45;

// If you try to assign a string to it later:
// totalSubmissions = "forty-five"; // ❌ Error: Type 'string' is not assignable to type 'number'.

// ==========================================
// 3. REAL-WORLD EXAMPLE: FUNCTIONS
// ==========================================

// Function parameters always need Type ANNOTATION (otherwise TS won't know what they are)
// But TS is smart enough to INFER (guess) the return type automatically based on the operation!
function calculateSquare(num: number) {
  return num * num; // TS automatically knows that number * number will always return a 'number'
}

// TS automatically infers that the type of the variable 'result' is a 'number'
const result = calculateSquare(5);

// Printing the outputs to the terminal
console.log(`College: ${collegeName}`);
console.log(`Submissions: ${totalSubmissions}`);
console.log(`Square Result: ${result}`);
