import React from 'react';

const MessageDisplay = ({ success, error }) => {
  if (!success && !error) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-2">
      <div className={`p-3 rounded-lg ${success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {success || error}
      </div>
    </div>
  );
};

export default MessageDisplay;
