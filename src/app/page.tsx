import React from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Users,
  Code2,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Clock,
  Sparkles,
  Award,
  Zap,
} from 'lucide-react';
import { activeDrive } from '@/lib/seedData';
import { formatDateIN } from '@/lib/utils';

export default function HomePage() {
  const pillars = [
    {
      title: 'Ambsta Candidate Portal',
      description:
        'Matches the Ambsta registration portal (token 7d62996e835a7efd) with OTP verification, academic qualification breakdown, and ATS score preview.',
      icon: Briefcase,
      href: '/candidate',
      badge: 'Interactive Form',
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'Recruiter Shortlist Matrix',
      description:
        'Filter candidates across College Tiers (Tier 1/2/3), Degrees (B.Tech/MCA), and Cohort Cycles with instant ranking and status transitions.',
      icon: Users,
      href: '/recruiter',
      badge: 'Command Center',
      gradient: 'from-indigo-600 to-purple-600',
    },
    {
      title: 'Full-Stack Code Sandbox',
      description:
        'Interactive developer challenges covering Next.js 15 rate limiting, MongoDB aggregation pipelines, and React 19 optimistic UI hooks with runnable tests.',
      icon: Code2,
      href: '/assessments',
      badge: 'Live Code Runner',
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      title: 'Drive Cohort Analytics',
      description:
        'Real-time funnel metrics tracking 45-day training cohort capacity, stipend allocations, academic averages, and PPO candidate conversion.',
      icon: BarChart3,
      href: '/analytics',
      badge: 'Telemetry',
      gradient: 'from-emerald-500 to-teal-600',
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 border-b border-slate-200/60 dark:border-slate-800/60 bg-gradient-to-b from-indigo-50/50 via-white to-transparent dark:from-slate-900/40 dark:via-slate-950 dark:to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              <Sparkles className="w-3.5 h-3.5" />
              Creative Squad Private Limited
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5" />
              Ambsta Drive Verified (7d62996e835a7efd)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              <Award className="w-3.5 h-3.5" />
              PPO Offer: ₹4.2 - 6.0 LPA
            </span>
          </div>

          {/* Main Headline */}
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6">
              CreativeSquad <span className="text-indigo-600 dark:text-indigo-400">HireOS</span>
              <br />
              Enterprise Recruitment & Assessment Platform
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
              Engineered for the Full Stack Development internship drive at Creative Squad Private
              Limited. Synchronizes candidate registration, academic qualification matrices,
              in-browser coding assessments, and recruiter pipeline workflows in a single production suite.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/candidate"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02]"
              >
                Launch Candidate Portal
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/recruiter"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:scale-[1.02]"
              >
                Recruiter Shortlist Matrix
              </Link>
              <Link
                href="/assessments"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Code2 className="w-4 h-4" />
                Live Code Sandbox
              </Link>
            </div>
          </div>

          {/* Quick Drive Stats Card */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur shadow-sm">
            <div>
              <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mb-1">
                <Building2 className="w-3.5 h-3.5 text-indigo-500" />
                Drive Entity
              </div>
              <div className="font-bold text-slate-900 dark:text-white truncate">
                {activeDrive.company}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mb-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Internship Stipend
              </div>
              <div className="font-bold text-slate-900 dark:text-white">{activeDrive.stipend}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-cyan-500" />
                Training Programme
              </div>
              <div className="font-bold text-slate-900 dark:text-white">45 Days + 3 Mos</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Drive Window
              </div>
              <div className="font-bold text-slate-900 dark:text-white text-xs truncate">
                {formatDateIN(activeDrive.startDate)} - {formatDateIN(activeDrive.endDate)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
            Integrated Campus Drive Ecosystem
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Everything required to administer, screen, assess, and convert top-tier Full Stack talent
            for Creative Squad Private Limited.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Link
                key={pillar.title}
                href={pillar.href}
                className="group relative p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${pillar.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>Explore Module</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Internship Programme Blueprint */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              Creative Squad Road to PPO
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
              Structured 3-Stage Full Stack Engineering Pipeline
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl mb-8">
              Based on Creative Squad&apos;s published hiring framework: candidates complete intensive
              training, deploy on production client platforms, and transition into high-growth full-time
              software engineering roles.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stage 1 */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
                <div className="text-xs font-bold text-indigo-400 mb-1">STAGE 1 • JAN-FEB 2027</div>
                <div className="text-lg font-bold mb-2">45-Day Training Immersion</div>
                <div className="text-2xl font-black text-white mb-3">₹25,000 Stipend</div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> MERN & NestJS deep dive
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Architecture best practices
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Real-time peer code reviews
                  </li>
                </ul>
              </div>

              {/* Stage 2 */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
                <div className="text-xs font-bold text-cyan-400 mb-1">STAGE 2 • MAR-MAY 2027</div>
                <div className="text-lg font-bold mb-2">3-Month Client Internship</div>
                <div className="text-2xl font-black text-white mb-3">₹25,000 /month</div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Client product deployment
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Location choice (WFH / Offices)
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> High-concurrency systems
                  </li>
                </ul>
              </div>

              {/* Stage 3 */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900/60 to-purple-900/60 border border-indigo-500/30 backdrop-blur">
                <div className="text-xs font-bold text-amber-400 mb-1">STAGE 3 • JUN-JUL 2027</div>
                <div className="text-lg font-bold mb-2">PPO Full-Time Offer</div>
                <div className="text-2xl font-black text-amber-300 mb-3">₹4.2 - 6.0 LPA</div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Permanent role confirmation
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Performance-based appraisal
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Equity & seniority path
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
