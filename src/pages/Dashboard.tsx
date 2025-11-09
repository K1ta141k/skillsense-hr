/**
 * Dashboard Page
 * Main HR dashboard for job description input and candidate matching
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { hrAPI } from '../utils/api';

const Dashboard: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (jobDescription.length < 50) {
      setError('Job description must be at least 50 characters long');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await hrAPI.matchCandidates(jobDescription);

      // Store results in session storage for the results page
      sessionStorage.setItem('matchResults', JSON.stringify(response.data));
      sessionStorage.setItem('jobDescription', jobDescription);

      // Navigate to results page
      navigate('/results');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to match candidates. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setJobDescription('');
    setError('');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">AI-Powered Candidate Matching</h2>
            <p className="mt-2 text-sm text-gray-600">
              Paste your job description below and our AI will analyze all candidates to find the best matches.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="job-description" className="block text-sm font-medium text-gray-700 mb-2">
                Job Description *
              </label>
              <textarea
                id="job-description"
                rows={15}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the complete job description here...&#10;&#10;Include:&#10;- Role title and level&#10;- Required technical skills&#10;- Years of experience&#10;- Responsibilities&#10;- Nice-to-have qualifications&#10;- Team and company culture"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-mono"
                required
              />
              <p className="mt-2 text-sm text-gray-500">
                {jobDescription.length} characters (minimum 50 required)
              </p>
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Clear
              </button>

              <button
                type="submit"
                disabled={isLoading || jobDescription.length < 50}
                className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Analyzing Candidates...</span>
                  </>
                ) : (
                  <span>Find Best Candidates</span>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">How it works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-indigo-600 font-bold text-lg mb-2">1. Analyze</div>
                <p className="text-sm text-gray-600">
                  Our AI analyzes your job description to understand key requirements, skills, and qualifications.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-indigo-600 font-bold text-lg mb-2">2. Match</div>
                <p className="text-sm text-gray-600">
                  We compare each candidate's comprehensive profile (CV, GitHub, web presence) against your requirements.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-indigo-600 font-bold text-lg mb-2">3. Recommend</div>
                <p className="text-sm text-gray-600">
                  Get detailed analysis with match scores, key strengths, concerns, and hiring recommendations for each candidate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
