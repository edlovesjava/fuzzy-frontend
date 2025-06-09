import React from 'react';
import { Play } from 'lucide-react';

const TestForm = ({ testNote, onTestNoteChange, onTestRules, loading }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Play className="mr-2" size={20} />
        Test Rules
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Test Note
          </label>
          <textarea
            value={testNote}
            onChange={(e) => onTestNoteChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Enter text to test against your rules..."
          />
        </div>
        
        <button
          onClick={onTestRules}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Rules'}
        </button>
      </div>
    </div>
  );
};

export default TestForm;
