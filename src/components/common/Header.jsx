import React from 'react';

const Header = () => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Fuzzy Match API</h1>
        <p className="text-gray-600">Manage rules, test matching, and cache data</p>
      </div>
    </div>
  );
};

export default Header;
