'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Mail,
  Phone,
  GraduationCap,
  Sparkles,
  Building,
  ArrowRight,
  ShieldCheck,
  Code2,
} from 'lucide-react';
import { activeDrive } from '@/lib/seedData';
import { calculateCandidateScore } from '@/lib/utils';

export default function CandidatePortal() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: 'male',
    dobMonth: '05',
    dobYear: '2003',
    collegeName: '',
    collegeTier: 'Tier 1' as 'Tier 1' | 'Tier 2' | 'Tier 3',
    highestDegree: 'B.Tech' as 'B.Tech' | 'M.Tech' | 'MCA' | 'BCA' | 'B.Sc' | 'Other',
    yearOfPassing: '2026',
    tenthMarks: '94.6',
    twelfthMarks: '92.4',
    graduationMarks: '9.35',
    postGradMarks: '',
    internshipAvailability: 'cycle1',
    preferredTrack: 'Next.js 15 App Router & Cloud Native Systems',
    preferredLocation: 'Work From Home',
    githubUrl: 'https://github.com/yash560',
    portfolioUrl: 'https://thewebvale.com',
    resumeFileName: 'Yash_Jain_FullStack_Resume.pdf',
  });

  // OTP State
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [demoOtpHint, setDemoOtpHint] = useState('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Live Score Preview
  const { atsScore, overallScore } = calculateCandidateScore(
    parseFloat(formData.graduationMarks || '8.5'),
    parseFloat(formData.tenthMarks || '85'),
    parseFloat(formData.twelfthMarks || '85'),
    formData.collegeTier,
    88
  );

  // Auto-fill demo candidate credentials
  const handleAutoFill = () => {
    setFormData({
      fullName: 'Alex Vance',
      email: 'alex.vance@example.com',
      phone: '9876543210',
      gender: 'male',
      dobMonth: '05',
      dobYear: '2003',
      collegeName: 'National Institute of Technology (NIT)',
      collegeTier: 'Tier 1',
      highestDegree: 'B.Tech',
      yearOfPassing: '2026',
      tenthMarks: '94.6',
      twelfthMarks: '92.4',
      graduationMarks: '9.35',
      postGradMarks: '',
      internshipAvailability: 'cycle1',
      preferredTrack: 'Next.js 15 App Router & Cloud Native Systems',
      preferredLocation: 'Work From Home',
      githubUrl: 'https://github.com/yash560',
      portfolioUrl: 'https://thewebvale.com',
      resumeFileName: 'Yash_Jain_FullStack_Engineer.pdf',
    });
    setIsEmailVerified(true);
    setOtpSent(true);
    setErrorMessage('');
  };

  // Send OTP
  const handleSendOtp = async () => {
    if (!formData.email || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    setOtpLoading(true);
    setErrorMessage('');
    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send', email: formData.email }),
      });
      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
        setDemoOtpHint(data.debugOtp || '742918');
        setOtpCode(data.debugOtp || '742918');
      }
    } catch {
      setErrorMessage('Failed to trigger OTP verification service.');
    } finally {
      setOtpLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!otpCode || otpCode.length !== 6) {
      setErrorMessage('Please enter a 6-digit verification code.');
      return;
    }
    setOtpLoading(true);
    setErrorMessage('');
    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify',
          email: formData.email,
          otp: otpCode,
        }),
      });
      const data = await res.json();
      if (data.verified) {
        setIsEmailVerified(true);
      } else {
        setErrorMessage(data.message || 'Invalid code.');
      }
    } catch {
      setErrorMessage('Error verifying OTP.');
    } finally {
      setOtpLoading(false);
    }
  };

  // Submit Application
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailVerified) {
      setErrorMessage('Please verify your email address before submitting.');
      return;
    }
    if (!formData.fullName.trim() || !formData.collegeName.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          driveId: activeDrive.id,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          gender: formData.gender,
          dob: `${formData.dobYear}-${formData.dobMonth}`,
          collegeName: formData.collegeName,
          collegeTier: formData.collegeTier,
          highestDegree: formData.highestDegree,
          yearOfPassing: formData.yearOfPassing,
          marks: {
            tenth: formData.tenthMarks,
            twelfth: formData.twelfthMarks,
            graduation: formData.graduationMarks,
            ...(formData.postGradMarks ? { postGrad: formData.postGradMarks } : {}),
          },
          internshipAvailability: formData.internshipAvailability,
          preferredTrack: formData.preferredTrack,
          preferredLocation: formData.preferredLocation,
          githubUrl: formData.githubUrl,
          portfolioUrl: formData.portfolioUrl,
          resumeFileName: formData.resumeFileName,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmissionSuccess(data.application);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        setErrorMessage(data.message || 'Submission failed.');
      }
    } catch {
      setErrorMessage('Network error while submitting application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Drive Metadata Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
            <Building className="w-4 h-4" />
            {activeDrive.company} • Full Stack Development
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {activeDrive.name}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Ambsta Token: <code className="font-mono text-indigo-500">7d62996e835a7efd</code> •
            Stipend: <strong className="text-slate-800 dark:text-slate-200">₹25,000 /month</strong> • PPO
            CTC: <strong className="text-slate-800 dark:text-slate-200">₹4.2 - 6.0 LPA</strong>
          </p>
        </div>

        <button
          type="button"
          onClick={handleAutoFill}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/80 hover:bg-indigo-100 dark:hover:bg-indigo-900 border border-indigo-200 dark:border-indigo-800 transition-colors shadow-sm shrink-0"
        >
          <Sparkles className="w-4 h-4 text-indigo-500" />
          Auto-Fill Demo Profile
        </button>
      </div>

      {/* Success Modal / Banner */}
      {submissionSuccess ? (
        <div className="p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-emerald-950 dark:text-emerald-200">
              Application Successfully Registered!
            </h2>
            <p className="text-sm text-emerald-800 dark:text-emerald-300 max-w-lg mx-auto mt-2">
              Your application for <strong>Creative Squad Private Limited</strong> has been recorded in
              the live Ambsta candidate matrix with Candidate ID{' '}
              <code className="font-mono font-bold">{submissionSuccess.id}</code>.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-emerald-200/60 dark:border-emerald-800/60 max-w-2xl mx-auto text-left">
            <div>
              <div className="text-[11px] text-slate-500">Applicant</div>
              <div className="font-bold text-slate-900 dark:text-white text-sm truncate">
                {submissionSuccess.fullName}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500">ATS Score</div>
              <div className="font-bold text-indigo-600 text-sm">
                {submissionSuccess.atsScore} / 100
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500">College Tier</div>
              <div className="font-bold text-slate-900 dark:text-white text-sm">
                {submissionSuccess.collegeTier}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500">Status</div>
              <div className="font-bold text-emerald-600 text-sm capitalize">
                {submissionSuccess.status.replace('_', ' ')}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/assessments"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all hover:scale-105"
            >
              <Code2 className="w-4 h-4" />
              Proceed to Assessment Hub
            </Link>
            <Link
              href="/recruiter"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-all"
            >
              View in Recruiter Matrix
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-sm font-medium">
              ⚠️ {errorMessage}
            </div>
          )}

          {/* Section 1: Personal Details */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 font-bold text-slate-900 dark:text-white">
              <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs flex items-center justify-center">
                1
              </span>
              Personal Identification
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Vance"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Gender *
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Date of Birth (Month / Year) *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={formData.dobMonth}
                    onChange={(e) => setFormData({ ...formData, dobMonth: e.target.value })}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                  >
                    {[
                      '01',
                      '02',
                      '03',
                      '04',
                      '05',
                      '06',
                      '07',
                      '08',
                      '09',
                      '10',
                      '11',
                      '12',
                    ].map((m) => (
                      <option key={m} value={m}>
                        Month {m}
                      </option>
                    ))}
                  </select>
                  <select
                    value={formData.dobYear}
                    onChange={(e) => setFormData({ ...formData, dobYear: e.target.value })}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                  >
                    {['2001', '2002', '2003', '2004', '2005', '2006'].map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number (10 digits) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs font-semibold text-slate-400">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value.replace(/\D/g, ''),
                      })
                    }
                    className="w-full pl-12 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Email & Ambsta OTP Verification */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 font-bold text-slate-900 dark:text-white">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs flex items-center justify-center">
                  2
                </span>
                Ambsta Email OTP Verification
              </div>
              {isEmailVerified && (
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Email Verified
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    disabled={isEmailVerified}
                    placeholder="yaashjainn@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
                  />
                </div>
                {!isEmailVerified && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={otpLoading || !formData.email}
                    className="px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-sm shrink-0"
                  >
                    {otpLoading ? 'Sending...' : otpSent ? 'Resend OTP' : 'Send Email OTP'}
                  </button>
                )}
              </div>

              {otpSent && !isEmailVerified && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Enter the 6-Digit OTP sent to your email:
                    </span>
                    {demoOtpHint && (
                      <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded">
                        Demo OTP Code: {demoOtpHint}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="742918"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.trim())}
                      className="w-36 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono tracking-widest text-center text-sm font-bold"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={otpLoading}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm"
                    >
                      Verify Code
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Academic Qualifications */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 font-bold text-slate-900 dark:text-white">
              <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs flex items-center justify-center">
                3
              </span>
              Academic Credentials & Marks Matrix
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  College / Institute Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. National Institute of Technology (NIT)"
                  value={formData.collegeName}
                  onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  College Tier *
                </label>
                <select
                  value={formData.collegeTier}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      collegeTier: e.target.value as any,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                >
                  <option value="Tier 1">Tier 1 (IIT / NIT / BITS / Top Univ)</option>
                  <option value="Tier 2">Tier 2 (State Govt / Reputed Tech)</option>
                  <option value="Tier 3">Tier 3 (Affiliated / Regional)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Highest Degree *
                </label>
                <select
                  value={formData.highestDegree}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      highestDegree: e.target.value as any,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                >
                  <option value="B.Tech">B.Tech / B.E.</option>
                  <option value="M.Tech">M.Tech / M.E.</option>
                  <option value="MCA">MCA (Master of Computer Apps)</option>
                  <option value="BCA">BCA (Bachelor of Computer Apps)</option>
                  <option value="B.Sc">B.Sc Computer Science</option>
                  <option value="Other">Other Equivalent Degree</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Year of Passing *
                </label>
                <select
                  value={formData.yearOfPassing}
                  onChange={(e) => setFormData({ ...formData, yearOfPassing: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                >
                  <option value="2026">2026 Batch</option>
                  <option value="2027">2027 Batch</option>
                  <option value="2025">2025 Batch</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  10th Percentage / CGPA *
                </label>
                <input
                  type="text"
                  required
                  placeholder="94.6"
                  value={formData.tenthMarks}
                  onChange={(e) => setFormData({ ...formData, tenthMarks: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  12th Percentage / CGPA *
                </label>
                <input
                  type="text"
                  required
                  placeholder="92.4"
                  value={formData.twelfthMarks}
                  onChange={(e) => setFormData({ ...formData, twelfthMarks: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Graduation Marks (CGPA or %) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="9.35"
                  value={formData.graduationMarks}
                  onChange={(e) => setFormData({ ...formData, graduationMarks: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                />
              </div>

              {(formData.highestDegree === 'M.Tech' || formData.highestDegree === 'MCA') && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Post Graduation Marks (CGPA)
                  </label>
                  <input
                    type="text"
                    placeholder="8.8"
                    value={formData.postGradMarks}
                    onChange={(e) => setFormData({ ...formData, postGradMarks: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Section 4: Internship Programme Preferences */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 font-bold text-slate-900 dark:text-white">
              <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs flex items-center justify-center">
                4
              </span>
              Internship Programme & Track Preferences
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Internship Availability Cycle *
                </label>
                <select
                  value={formData.internshipAvailability}
                  onChange={(e) =>
                    setFormData({ ...formData, internshipAvailability: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                >
                  {activeDrive.internshipCycles.map((cycle) => (
                    <option key={cycle.id} value={cycle.id}>
                      {cycle.label} — {cycle.period}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Preferred Location *
                </label>
                <select
                  value={formData.preferredLocation}
                  onChange={(e) =>
                    setFormData({ ...formData, preferredLocation: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                >
                  {activeDrive.locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Technical Track Specialization *
                </label>
                <select
                  value={formData.preferredTrack}
                  onChange={(e) => setFormData({ ...formData, preferredTrack: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                >
                  {activeDrive.tracks.map((track) => (
                    <option key={track} value={track}>
                      {track}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 5: Links & ATS Live Score */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 font-bold text-slate-900 dark:text-white">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs flex items-center justify-center">
                  5
                </span>
                Portfolio & Dynamic Qualification Score
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Live ATS Match:</span>
                <span className="font-mono font-bold text-indigo-600 text-sm">
                  {atsScore} / 100
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  GitHub Profile URL
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/yash560"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Portfolio / Projects URL
                </label>
                <input
                  type="url"
                  placeholder="https://thewebvale.com"
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Attached Resume File
                </label>
                <div className="p-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/40">
                  <span className="font-mono">{formData.resumeFileName}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-semibold">
                    ATS Passed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-between pt-4">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
            >
              ← Back to Overview
            </Link>

            <button
              type="submit"
              disabled={isSubmitting || !isEmailVerified}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-lg shadow-indigo-600/25 disabled:opacity-50 transition-all hover:scale-[1.02]"
            >
              {isSubmitting ? 'Registering Application...' : 'Submit Application to Ambsta Drive'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
