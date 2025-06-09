import React from 'react';
import { Settings, Trash2, Edit } from 'lucide-react';

const RulesList = ({ rules, onDeleteRule, onEditRule }) => {
  return (
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
                </div>                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onEditRule(rule)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Edit rule"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => onDeleteRule(rule.encodedTestString)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete rule"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RulesList;
