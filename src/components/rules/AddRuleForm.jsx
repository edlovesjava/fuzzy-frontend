import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const algorithms = [
  'PARTIAL_RATIO', 'TOKEN_SORT_RATIO', 'TOKEN_SET_RATIO', 'WRATIO',
  'PARTIAL_TOKEN_SORT_RATIO', 'PARTIAL_TOKEN_SET_RATIO', 'EXACT_MATCH'
];

const AddRuleForm = ({ onAddRule, loading }) => {
  const [newRule, setNewRule] = useState({
    testString: '',
    minConfidence: 80,
    fuzzyAlgorithmToUse: 'WRATIO',
    tagsToApply: [],
    enabled: true
  });

  const addTagsToRule = (tagString) => {
    if (!tagString.trim()) return;
    const tags = tagString.split(',').map(t => t.trim()).filter(t => t);
    setNewRule(prev => ({
      ...prev,
      tagsToApply: [...new Set([...prev.tagsToApply, ...tags])]
    }));
  };

  const removeTag = (tagToRemove) => {
    setNewRule(prev => ({
      ...prev,
      tagsToApply: prev.tagsToApply.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async () => {
    const success = await onAddRule(newRule);
    if (success) {
      setNewRule({
        testString: '',
        minConfidence: 80,
        fuzzyAlgorithmToUse: 'WRATIO',
        tagsToApply: [],
        enabled: true
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Plus className="mr-2" size={20} />
        Add New Rule
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Test String *
          </label>
          <input
            type="text"
            value={newRule.testString}
            onChange={(e) => setNewRule(prev => ({ ...prev, testString: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter test string..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Algorithm
          </label>
          <select
            value={newRule.fuzzyAlgorithmToUse}
            onChange={(e) => setNewRule(prev => ({ ...prev, fuzzyAlgorithmToUse: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {algorithms.map(algo => (
              <option key={algo} value={algo}>{algo}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Confidence
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={newRule.minConfidence}
            onChange={(e) => setNewRule(prev => ({ ...prev, minConfidence: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Tags (comma-separated)
          </label>
          <input
            type="text"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const target = e.target;
                addTagsToRule(target.value);
                target.value = '';
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="tag1, tag2, tag3..."
          />
        </div>
      </div>

      {/* Tags Display */}
      {newRule.tagsToApply.length > 0 && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags:</label>
          <div className="flex flex-wrap gap-2">
            {newRule.tagsToApply.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-md"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center">
        <input
          type="checkbox"
          id="enabled"
          checked={newRule.enabled}
          onChange={(e) => setNewRule(prev => ({ ...prev, enabled: e.target.checked }))}
          className="mr-2"
        />
        <label htmlFor="enabled" className="text-sm font-medium text-gray-700">
          Enabled
        </label>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add Rule'}
      </button>
    </div>
  );
};

export default AddRuleForm;
