import React from 'react';
import TestForm from './TestForm';
import TestResults from './TestResults';

const TestTab = ({ testNote, onTestNoteChange, testResults, onTestRules, loading }) => {
  return (
    <div className="space-y-6">
      <TestForm 
        testNote={testNote}
        onTestNoteChange={onTestNoteChange}
        onTestRules={onTestRules}
        loading={loading}
      />
      <TestResults testResults={testResults} />
    </div>
  );
};

export default TestTab;
