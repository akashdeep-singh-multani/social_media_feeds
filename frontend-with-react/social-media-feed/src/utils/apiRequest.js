import { handleError } from './errorHandler';

/**
 * General function to handle API requests
 * @param {string} url - The URL of the API request
 * @param {string} method - The HTTP method (GET, POST, etc.)
 * @param {Object} [body=null] - The request body, if any (optional)
 * @returns {Promise<Object>} - The API response data
 */
export const apiRequest = async (url, method, body = null) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`${method} request failed: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};
