import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateIN(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function formatTimeAgo(isoString: string): string {
  try {
    const diff = Date.now() - new Date(isoString).getTime();
    const mins = Math.floor(diff / (1000 * 60));
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  } catch {
    return 'Recently';
  }
}

export function calculateCandidateScore(
  graduationMarks: number,
  tenthMarks: number,
  twelfthMarks: number,
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3',
  codingScore: number = 0
): { atsScore: number; overallScore: number } {
  // Tier weighting
  const tierWeight = tier === 'Tier 1' ? 1.0 : tier === 'Tier 2' ? 0.9 : 0.82;
  
  // Normalization: Graduation (scale to 100 if CGPA <= 10)
  const gradNorm = graduationMarks <= 10 ? graduationMarks * 9.5 : graduationMarks;
  const tenthNorm = tenthMarks <= 10 ? tenthMarks * 9.5 : tenthMarks;
  const twelfthNorm = twelfthMarks <= 10 ? twelfthMarks * 9.5 : twelfthMarks;

  const academicAvg = (gradNorm * 0.5 + twelfthNorm * 0.25 + tenthNorm * 0.25);
  const atsScore = Math.min(99, Math.round(academicAvg * tierWeight * 0.95 + 4));

  // Overall combined score: 40% ATS / Academics + 60% Coding Assessment
  const overallScore = Math.min(100, Math.round(atsScore * 0.4 + (codingScore || 75) * 0.6));

  return { atsScore, overallScore };
}
