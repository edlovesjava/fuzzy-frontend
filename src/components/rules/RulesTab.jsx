import React, { useState } from 'react';
import AddRuleForm from './AddRuleForm';
import RulesList from './RulesList';

const RulesTab = ({ rules, loading, onAddRule, onUpdateRule, onDeleteRule }) => {
  const [editingRule, setEditingRule] = useState(null);

  const handleEditRule = (rule) => {
    setEditingRule(rule);
  };

  const handleCancelEdit = () => {
    setEditingRule(null);
  };

  return (
    <div className="space-y-6">
      <AddRuleForm 
        onAddRule={onAddRule}
        onUpdateRule={onUpdateRule}
        loading={loading}
        editingRule={editingRule}
        onCancelEdit={handleCancelEdit}
      />
      <RulesList 
        rules={rules} 
        onDeleteRule={onDeleteRule}
        onEditRule={handleEditRule}
      />
    </div>
  );
};

export default RulesTab;
