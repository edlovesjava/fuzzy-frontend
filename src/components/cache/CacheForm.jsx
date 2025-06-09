import React from 'react';
import { Database } from 'lucide-react';

const CacheForm = ({ cacheKey, onCacheKeyChange, onGetCacheData, loading }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Database className="mr-2" size={20} />
        Cache Management
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cache Key
          </label>
          <input
            type="text"
            value={cacheKey}
            onChange={(e) => onCacheKeyChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter cache key..."
          />
        </div>
        
        <button
          onClick={onGetCacheData}
          disabled={loading}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Get Cache Data'}
        </button>
      </div>
    </div>
  );
};

export default CacheForm;
