export interface Drive {
  id: string;
  name: string;
  company: string;
  role: string;
  token: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  internshipCycles: {
    id: string;
    label: string;
    period: string;
    stipend: string;
  }[];
  stipend: string;
  ppoCtc: string;
  locations: string[];
  tracks: string[];
  trainingDays: number;
  internshipMonths: number;
}

export interface CandidateApplication {
  id: string;
  driveId: string;
  fullName: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  dob: string;
  collegeName: string;
  collegeTier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  highestDegree: 'B.Tech' | 'M.Tech' | 'MCA' | 'BCA' | 'B.Sc' | 'Other';
  yearOfPassing: string;
  marks: {
    tenth: number;
    twelfth: number;
    graduation: number;
    postGrad?: number;
  };
  internshipAvailability: string;
  preferredTrack: string;
  preferredLocation: string;
  githubUrl?: string;
  portfolioUrl?: string;
  resumeFileName?: string;
  atsScore: number;
  codingScore: number;
  overallScore: number;
  status:
    | 'applied'
    | 'screening_passed'
    | 'shortlisted'
    | 'assessment_pending'
    | 'interview_scheduled'
    | 'offer_extended'
    | 'rejected';
  assessmentSubmission?: {
    passedCount: number;
    totalCount: number;
    codeRunAt: string;
    challengesCompleted: string[];
  };
  notes?: string;
  appliedAt: string;
}

export interface CodingChallenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  track: 'React 19 & Next.js' | 'Node.js & Express' | 'MongoDB Aggregations' | 'Full Stack System';
  description: string;
  instructions: string[];
  starterCode: string;
  testCases: {
    id: number;
    description: string;
    expected: string;
  }[];
}

export interface DriveAnalytics {
  totalApplications: number;
  verifiedEmailCount: number;
  shortlistedCount: number;
  interviewScheduledCount: number;
  offersExtendedCount: number;
  averageAtsScore: number;
  averageCodingScore: number;
  tierBreakdown: { tier: string; count: number; percentage: number }[];
  degreeBreakdown: { degree: string; count: number }[];
  cycleBreakdown: { cycle: string; count: number }[];
  trackBreakdown: { track: string; count: number }[];
}
