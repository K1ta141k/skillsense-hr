/**
 * Results Page
 * Display AI-matched candidates with detailed analysis
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

interface CandidateMatch {
  candidate: {
    submission_id: string;
    name: string;
    email: string;
    location: string;
    github_url: string;
    linkedin_url: string;
    professional_summary: string;
  };
  analysis: {
    match_score: number;
    recommendation: string;
    key_strengths: string[];
    relevant_experience: string[];
    potential_concerns: string[];
    skill_gaps: string[];
    cultural_fit_indicators: string[];
    overall_assessment: string;
    interview_focus_areas: string[];
    compensation_expectations: string;
    availability_concerns: string;
  };
}

interface MatchResults {
  job_description: string;
  total_candidates_analyzed: number;
  total_matches_returned: number;
  matches: CandidateMatch[];
  analyzed_at: string;
}

const Results: React.FC = () => {
  const [results, setResults] = useState<MatchResults | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [expandedCandidates, setExpandedCandidates] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    // Load results from session storage
    const storedResults = sessionStorage.getItem('matchResults');
    const storedJobDescription = sessionStorage.getItem('jobDescription');

    if (!storedResults) {
      // No results found, redirect to dashboard
      navigate('/dashboard');
      return;
    }

    setResults(JSON.parse(storedResults));
    setJobDescription(storedJobDescription || '');
  }, [navigate]);

  const toggleExpanded = (submissionId: string) => {
    const newExpanded = new Set(expandedCandidates);
    if (newExpanded.has(submissionId)) {
      newExpanded.delete(submissionId);
    } else {
      newExpanded.add(submissionId);
    }
    setExpandedCandidates(newExpanded);
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation.toLowerCase()) {
      case 'highly recommended':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'recommended':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'maybe':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (!results) {
    return (
      <Layout>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="mt-2 text-gray-600">Loading results...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Candidate Match Results</h2>
              <p className="mt-1 text-sm text-gray-600">
                Analyzed {results.total_candidates_analyzed} candidates • Found {results.total_matches_returned} matches
              </p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
            >
              New Search
            </button>
          </div>

          {/* Job Description Summary */}
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
              View Job Description
            </summary>
            <div className="mt-2 p-4 bg-gray-50 rounded-md">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{jobDescription}</pre>
            </div>
          </details>
        </div>

        {/* Candidates List */}
        <div className="space-y-4">
          {results.matches.map((match, index) => {
            const isExpanded = expandedCandidates.has(match.candidate.submission_id);

            return (
              <div key={match.candidate.submission_id} className="bg-white shadow rounded-lg overflow-hidden">
                {/* Candidate Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {match.candidate.name || 'No name available'}
                          </h3>
                          <p className="text-sm text-gray-600">{match.candidate.email}</p>
                          {match.candidate.location && (
                            <p className="text-sm text-gray-500">{match.candidate.location}</p>
                          )}
                        </div>
                      </div>
                      {match.candidate.professional_summary && (
                        <p className="mt-3 text-sm text-gray-700 italic">
                          {match.candidate.professional_summary}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <div className="text-right">
                        <div className={`text-4xl font-bold ${getScoreColor(match.analysis.match_score)}`}>
                          {match.analysis.match_score}
                        </div>
                        <div className="text-xs text-gray-500">Match Score</div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRecommendationColor(match.analysis.recommendation)}`}>
                        {match.analysis.recommendation}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Summary */}
                <div className="p-6 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Strengths</h4>
                      <ul className="space-y-1">
                        {match.analysis.key_strengths.slice(0, 3).map((strength, i) => (
                          <li key={i} className="text-sm text-green-700 flex items-start">
                            <span className="mr-2">✓</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Potential Concerns</h4>
                      <ul className="space-y-1">
                        {match.analysis.potential_concerns.slice(0, 3).map((concern, i) => (
                          <li key={i} className="text-sm text-red-700 flex items-start">
                            <span className="mr-2">⚠</span>
                            <span>{concern}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Assessment:</span> {match.analysis.overall_assessment}
                    </p>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-6 border-t border-gray-200 space-y-6">
                    {/* Relevant Experience */}
                    {match.analysis.relevant_experience.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Relevant Experience</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {match.analysis.relevant_experience.map((exp, i) => (
                            <li key={i} className="text-sm text-gray-700">{exp}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Skill Gaps */}
                    {match.analysis.skill_gaps.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Skill Gaps</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {match.analysis.skill_gaps.map((gap, i) => (
                            <li key={i} className="text-sm text-gray-700">{gap}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Cultural Fit */}
                    {match.analysis.cultural_fit_indicators.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Cultural Fit Indicators</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {match.analysis.cultural_fit_indicators.map((indicator, i) => (
                            <li key={i} className="text-sm text-gray-700">{indicator}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Interview Focus Areas */}
                    {match.analysis.interview_focus_areas.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Interview Focus Areas</h4>
                        <div className="flex flex-wrap gap-2">
                          {match.analysis.interview_focus_areas.map((area, i) => (
                            <span key={i} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Additional Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Compensation Expectations:</span>
                        <span className="ml-2 text-sm text-gray-600">{match.analysis.compensation_expectations}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Availability Concerns:</span>
                        <span className="ml-2 text-sm text-gray-600">{match.analysis.availability_concerns}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer Actions */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                  <div className="flex space-x-3">
                    {match.candidate.github_url && (
                      <a
                        href={match.candidate.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        View GitHub
                      </a>
                    )}
                    {match.candidate.linkedin_url && (
                      <a
                        href={match.candidate.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        View LinkedIn
                      </a>
                    )}
                    <button
                      onClick={() => navigate(`/candidate/${match.candidate.submission_id}`)}
                      className="text-sm text-indigo-600 hover:text-indigo-800"
                    >
                      Full Profile
                    </button>
                  </div>

                  <button
                    onClick={() => toggleExpanded(match.candidate.submission_id)}
                    className="text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    {isExpanded ? 'Show Less' : 'Show More'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {results.matches.length === 0 && (
          <div className="bg-white shadow rounded-lg p-12 text-center">
            <p className="text-gray-600">No matching candidates found.</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="mt-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Try Another Search
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Results;
