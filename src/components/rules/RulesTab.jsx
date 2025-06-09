import React from 'react';
import AddRuleForm from './AddRuleForm';
import RulesList from './RulesList';

const RulesTab = ({ rules, loading, onAddRule, onDeleteRule }) => {
  return (
    <div className="space-y-6">
      <AddRuleForm onAddRule={onAddRule} loading={loading} />
      <RulesList rules={rules} onDeleteRule={onDeleteRule} />
    </div>
  );
};

export default RulesTab;
