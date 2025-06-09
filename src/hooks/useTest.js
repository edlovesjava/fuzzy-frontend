import { useState } from 'react';

const API_BASE = 'http://localhost:8080/api';

export const useTest = (showMessage) => {
  const [testNote, setTestNote] = useState('');
  const [testResults, setTestResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const testRules = async () => {
    if (!testNote.trim()) {
      showMessage('Test note is required', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/v2/rules/show`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testNote })
      });
      const data = await response.json();
      setTestResults(data);
    } catch (err) {
      showMessage('Failed to test rules', 'error');
    }
    setLoading(false);
  };

  return {
    testNote,
    setTestNote,
    testResults,
    loading,
    testRules
  };
};
