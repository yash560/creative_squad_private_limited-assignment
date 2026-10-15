'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Download,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  X,
  FileSpreadsheet,
} from 'lucide-react';
import GithubIcon from '@/components/GithubIcon';
import { CandidateApplication } from '@/lib/types';

export default function RecruiterMatrix() {
  const [candidates, setCandidates] = useState<CandidateApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('');
  const [degreeFilter, setDegreeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [shortlistedOnly, setShortlistedOnly] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateApplication | null>(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  // Fetch candidates from API
  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (tierFilter) params.set('tier', tierFilter);
      if (degreeFilter) params.set('degree', degreeFilter);
      if (statusFilter) params.set('status', statusFilter);
      if (shortlistedOnly) params.set('shortlistedOnly', 'true');

      const res = await fetch(`/api/applications?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setCandidates(data.applications);
      }
    } catch (err) {
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [search, tierFilter, degreeFilter, statusFilter, shortlistedOnly]);

  // Update candidate status
  const handleStatusChange = async (id: string, newStatus: CandidateApplication['status']) => {
    try {
      const res = await fetch('/api/applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setActionSuccessMsg(`Candidate updated to "${newStatus.replace('_', ' ')}"`);
        setTimeout(() => setActionSuccessMsg(''), 3000);
        // Update local state
        setCandidates((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
        );
        if (selectedCandidate?.id === id) {
          setSelectedCandidate((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  // CSV Export
  const handleExportCSV = () => {
    const headers = [
      'Candidate ID',
      'Full Name',
      'Email',
      'Phone',
      'College',
      'Tier',
      'Degree',
      'Graduation Marks',
      'Track',
      'Cycle',
      'ATS Score',
      'Coding Score',
      'Overall Score',
      'Status',
    ];

    const rows = candidates.map((c) => [
      c.id,
      `"${c.fullName}"`,
      c.email,
      c.phone,
      `"${c.collegeName}"`,
      c.collegeTier,
      c.highestDegree,
      c.marks.graduation,
      `"${c.preferredTrack}"`,
      c.internshipAvailability,
      c.atsScore,
      c.codingScore,
      c.overallScore,
      c.status,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CreativeSquad_Candidate_Matrix_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
            <Users className="w-4 h-4" />
            Creative Squad Private Limited • Talent Acquisition Hub
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Recruiter Candidate Shortlisting Matrix
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time candidate evaluation for Ambsta Drive token{' '}
            <code className="font-mono text-indigo-500">7d62996e835a7efd</code>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm transition-all"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            Export Matrix (CSV)
          </button>
          <Link
            href="/assessments"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Assessment Sandbox
          </Link>
        </div>
      </div>

      {actionSuccessMsg && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          {actionSuccessMsg}
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by name, college, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Tier Filter */}
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs"
          >
            <option value="">All College Tiers</option>
            <option value="Tier 1">Tier 1 (IIT/NIT/BITS)</option>
            <option value="Tier 2">Tier 2 (State Govt/Reputed)</option>
            <option value="Tier 3">Tier 3 (Affiliated)</option>
          </select>

          {/* Degree Filter */}
          <select
            value={degreeFilter}
            onChange={(e) => setDegreeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs"
          >
            <option value="">All Degrees</option>
            <option value="B.Tech">B.Tech / B.E.</option>
            <option value="M.Tech">M.Tech</option>
            <option value="MCA">MCA</option>
            <option value="BCA">BCA</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs"
          >
            <option value="">All Statuses</option>
            <option value="applied">Applied</option>
            <option value="screening_passed">Screening Passed</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interview_scheduled">Interview Scheduled</option>
            <option value="offer_extended">PPO Offer Extended</option>
          </select>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300 font-medium">
            <input
              type="checkbox"
              checked={shortlistedOnly}
              onChange={(e) => setShortlistedOnly(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            Show Shortlisted & Offered Candidates Only
          </label>

          <span className="text-slate-500 font-medium">
            Found <strong className="text-slate-900 dark:text-white">{candidates.length}</strong>{' '}
            candidates
          </span>
        </div>
      </div>

      {/* Candidates Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase font-semibold tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Candidate</th>
                <th className="px-5 py-3.5">College & Tier</th>
                <th className="px-5 py-3.5">Academics</th>
                <th className="px-5 py-3.5">Track & Cohort</th>
                <th className="px-5 py-3.5 text-center">Score (ATS / Code)</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-slate-500">
                    Loading candidate matrix...
                  </td>
                </tr>
              ) : candidates.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-slate-500">
                    No candidates match the specified criteria.
                  </td>
                </tr>
              ) : (
                candidates.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                    onClick={() => setSelectedCandidate(c)}
                  >
                    {/* Candidate Identity */}
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900 dark:text-white text-sm">
                        {c.fullName}
                      </div>
                      <div className="text-slate-500 text-[11px] font-mono">{c.email}</div>
                      <div className="text-slate-400 text-[10px] mt-0.5">+91 {c.phone}</div>
                    </td>

                    {/* College & Tier */}
                    <td className="px-5 py-4">
                      <div className="font-medium text-slate-900 dark:text-white truncate max-w-[180px]">
                        {c.collegeName}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            c.collegeTier === 'Tier 1'
                              ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300'
                              : c.collegeTier === 'Tier 2'
                              ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {c.collegeTier}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {c.highestDegree} ({c.yearOfPassing})
                        </span>
                      </div>
                    </td>

                    {/* Academics */}
                    <td className="px-5 py-4 font-mono">
                      <div>
                        Grad:{' '}
                        <strong className="text-slate-900 dark:text-white">
                          {c.marks.graduation}
                        </strong>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        12th: {c.marks.twelfth}% • 10th: {c.marks.tenth}%
                      </div>
                    </td>

                    {/* Track & Cohort */}
                    <td className="px-5 py-4">
                      <div className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[170px]">
                        {c.preferredTrack}
                      </div>
                      <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded mt-1 inline-block">
                        {c.internshipAvailability === 'cycle1' ? 'Cohort 1 (Jan-Feb)' : 'Cohort 2 (Mar-May)'}
                      </span>
                    </td>

                    {/* Scores */}
                    <td className="px-5 py-4 text-center">
                      <div className="font-extrabold text-sm text-indigo-600 dark:text-indigo-400">
                        {c.overallScore} / 100
                      </div>
                      <div className="text-[10px] text-slate-400">
                        ATS: {c.atsScore} • Code: {c.codingScore}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={c.status}
                        onChange={(e) => handleStatusChange(c.id, e.target.value as any)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                          c.status === 'offer_extended'
                            ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
                            : c.status === 'shortlisted' || c.status === 'interview_scheduled'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                            : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                        }`}
                      >
                        <option value="applied">Applied</option>
                        <option value="screening_passed">Screening Passed</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="assessment_pending">Assessment Pending</option>
                        <option value="interview_scheduled">Interview Scheduled</option>
                        <option value="offer_extended">PPO Offer Extended</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>

                    {/* Action */}
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCandidate(c);
                        }}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-indigo-600 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidate Details Modal / Drawer */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase font-semibold">
                  Candidate ID: {selectedCandidate.id}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {selectedCandidate.fullName}
                </h3>
                <p className="text-xs text-slate-500">{selectedCandidate.email} • +91 {selectedCandidate.phone}</p>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 text-center">
              <div>
                <div className="text-[11px] text-slate-500 font-medium">ATS Score</div>
                <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                  {selectedCandidate.atsScore} / 100
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-medium">Coding Score</div>
                <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                  {selectedCandidate.codingScore} / 100
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-500 font-medium">Overall Suitability</div>
                <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  {selectedCandidate.overallScore}%
                </div>
              </div>
            </div>

            {/* Academic Profile */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Academic Qualifications
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-400">College & Tier</div>
                  <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                    {selectedCandidate.collegeName}
                  </div>
                  <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">
                    {selectedCandidate.collegeTier}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-slate-400">Degree & Year</div>
                  <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                    {selectedCandidate.highestDegree} (Class of {selectedCandidate.yearOfPassing})
                  </div>
                  <span className="text-[10px] text-slate-500">Graduation Marks: {selectedCandidate.marks.graduation}</span>
                </div>
              </div>
            </div>

            {/* Assessment State */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Technical Assessment Log
              </h4>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-600 dark:text-slate-400">
                    Challenges Completed:
                  </span>
                  <span className="font-mono font-bold text-emerald-600">
                    {selectedCandidate.assessmentSubmission?.passedCount || 3} /{' '}
                    {selectedCandidate.assessmentSubmission?.totalCount || 3} Passed
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Track:</span>
                  <span>{selectedCandidate.preferredTrack}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                {selectedCandidate.githubUrl && (
                  <a
                    href={selectedCandidate.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 text-xs font-semibold"
                  >
                    <GithubIcon className="w-4 h-4" />
                    GitHub
                  </a>
                )}
                {selectedCandidate.portfolioUrl && (
                  <a
                    href={selectedCandidate.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 text-xs font-semibold"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Portfolio
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStatusChange(selectedCandidate.id, 'shortlisted')}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Shortlist Candidate
                </button>
                <button
                  onClick={() => handleStatusChange(selectedCandidate.id, 'offer_extended')}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700"
                >
                  Extend PPO Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
