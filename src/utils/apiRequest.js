import { ERROR_MESSAGES } from '../constants';
import {
  showErrorToast,
  showInfoToast,
} from '../pages/toast/ToastNotifications';
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
      if (response.status === 404) {
        showInfoToast('Data not found');
      } else {
        showErrorToast(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};
