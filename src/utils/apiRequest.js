import { handleError } from "./errorHandler";

/**
 * General function to handle API requests
 * @param {string} url - The URL of the API request
 * @param {string} method - The HTTP method (GET, POST, etc.)
 * @param {Object} [body=null] - The request body, if any (optional)
 * @returns {Promise<Object>} - The API response data
 */
export const apiRequest = async (url, method, body = null) => {
  try {
    // Log the request details
    console.log("Sending API request:", { url, method, body });

    // Send the request
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    });

    // Log the response status
    console.log("API response status:", response.status);

    // If the response is not okay, throw an error
    if (!response.ok) {
      console.error(`${method} request failed: ${response.statusText}`);
      throw new Error(`${method} request failed: ${response.statusText}`);
    }

    // If successful, parse the JSON response
    const data = await response.json();

    // Log the successful response data
    console.log("API response data:", data);

    return data;
  } catch (error) {
    // Handle error by logging and using the custom error handler
    console.error("Error during API request:", error);
    handleError(error);
    throw error; // Re-throw the error after logging and handling
  }
};
