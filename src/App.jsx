import React, { useState, useEffect } from 'react';

// Import custom hooks
import { useMessages } from './hooks/useMessages';
import { useRules } from './hooks/useRules';
import { useTest } from './hooks/useTest';
import { useCache } from './hooks/useCache';

// Import components
import Header from './components/common/Header';
import MessageDisplay from './components/common/MessageDisplay';
import TabNavigation from './components/common/TabNavigation';
import RulesTab from './components/rules/RulesTab';
import TestTab from './components/test/TestTab';
import CacheTab from './components/cache/CacheTab';

const App = () => {
  const [activeTab, setActiveTab] = useState('rules');

  // Use custom hooks for state management
  const { success, error, showMessage } = useMessages();
  const { rules, loading: rulesLoading, fetchRules, addRule, updateRule, deleteRule } = useRules(showMessage);
  const { testNote, setTestNote, testResults, loading: testLoading, testRules } = useTest(showMessage);
  const { cacheKey, setCacheKey, cachedData, loading: cacheLoading, getCacheData } = useCache(showMessage);

  useEffect(() => {
    if (activeTab === 'rules') {
      fetchRules();
    }
  }, [activeTab, fetchRules]);

    return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <MessageDisplay success={success} error={error} />

      <div className="max-w-6xl mx-auto px-6 py-6">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'rules' && (
          <RulesTab 
            rules={rules}
            loading={rulesLoading}
            onAddRule={addRule}
            onUpdateRule={updateRule}
            onDeleteRule={deleteRule}
          />
        )}

        {activeTab === 'test' && (
          <TestTab 
            testNote={testNote}
            onTestNoteChange={setTestNote}
            testResults={testResults}
            onTestRules={testRules}
            loading={testLoading}
          />
        )}

        {activeTab === 'cache' && (
          <CacheTab 
            cacheKey={cacheKey}
            onCacheKeyChange={setCacheKey}
            cachedData={cachedData}
            onGetCacheData={getCacheData}
            loading={cacheLoading}
          />
        )}
      </div>
    </div>
  );
};

export default App;