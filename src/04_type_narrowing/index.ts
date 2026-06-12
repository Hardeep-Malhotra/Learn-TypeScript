// ===================================================
// 1. Type Narrowing & Guards (typeof)
// ===================================================

/**
 * Demonstrates basic Type Narrowing using the 'typeof' operator.
 * TypeScript narrows down the union type inside conditional blocks.
 */
function processInput(val: string | number) {
  if (typeof val === "string") {
    // TypeScript knows 'val' is strictly a string here
    console.log(val.toUpperCase());
  } else {
    // TypeScript knows 'val' must be a number here
    console.log(val.toFixed(2));
  }
}

processInput("coding"); // Output: CODING
processInput(4); // Output: 4.00

// ===================================================
// 2. The 'unknown' Type — The Safe Alternative to 'any'
// ===================================================

let dataAny: any = "coding";
let unknownData: unknown = "coding";

// 'any' bypasses type checking completely (Unsafe)
console.log(dataAny.toUpperCase());

// 'unknown' forces you to check the type before performing operations (Safe)
// unknownData.toUpperCase(); // ❌ Error: Object is of type 'unknown'.

if (typeof unknownData === "string") {
  // Safe to use after explicit type narrowing
  console.log(unknownData.toUpperCase());
}

// ===================================================
// 3. Exhaustive Checks — Preventing Production Bugs
// ===================================================

type TrafficLight = "Red" | "Yellow" | "Green" | "Blue";

/**
 * 🚨 THE PROBLEM:
 * If a new value ("Blue") is added to the type, this function fails silently.
 * It produces no output and throws no compile-time error, creating a hidden bug.
 */
function handleLight(light: TrafficLight) {
  if (light === "Red") {
    console.log("Stop...!");
  } else if (light === "Yellow") {
    console.log("Ready For GO..");
  } else if (light === "Green") {
    console.log("GO......");
  }
}

handleLight("Blue"); // Fails silently: No output produced
handleLight("Red"); // Output: Stop...!

/**
 * 🛠️ THE SOLUTION: Exhaustive Check using the 'never' type.
 * By assigning the leftover value to a 'never' variable, TypeScript forces us
 * to handle ALL possible cases at compile-time.
 */
function handleLightWithSecurity(light: TrafficLight) {
  switch (light) {
    case "Red":
      console.log("Stop...!");
      break;

    case "Yellow":
      console.log("Ready For GO..");
      break;

    case "Green":
      console.log("GO......");
      break;

    // 💡 FIX: Uncomment the case below to resolve the compile-time error!
    // case "Blue":
    //   console.log("Emergency Blue Light active!");
    //   break;

    default:
      // If "Blue" is not handled above, TypeScript flags an error here.
      // Error: Type 'string' is not assignable to type 'never'.
      const _exhaustiveCheck: never = light;
      return _exhaustiveCheck;
  }
}

// ===================================================
// 4. Type Narrowing using 'instanceof'
// ===================================================

class Dog {
  makeSound() {
    console.log("Woof! Woof! 🐾");
  }
}

class Cat {
  makeSound() {
    console.log("Meow~ 🐱");
  }
}

/**
 * Demonstrates Type Narrowing for structural objects and classes using 'instanceof'.
 * 'instanceof' verifies which class constructor was used to instantiate the object.
 */
function playWithPet(animal: Dog | Cat) {
  // Check if the object is an instance of the Dog class
  if (animal instanceof Dog) {
    animal.makeSound(); // Safe: TS knows this runs Dog's version
  }
  // Check if the object is an instance of the Cat class
  else if (animal instanceof Cat) {
    animal.makeSound(); // Safe: TS knows this runs Cat's version
  }
}

// Testing the class-based type guard execution
const myPuppy = new Dog();
const myKitty = new Cat();

playWithPet(myPuppy); // Output: Woof! Woof! 🐾
playWithPet(myKitty); // Output: Meow~ 🐱
