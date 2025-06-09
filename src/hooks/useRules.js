import { useState, useCallback } from 'react';

const API_BASE = 'http://localhost:8080/api';

export const useRules = (showMessage) => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRules = useCallback(async () => {
   // setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/v2/rules`);
      const data = await response.json();
      setRules(data.rules || []);
    } catch (err) {
      showMessage('Failed to fetch rules', 'error');
    }
    setLoading(false);
  }, [showMessage]);

  const addRule = useCallback(async (newRule) => {
    if (!newRule.testString.trim()) {
      showMessage('Test string is required', 'error');
      return false;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/v2/rules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rules: [newRule] })
      });
      const data = await response.json();
      
      if (data.createdRules?.length > 0) {
        showMessage('Rule created successfully!');
        await fetchRules();
        return true;
      } else {
        showMessage('Failed to create rule', 'error');
        setLoading(false);
        return false;
      }
    } catch (err) {
      showMessage('Failed to create rule', 'error');
      setLoading(false);
      return false;
    }
  }, [showMessage, fetchRules]);

  const updateRule = useCallback(async (originalEncodedTestString, updatedRule) => {
    setLoading(true);
    try {
      // First delete the old rule
      await fetch(`${API_BASE}/v2/rules/${originalEncodedTestString}`, {
        method: 'DELETE'
      });
      
      // Then add the updated rule
      const response = await fetch(`${API_BASE}/v2/rules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rules: [updatedRule] })
      });
      const data = await response.json();
      
      if (data.createdRules?.length > 0) {
        showMessage('Rule updated successfully!');
        await fetchRules();
        return true;
      } else {
        showMessage('Failed to update rule', 'error');
        setLoading(false);
        return false;
      }
    } catch (err) {
      showMessage('Failed to update rule', 'error');
      setLoading(false);
      return false;
    }
  }, [showMessage, fetchRules]);

  const deleteRule = useCallback(async (encodedTestString) => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/v2/rules/${encodedTestString}`, {
        method: 'DELETE'
      });
      showMessage('Rule deleted successfully!');
      fetchRules();
    } catch (err) {
      showMessage('Failed to delete rule', 'error');
    }
    setLoading(false);
  }, [showMessage, fetchRules]);

  return {
    rules,
    loading,
    fetchRules,
    addRule,
    updateRule,
    deleteRule
  };
};
