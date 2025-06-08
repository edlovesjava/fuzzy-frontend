import React, { useState, useEffect } from 'react';
import { Search, Plus, Play, Eye, Settings, Database, Trash2, Edit } from 'lucide-react';

const API_BASE = 'http://localhost:8080/api';

const App = () => {
  const [activeTab, setActiveTab] = useState('rules');
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Rule form state
  const [newRule, setNewRule] = useState({
    testString: '',
    minConfidence: 80,
    fuzzyAlgorithmToUse: 'WRATIO',
    tagsToApply: [],
    enabled: true
  });

  // Test state
  const [testNote, setTestNote] = useState('');
  const [testResults, setTestResults] = useState(null);

  // Cache state
  const [cacheKey, setCacheKey] = useState('');
  const [cacheValues, setCacheValues] = useState([]);
  const [cachedData, setCachedData] = useState(null);

  const algorithms = [
    'PARTIAL_RATIO', 'TOKEN_SORT_RATIO', 'TOKEN_SET_RATIO', 'WRATIO',
    'PARTIAL_TOKEN_SORT_RATIO', 'PARTIAL_TOKEN_SET_RATIO', 'EXACT_MATCH'
  ];

  useEffect(() => {
    if (activeTab === 'rules') {
      fetchRules();
    }
  }, [activeTab]);

  const showMessage = (msg, type = 'success') => {
    if (type === 'success') {
      setSuccess(msg);
      setError('');
    } else {
      setError(msg);
      setSuccess('');
    }
    setTimeout(() => {
      setSuccess('');
      setError('');
    }, 3000);
  };

  const fetchRules = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/v2/rules`);
      const data = await response.json();
      setRules(data.rules || []);
    } catch (err) {
      showMessage('Failed to fetch rules', 'error');
    }
    setLoading(false);
  };

  const addRule = async () => {
    if (!newRule.testString.trim()) {
      showMessage('Test string is required', 'error');
      return;
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
        setNewRule({
          testString: '',
          minConfidence: 80,
          fuzzyAlgorithmToUse: 'WRATIO',
          tagsToApply: [],
          enabled: true
        });
        fetchRules();
      } else {
        showMessage('Failed to create rule', 'error');
      }
    } catch (err) {
      showMessage('Failed to create rule', 'error');
    }
    setLoading(false);
  };

  const deleteRule = async (encodedTestString) => {
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
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Fuzzy Match API</h1>
          <p className="text-gray-600">Manage rules, test matching, and cache data</p>
        </div>
      </div>

      {/* Messages */}
      {(success || error) && (
        <div className="max-w-6xl mx-auto px-6 py-2">
          <div className={`p-3 rounded-lg ${success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {success || error}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'rules', label: 'Rules', icon: Settings },
            { id: 'test', label: 'Test', icon: Play },
            { id: 'cache', label: 'Cache', icon: Database }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Rules Tab */}
        {activeTab === 'rules' && (
          <div className="space-y-6">
            {/* Add New Rule */}
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
                onClick={addRule}
                disabled={loading}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Rule'}
              </button>
            </div>

            {/* Rules List */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold flex items-center">
                  <Settings className="mr-2" size={20} />
                  Existing Rules ({rules.length})
                </h2>
              </div>
              
              <div className="divide-y">
                {rules.map((rule, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="font-medium">{rule.testString}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            rule.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {rule.enabled ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>Algorithm: {rule.fuzzyAlgorithmToUse}</div>
                          <div>Min Confidence: {rule.minConfidence}%</div>
                          {rule.tagsToApply?.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {rule.tagsToApply.map(tag => (
                                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteRule(rule.encodedTestString)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Test Tab */}
        {activeTab === 'test' && (
          <div className="space-y-6">
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
                    onChange={(e) => setTestNote(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Enter text to test against your rules..."
                  />
                </div>
                
                <button
                  onClick={testRules}
                  disabled={loading}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Testing...' : 'Test Rules'}
                </button>
              </div>
            </div>

            {/* Test Results */}
            {testResults && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">Test Results</h3>
                <div className="space-y-4">
                  <div className="text-sm text-gray-600">
                    <strong>Test Note:</strong> {testResults.testNote}
                  </div>
                  
                  {testResults.matches?.length > 0 ? (
                    <div className="space-y-3">
                      <h4 className="font-medium">Matches Found:</h4>
                      {testResults.matches.map((match, index) => (
                        <div key={index} className="border border-gray-200 rounded-md p-3">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium">{match.testString}</span>
                            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {match.confidence}% confidence
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            Algorithm: {match.fuzzyAlgorithmUsed}
                          </div>
                          {match.tagsToApply?.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {match.tagsToApply.map(tag => (
                                <span key={tag} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 italic">No matches found</div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cache Tab */}
        {activeTab === 'cache' && (
          <div className="space-y-6">
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
                    onChange={(e) => setCacheKey(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter cache key..."
                  />
                </div>
                
                <button
                  onClick={getCacheData}
                  disabled={loading}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Get Cache Data'}
                </button>
              </div>
            </div>

            {/* Cache Results */}
            {cachedData && (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;