'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import {
  Briefcase,
  Users,
  Code2,
  BarChart3,
  Layers,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import GithubIcon from './GithubIcon';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Overview', href: '/', icon: Layers },
    { name: 'Ambsta Application', href: '/candidate', icon: Briefcase },
    { name: 'Recruiter Matrix', href: '/recruiter', icon: Users },
    { name: 'Assessment Hub', href: '/assessments', icon: Code2 },
    { name: 'Cohort Analytics', href: '/analytics', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-900 dark:text-white tracking-tight">
                    CreativeSquad
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded">
                    HireOS
                  </span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Ambsta Recruitment Matrix
                </span>
              </div>
            </Link>

            {/* Active Drive Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              October Drive 2026 • Live
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            <a
              href="https://ambsta.in/apply/7d62996e835a7efd"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors"
            >
              Ambsta Original
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://github.com/yash560/creative_squad_private_limited-assignment"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors shadow-sm"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
