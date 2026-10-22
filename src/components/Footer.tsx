import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Overview */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 dark:text-white">
                CreativeSquad HireOS
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Production recruitment & campus drive intelligence portal architected for Creative Squad
              Private Limited. Synchronized with the Ambsta recruitment engine.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Drive Token Verified: 7d62996e835a7efd</span>
            </div>
          </div>

          {/* Col 2: Drive Specs */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Internship Programme
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <span className="font-medium text-slate-700 dark:text-slate-300">Phase 1:</span> 45-Day
                Training (₹25,000 Stipend)
              </li>
              <li>
                <span className="font-medium text-slate-700 dark:text-slate-300">Phase 2:</span> 3-Month
                Internship (₹25,000/mo)
              </li>
              <li>
                <span className="font-medium text-slate-700 dark:text-slate-300">Phase 3:</span> PPO
                Conversion (₹4.2 - 6.0 LPA)
              </li>
              <li>
                <span className="font-medium text-slate-700 dark:text-slate-300">Locations:</span> WFH /
                Bangalore, Pune, Delhi NCR
              </li>
            </ul>
          </div>

          {/* Col 3: Core Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/candidate" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Ambsta Candidate Registration
                </Link>
              </li>
              <li>
                <Link href="/recruiter" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Recruiter Shortlisting Matrix
                </Link>
              </li>
              <li>
                <Link href="/assessments" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Interactive Assessment Sandbox
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Drive Cohort Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Architecture */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Architecture
            </h4>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-medium text-xs mb-3">
              <span>⚡ Powered by TheWebVale</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-[11px] font-mono text-slate-700 dark:text-slate-300">
                Next.js 15
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-[11px] font-mono text-slate-700 dark:text-slate-300">
                React 19
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-[11px] font-mono text-slate-700 dark:text-slate-300">
                TypeScript
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-[11px] font-mono text-slate-700 dark:text-slate-300">
                Tailwind v4
              </span>
            </div>
            <div className="pt-1 flex items-center gap-3">
              <a
                href="https://thewebvale.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-500 hover:text-indigo-500 transition-colors flex items-center gap-1"
              >
                <span>TheWebVale</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Creative Squad Private Limited • Talent Acquisition & Campus Engineering</p>
          <div className="flex items-center gap-3">
            <span className="text-indigo-500 font-medium font-mono">⚡ Powered by TheWebVale</span>
            <span>•</span>
            <span>Production Grade Talent Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
