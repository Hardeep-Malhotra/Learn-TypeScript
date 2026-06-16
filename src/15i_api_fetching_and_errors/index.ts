import axios from "axios";

// ==========================================
// 1. TYPE DECLARATIONS / INTERFACES
// ==========================================
// Define the expected structure of the data returning from the API payload
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
}

// ==========================================
// 2. FETCHING DATA WITH TYPES (Using Axios)
// ==========================================
async function getUserData(userId: number) {
  try {
    console.log(`\n--- Fetching Data for User ID: ${userId} ---`);

    // Passing <User> generic tells Axios the exact type shape of response.data.
    // Backticks (`) are explicitly used here for dynamic string interpolation.
    const response = await axios.get<User>(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
    );

    // TypeScript IntelliSense now safely triggers autocomplete for properties like .name and .email
    console.log("✅ Success! Data Fetched Successfully.");
    console.log(`User Name : ${response.data.name}`);
    console.log(`User Email: ${response.data.email}`);
  } catch (error) {
    // ==========================================
    // 3. HANDLING AXIOS ERRORS SAFELY
    // ==========================================
    // The native catch block infers errors as 'unknown'. We use an Axios Type Guard to verify its source.
    if (axios.isAxiosError(error)) {
      console.log("❌ Axios Error Handled Safely!");

      if (error.response) {
        // Scenario A: Server responded with a status code falling outside the 2xx range (e.g., 404, 500)
        console.log(`Status Code : ${error.response.status}`);
        console.log(`Error Message: ${error.message}`);
      } else if (error.request) {
        // Scenario B: The request was made out but no response was received (e.g., Network/Timeout errors)
        console.log("Network Error: No response received from server.");
      } else {
        // Scenario C: An error occurred while setting up the request configuration
        console.log(`Request Setup Error: ${error.message}`);
      }
    } else {
      // Fallback for standard, non-network synchronous JavaScript runtime crashes
      console.log("Normal JavaScript Error:", error);
    }
  }
}

// ==========================================
// 4. TESTING RUNS
// ==========================================

// Test Case 1: Valid ID boundary (1-100) -> This resolves and prints user details smoothly
getUserData(12);

// Test Case 2: Invalid ID boundary (Out of bounds) -> This safely catches and processes a 404 response
getUserData(105);
