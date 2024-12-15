import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from './components/LoadingSpinner';
import ResultsDisplay from './components/ResultsDisplay';
import { apiService } from './services/apiService';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState(true);

  useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    const status = await apiService.checkStatus();
    setApiStatus(status);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiStatus) {
      setError('API server is not running. Please start the server with "npm run start:api"');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const data = await apiService.analyzeKeyword(keyword);
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            AI Content Analyzer
          </h1>
          
          {!apiStatus && (
            <div className="mb-4 p-4 bg-yellow-50 rounded-md">
              <p className="text-yellow-700">
                ⚠️ API server is not running. Please start it with:
                <code className="mx-2 p-1 bg-yellow-100 rounded">npm run start:api</code>
              </p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your keyword or topic..."
                required
              />
              <button
                type="submit"
                disabled={loading || !apiStatus}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                    Analyze
                  </>
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {results && <ResultsDisplay results={results} />}
        </div>
      </div>
    </div>
  );
}