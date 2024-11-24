import { toast } from "react-toastify";

/**
 * Centralized error handler for API calls
 * @param {Error} error - The error object
 * @param {string} [customMessage] - A custom message for the error
 */
export const handleError = (error, customMessage = "") => {
  let errorMessage = customMessage;

  if (error.response) {
    const statusCode = error.response.status;

    switch (statusCode) {
      case 400:
        errorMessage = "Bad Request. Please check the data you entered.";
        break;
      case 401:
        errorMessage = "Unauthorized. Please login again.";
        break;
      case 403:
        errorMessage =
          "Forbidden. You do not have permission to access this resource.";
        break;
      case 404:
        errorMessage = "Not Found. The requested resource does not exist.";
        break;
      case 500:
        errorMessage =
          "Internal Server Error. Something went wrong on the server.";
        break;
      default:
        errorMessage = `Error ${statusCode}: ${error.response.data.message || error.response.statusText}`;
    }
  } else if (error.request) {
    errorMessage =
      "Network error: Unable to reach the server. Please check your internet connection.";
  } else {
    errorMessage = `Error: ${error.message}`;
  }

  toast.error(errorMessage);
};
