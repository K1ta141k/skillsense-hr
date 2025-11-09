/**
 * Candidate Profile Page
 * Display comprehensive candidate profile with all data sources
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { hrAPI } from '../utils/api';

interface CandidateProfileData {
  submission_id: string;
  user_id: string;
  user_email: string;
  personal_info: any;
  professional_summary: string;
  skills_summary: string;
  skills: any;
  work_history: any[];
  education: any[];
  certifications: any[];
  languages: any[];
  github_metrics: any;
  web_presence: any;
  stackoverflow_expertise: any;
  strengths: string[];
  areas_for_growth: string[];
  recommended_roles: string[];
  quality_scores: any;
  raw_data: any;
}

const CandidateProfile: React.FC = () => {
  const { submissionId } = useParams<{ submissionId: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<CandidateProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!submissionId) return;

      try {
        const response = await hrAPI.getCandidateProfile(submissionId);
        setProfile(response.data);
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Failed to load candidate profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [submissionId]);

  if (isLoading) {
    return (
      <Layout>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="mt-2 text-gray-600">Loading profile...</p>
        </div>
      </Layout>
    );
  }

  if (error || !profile) {
    return (
      <Layout>
        <div className="bg-red-50 p-6 rounded-lg">
          <p className="text-red-800">{error || 'Profile not found'}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Back to Dashboard
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {profile.personal_info?.name || 'No name available'}
              </h1>
              <p className="mt-1 text-sm text-gray-600">{profile.personal_info?.email}</p>
              {profile.personal_info?.location && (
                <p className="text-sm text-gray-500">{profile.personal_info.location}</p>
              )}
            </div>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Back
            </button>
          </div>

          {/* Links */}
          <div className="mt-4 flex space-x-4">
            {profile.personal_info?.github_url && (
              <a
                href={profile.personal_info.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                GitHub Profile →
              </a>
            )}
            {profile.personal_info?.linkedin_url && (
              <a
                href={profile.personal_info.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                LinkedIn Profile →
              </a>
            )}
            {profile.personal_info?.portfolio_url && (
              <a
                href={profile.personal_info.portfolio_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                Portfolio →
              </a>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {profile.professional_summary && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">{profile.professional_summary}</p>
          </div>
        )}

        {/* Skills Summary */}
        {profile.skills_summary && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Skills Overview</h2>
            <p className="text-gray-700 leading-relaxed">{profile.skills_summary}</p>
          </div>
        )}

        {/* Skills Detail */}
        {profile.skills && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.skills.technical_skills?.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Core Skills</h3>
                  <div className="space-y-1">
                    {profile.skills.technical_skills.map((skill: any, i: number) => (
                      <div key={i} className="text-sm">
                        <span className="font-medium">{skill.name || skill}</span>
                        {skill.proficiency && (
                          <span className="ml-2 text-gray-600">({skill.proficiency})</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {profile.skills.languages?.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Programming Languages</h3>
                  <div className="space-y-1">
                    {profile.skills.languages.map((lang: any, i: number) => (
                      <div key={i} className="text-sm">
                        <span className="font-medium">{lang.name || lang}</span>
                        {lang.proficiency && (
                          <span className="ml-2 text-gray-600">({lang.proficiency})</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {profile.skills.frameworks?.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Frameworks</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.frameworks.map((fw: any, i: number) => (
                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                        {fw.name || fw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {profile.skills.tools?.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.tools.map((tool: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Work History */}
        {profile.work_history?.length > 0 && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Work Experience</h2>
            <div className="space-y-4">
              {profile.work_history.map((job: any, i: number) => (
                <div key={i} className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company}</p>
                  <p className="text-xs text-gray-500">
                    {job.start_date} - {job.end_date || 'Present'}
                  </p>
                  {job.description && (
                    <p className="mt-2 text-sm text-gray-700">{job.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {profile.education?.length > 0 && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
            <div className="space-y-3">
              {profile.education.map((edu: any, i: number) => (
                <div key={i}>
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree} {edu.field_of_study}
                  </h3>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                  {edu.graduation_date && (
                    <p className="text-xs text-gray-500">Graduated: {edu.graduation_date}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GitHub Metrics */}
        {profile.github_metrics && Object.keys(profile.github_metrics).length > 0 && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">GitHub Activity</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {profile.github_metrics.activity_level && (
                <div>
                  <p className="text-sm text-gray-600">Activity Level</p>
                  <p className="text-lg font-semibold text-gray-900 capitalize">
                    {profile.github_metrics.activity_level}
                  </p>
                </div>
              )}
              {profile.github_metrics.commit_quality_score !== undefined && (
                <div>
                  <p className="text-sm text-gray-600">Code Quality</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {profile.github_metrics.commit_quality_score}/100
                  </p>
                </div>
              )}
              {profile.github_metrics.collaboration_score !== undefined && (
                <div>
                  <p className="text-sm text-gray-600">Collaboration</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {profile.github_metrics.collaboration_score}/100
                  </p>
                </div>
              )}
              {profile.github_metrics.public_repos && (
                <div>
                  <p className="text-sm text-gray-600">Public Repos</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {profile.github_metrics.public_repos}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Stack Overflow */}
        {profile.stackoverflow_expertise && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Stack Overflow</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Reputation</p>
                <p className="text-lg font-semibold text-gray-900">
                  {profile.stackoverflow_expertise.reputation?.toLocaleString()}
                </p>
              </div>
              {profile.stackoverflow_expertise.badges && (
                <>
                  <div>
                    <p className="text-sm text-gray-600">Gold Badges</p>
                    <p className="text-lg font-semibold text-yellow-600">
                      {profile.stackoverflow_expertise.badges.gold}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Silver Badges</p>
                    <p className="text-lg font-semibold text-gray-400">
                      {profile.stackoverflow_expertise.badges.silver}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Bronze Badges</p>
                    <p className="text-lg font-semibold text-orange-600">
                      {profile.stackoverflow_expertise.badges.bronze}
                    </p>
                  </div>
                </>
              )}
            </div>
            {profile.stackoverflow_expertise.expertise_areas?.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-2">Expertise Areas</p>
                <div className="flex flex-wrap gap-2">
                  {profile.stackoverflow_expertise.expertise_areas.map((area: string, i: number) => (
                    <span key={i} className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Strengths & Growth Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.strengths?.length > 0 && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Strengths</h2>
              <ul className="space-y-2">
                {profile.strengths.map((strength, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-sm text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {profile.areas_for_growth?.length > 0 && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Growth Areas</h2>
              <ul className="space-y-2">
                {profile.areas_for_growth.map((area, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-blue-600 mr-2">→</span>
                    <span className="text-sm text-gray-700">{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Recommended Roles */}
        {profile.recommended_roles?.length > 0 && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended Roles</h2>
            <div className="flex flex-wrap gap-3">
              {profile.recommended_roles.map((role, i) => (
                <span key={i} className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-lg font-medium">
                  {role}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CandidateProfile;
