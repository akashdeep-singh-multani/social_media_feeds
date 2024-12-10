import { handleError } from './errorHandler';

/**
 * General function to handle API requests
 * @param {string} url - The URL of the API request
 * @param {string} method - The HTTP method (GET, POST, etc.)
 * @param {Object|FormData} [body=null] - The request body, can be a JSON object or FormData (optional)
 * @returns {Promise<Object>} - The API response data
 */
export const apiRequest = async (url, method, body = null) => {
  try {
    const options = {
      method,
      headers: {},
      body: body || null,
    };

    // If body is FormData, don't set 'Content-Type' because the browser will handle it
    if (body instanceof FormData) {
      // No need to set headers for FormData, it will be handled by the browser
      options.headers = {};
    } else {
      // Set Content-Type to 'application/json' for JSON data
      options.headers['Content-Type'] = 'application/json';
      if (body) {
        options.body = JSON.stringify(body);
      }
    }

    const response = await fetch(url, options);

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

// import { handleError } from './errorHandler';

// /**
//  * General function to handle API requests
//  * @param {string} url - The URL of the API request
//  * @param {string} method - The HTTP method (GET, POST, etc.)
//  * @param {Object} [body=null] - The request body, if any (optional)
//  * @returns {Promise<Object>} - The API response data
//  */
// export const apiRequest = async (url, method, body = null) => {
//   try {
//     const response = await fetch(url, {
//       method,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: body ? JSON.stringify(body) : null,
//     });

//     if (!response.ok) {
//       throw new Error(`${method} request failed: ${response.statusText}`);
//     }

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     handleError(error);
//     throw error;
//   }
// };
