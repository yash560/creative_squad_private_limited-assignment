import { activeDrive, initialCandidates } from './seedData';
import { CandidateApplication, Drive, DriveAnalytics } from './types';
import { calculateCandidateScore } from './utils';

// Global memory store for Next.js runtime
let globalApplications: CandidateApplication[] = [...initialCandidates];
let globalDrive: Drive = { ...activeDrive };

export function getStoredDrive(): Drive {
  return globalDrive;
}

export function getStoredApplications(): CandidateApplication[] {
  return globalApplications;
}

export function getApplicationById(id: string): CandidateApplication | undefined {
  return globalApplications.find((app) => app.id === id || app.email === id);
}

export function addApplication(
  data: Omit<
    CandidateApplication,
    'id' | 'atsScore' | 'overallScore' | 'codingScore' | 'status' | 'appliedAt'
  >
): CandidateApplication {
  const { atsScore, overallScore } = calculateCandidateScore(
    data.marks.graduation,
    data.marks.tenth,
    data.marks.twelfth,
    data.collegeTier,
    85
  );

  const newApp: CandidateApplication = {
    ...data,
    id: `cs-app-${Date.now().toString().slice(-6)}`,
    atsScore,
    codingScore: 85,
    overallScore,
    status: 'applied',
    appliedAt: new Date().toISOString(),
  };

  // Prepend to array
  globalApplications = [newApp, ...globalApplications];
  return newApp;
}

export function updateApplicationStatus(
  id: string,
  status: CandidateApplication['status'],
  notes?: string
): CandidateApplication | null {
  const index = globalApplications.findIndex((app) => app.id === id);
  if (index === -1) return null;

  globalApplications[index] = {
    ...globalApplications[index],
    status,
    ...(notes ? { notes } : {}),
  };

  return globalApplications[index];
}

export function recordAssessmentCompletion(
  id: string,
  passedCount: number,
  totalCount: number,
  challengeIds: string[]
): CandidateApplication | null {
  const index = globalApplications.findIndex((app) => app.id === id);
  if (index === -1) return null;

  const app = globalApplications[index];
  const newCodingScore = Math.round((passedCount / totalCount) * 100);
  const { overallScore } = calculateCandidateScore(
    app.marks.graduation,
    app.marks.tenth,
    app.marks.twelfth,
    app.collegeTier,
    newCodingScore
  );

  globalApplications[index] = {
    ...app,
    codingScore: newCodingScore,
    overallScore,
    status: passedCount >= 2 ? 'shortlisted' : 'applied',
    assessmentSubmission: {
      passedCount,
      totalCount,
      codeRunAt: new Date().toISOString(),
      challengesCompleted: challengeIds,
    },
  };

  return globalApplications[index];
}

export function getDriveAnalytics(): DriveAnalytics {
  const apps = globalApplications;
  const total = apps.length;

  const tierMap: Record<string, number> = { 'Tier 1': 0, 'Tier 2': 0, 'Tier 3': 0 };
  const degreeMap: Record<string, number> = {};
  const cycleMap: Record<string, number> = {};
  const trackMap: Record<string, number> = {};

  let sumAts = 0;
  let sumCoding = 0;
  let shortlisted = 0;
  let interviews = 0;
  let offers = 0;

  apps.forEach((app) => {
    sumAts += app.atsScore;
    sumCoding += app.codingScore;

    if (app.status === 'shortlisted') shortlisted++;
    if (app.status === 'interview_scheduled') interviews++;
    if (app.status === 'offer_extended') offers++;

    tierMap[app.collegeTier] = (tierMap[app.collegeTier] || 0) + 1;
    degreeMap[app.highestDegree] = (degreeMap[app.highestDegree] || 0) + 1;
    cycleMap[app.internshipAvailability] = (cycleMap[app.internshipAvailability] || 0) + 1;
    trackMap[app.preferredTrack] = (trackMap[app.preferredTrack] || 0) + 1;
  });

  return {
    totalApplications: total,
    verifiedEmailCount: total,
    shortlistedCount: shortlisted,
    interviewScheduledCount: interviews,
    offersExtendedCount: offers,
    averageAtsScore: total ? Math.round(sumAts / total) : 0,
    averageCodingScore: total ? Math.round(sumCoding / total) : 0,
    tierBreakdown: Object.entries(tierMap).map(([tier, count]) => ({
      tier,
      count,
      percentage: total ? Math.round((count / total) * 100) : 0,
    })),
    degreeBreakdown: Object.entries(degreeMap).map(([degree, count]) => ({ degree, count })),
    cycleBreakdown: Object.entries(cycleMap).map(([cycle, count]) => ({ cycle, count })),
    trackBreakdown: Object.entries(trackMap).map(([track, count]) => ({ track, count })),
  };
}
