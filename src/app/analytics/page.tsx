'use client';

import React, { useEffect, useState } from 'react';
import {
  BarChart3,
  Users,
  Award,
  Zap,
  TrendingUp,
  Building,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { DriveAnalytics } from '@/lib/types';

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<DriveAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/analytics');
        const data = await res.json();
        if (data.success) {
          setAnalytics(data.analytics);
        }
      } catch (err) {
        console.error('Failed to load analytics:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !analytics) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-500 text-sm font-mono">
        Loading Drive Cohort Telemetry...
      </div>
    );
  }

  const kpis = [
    {
      label: 'Total Applications',
      value: analytics.totalApplications,
      icon: Users,
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/60',
    },
    {
      label: 'Average ATS Score',
      value: `${analytics.averageAtsScore} / 100`,
      icon: TrendingUp,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/60',
    },
    {
      label: 'Avg Coding Benchmark',
      value: `${analytics.averageCodingScore} / 100`,
      icon: Zap,
      color: 'text-cyan-600 dark:text-cyan-400',
      bg: 'bg-cyan-50 dark:bg-cyan-950/60',
    },
    {
      label: 'PPO Offers Extended',
      value: analytics.offersExtendedCount,
      icon: Award,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/60',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
          <BarChart3 className="w-4 h-4" />
          Creative Squad Private Limited • Drive Intelligence
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Ambsta Drive Cohort & Candidate Quality Analytics
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Telemetry compiled across active registrations for October Drive (token{' '}
          <code className="font-mono text-indigo-500">7d62996e835a7efd</code>)
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-slate-500">{kpi.label}</span>
                <div className={`p-2.5 rounded-xl ${kpi.bg}`}>
                  <Icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {kpi.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Breakdown Grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tier Distribution */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Building className="w-4 h-4 text-indigo-500" />
            College Tier Distribution
          </h2>
          <div className="space-y-3">
            {analytics.tierBreakdown.map((t) => (
              <div key={t.tier} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {t.tier}
                  </span>
                  <span className="text-slate-500 font-mono">
                    {t.count} candidates ({t.percentage}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${t.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Degree Breakdown */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-500" />
            Degree Qualification Mix
          </h2>
          <div className="space-y-3">
            {analytics.degreeBreakdown.map((d) => {
              const pct = Math.round((d.count / analytics.totalApplications) * 100);
              return (
                <div key={d.degree} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {d.degree}
                    </span>
                    <span className="text-slate-500 font-mono">
                      {d.count} candidates ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Funnel Pipeline Overview */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Hiring Pipeline Stage Conversion Funnel
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div className="text-[11px] text-slate-500 font-medium">1. Registered</div>
            <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              {analytics.totalApplications}
            </div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">100% Ingested</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div className="text-[11px] text-slate-500 font-medium">2. Screening Passed</div>
            <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
              {Math.round(analytics.totalApplications * 0.85)}
            </div>
            <div className="text-[10px] text-indigo-500 font-semibold mt-0.5">85% Qualified</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div className="text-[11px] text-slate-500 font-medium">3. Shortlisted</div>
            <div className="text-xl font-bold text-purple-600 dark:text-purple-400 mt-1">
              {analytics.shortlistedCount}
            </div>
            <div className="text-[10px] text-purple-500 font-semibold mt-0.5">Matrix Top Tier</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div className="text-[11px] text-slate-500 font-medium">4. Interviews</div>
            <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mt-1">
              {analytics.interviewScheduledCount}
            </div>
            <div className="text-[10px] text-cyan-500 font-semibold mt-0.5">Active Rounds</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div className="text-[11px] text-slate-500 font-medium">5. PPO Offers</div>
            <div className="text-xl font-bold text-amber-600 dark:text-amber-400 mt-1">
              {analytics.offersExtendedCount}
            </div>
            <div className="text-[10px] text-amber-500 font-semibold mt-0.5">Final Conversion</div>
          </div>
        </div>
      </div>
    </div>
  );
}
