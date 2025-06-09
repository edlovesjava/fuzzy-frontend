import React from 'react';

const CacheResults = ({ cachedData }) => {
  if (!cachedData) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4">Cache Data</h3>
      <div className="space-y-2">
        {cachedData.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {cachedData.map((item, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md">
                {item}
              </span>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 italic">No cache data found</div>
        )}
      </div>
    </div>
  );
};

export default CacheResults;
