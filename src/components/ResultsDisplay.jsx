import React from 'react';

export default function ResultsDisplay({ results }) {
  const { analysis, brief } = results;

  return (
    <div className="mt-8 space-y-8">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Content Analysis
          </h3>
          <div className="mt-2 text-sm text-gray-500 whitespace-pre-wrap">
            {analysis}
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Content Brief
          </h3>
          <div className="mt-2 text-sm text-gray-500 whitespace-pre-wrap">
            {brief}
          </div>
        </div>
      </div>
    </div>
  );
}