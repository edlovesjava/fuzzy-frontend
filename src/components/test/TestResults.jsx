import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const TestResults = ({ testResults }) => {
  if (!testResults) return null;

  return (
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
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{match.testString}</span>
                    {/* Exclude Flag Indicator */}
                    <div className="flex items-center space-x-1">
                      {match.exclude ? (
                        <>
                          <XCircle className="text-red-500" size={16} />
                          <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
                            Excluded
                          </span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="text-green-500" size={16} />
                          <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                            Included
                          </span>
                        </>
                      )}
                    </div>
                  </div>
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
  );
};

export default TestResults;
