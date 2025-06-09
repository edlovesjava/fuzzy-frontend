import { useState } from 'react';

const API_BASE = 'http://localhost:8080/api';

export const useCache = (showMessage) => {
  const [cacheKey, setCacheKey] = useState('');
  const [cachedData, setCachedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCacheData = async () => {
    if (!cacheKey.trim()) {
      showMessage('Cache key is required', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/v2/cache/${cacheKey}`);
      const data = await response.json();
      setCachedData(data);
    } catch (err) {
      showMessage('Failed to get cache data', 'error');
    }
    setLoading(false);
  };

  return {
    cacheKey,
    setCacheKey,
    cachedData,
    loading,
    getCacheData
  };
};
