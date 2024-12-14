// src/utils/toastNotifications.js

import {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
} from '../pages/toast/ToastNotifications';

showSuccessToast;
export const showToastBasedOnResponse = (response) => {
  if (!response) {
    console.error('Invalid response');
    return;
  }

  const { status, message } = response;

  if (status >= 200 && status < 300) {
    // Handle successful responses (2xx)
    showSuccessToast(message || 'Operation successful!');
  } else if (status >= 400 && status < 500) {
    // Handle client-side errors (4xx)
    if (status === 404) {
      showInfoToast(message || 'Data not found!');
    } else {
      showErrorToast(message || 'Client error occurred!');
    }
  } else if (status >= 500 && status < 600) {
    // Handle server-side errors (5xx)
    showErrorToast(message || 'Server error occurred!');
  } else {
    showErrorToast(message || 'An unexpected error occurred!');
  }
};
