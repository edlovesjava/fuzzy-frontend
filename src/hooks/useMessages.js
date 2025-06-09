import { useState, useCallback } from 'react';

export const useMessages = () => {
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const showMessage = useCallback((msg, type = 'success') => {
    if (type === 'success') {
      setSuccess(msg);
      setError('');
    } else {
      setError(msg);
      setSuccess('');
    }
    setTimeout(() => {
      setSuccess('');
      setError('');
    }, 3000);
  }, []);

  const clearMessages = useCallback(() => {
    setSuccess('');
    setError('');
  }, []);

  return {
    success,
    error,
    showMessage,
    clearMessages
  };
};
