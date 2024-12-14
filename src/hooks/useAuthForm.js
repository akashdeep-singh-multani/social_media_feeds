import { useState } from 'react';
import { showSuccessToast } from '../pages/toast/ToastNotifications';
import { handleError } from '../utils/errorHandler';
import { ERROR_MESSAGES, INFO_MESSAGES } from '../constants';

const useAuthForm = (initialValues, validate, submitCallback) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        const response = await submitCallback(formData);
        if (response.status) showSuccessToast(INFO_MESSAGES.LOGIN_SUCCESSFUL);
      } catch (error) {
        handleError(error, ERROR_MESSAGES.FORM_SUBMISSION_FAILED);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
};

export default useAuthForm;
