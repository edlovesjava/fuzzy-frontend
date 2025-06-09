import React from 'react';
import CacheForm from './CacheForm';
import CacheResults from './CacheResults';

const CacheTab = ({ cacheKey, onCacheKeyChange, cachedData, onGetCacheData, loading }) => {
  return (
    <div className="space-y-6">
      <CacheForm 
        cacheKey={cacheKey}
        onCacheKeyChange={onCacheKeyChange}
        onGetCacheData={onGetCacheData}
        loading={loading}
      />
      <CacheResults cachedData={cachedData} />
    </div>
  );
};

export default CacheTab;
