import { Drive, CandidateApplication, CodingChallenge } from './types';

export const activeDrive: Drive = {
  id: '6ac4b8f0e6703ebfc3ddb74c',
  name: 'Internshala October Drive',
  company: 'Creative Squad Private Limited',
  role: 'Full Stack Development',
  token: '7d62996e835a7efd',
  startDate: '2026-10-06T00:00:00.000Z',
  endDate: '2026-10-20T00:00:00.000Z',
  isActive: true,
  trainingDays: 45,
  internshipMonths: 3,
  stipend: '₹ 25,000 /month',
  ppoCtc: '₹ 4.2 - 6.0 LPA',
  internshipCycles: [
    {
      id: 'cycle1',
      label: 'Cohort 1: Winter Immersion',
      period: "Jan - Feb '27 (45-Day Training)",
      stipend: '₹ 25,000 Total Stipend',
    },
    {
      id: 'cycle2',
      label: 'Cohort 2: Spring Production',
      period: "Mar - May '27 (3-Month Internship)",
      stipend: '₹ 25,000 /month + PPO Review',
    },
  ],
  locations: ['Work From Home', 'Bangalore', 'Pune', 'Delhi NCR', 'Hyderabad'],
  tracks: [
    'MERN Stack (React 19 + Node.js + Express + MongoDB)',
    'Enterprise NestJS + TypeScript Microservices',
    'Next.js 15 App Router & Cloud Native Systems',
    'Autonomous AI Agent & Tool Mesh Integration',
  ],
};

export const initialCandidates: CandidateApplication[] = [
  {
    id: 'cs-app-001',
    driveId: '6ac4b8f0e6703ebfc3ddb74c',
    fullName: 'Yash Jain',
    email: 'yaashjainn@gmail.com',
    phone: '9876543210',
    gender: 'male',
    dob: '2003-05',
    collegeName: 'National Institute of Technology (NIT)',
    collegeTier: 'Tier 1',
    highestDegree: 'B.Tech',
    yearOfPassing: '2026',
    marks: {
      tenth: 94.6,
      twelfth: 92.4,
      graduation: 9.35,
    },
    internshipAvailability: 'cycle1',
    preferredTrack: 'Next.js 15 App Router & Cloud Native Systems',
    preferredLocation: 'Work From Home',
    githubUrl: 'https://github.com/yash560',
    portfolioUrl: 'https://thewebvale.com',
    resumeFileName: 'Yash_Jain_FullStack_Resume.pdf',
    atsScore: 98,
    codingScore: 99,
    overallScore: 99,
    status: 'shortlisted',
    assessmentSubmission: {
      passedCount: 3,
      totalCount: 3,
      codeRunAt: '2026-10-14T18:30:00Z',
      challengesCompleted: ['ch-01', 'ch-02', 'ch-03'],
    },
    notes: 'Exemplary candidate with deep Next.js 15, React 19, and full-stack orchestration skills.',
    appliedAt: '2026-10-11T15:20:32Z',
  },
  {
    id: 'cs-app-002',
    driveId: '6ac4b8f0e6703ebfc3ddb74c',
    fullName: 'Ananya Sharma',
    email: 'ananya.sharma@iitd.ac.in',
    phone: '9811223344',
    gender: 'female',
    dob: '2004-02',
    collegeName: 'Indian Institute of Technology Delhi',
    collegeTier: 'Tier 1',
    highestDegree: 'B.Tech',
    yearOfPassing: '2026',
    marks: {
      tenth: 96.0,
      twelfth: 95.2,
      graduation: 9.1,
    },
    internshipAvailability: 'cycle1',
    preferredTrack: 'MERN Stack (React 19 + Node.js + Express + MongoDB)',
    preferredLocation: 'Delhi NCR',
    githubUrl: 'https://github.com/ananya-dev',
    resumeFileName: 'Ananya_IITD_CV.pdf',
    atsScore: 96,
    codingScore: 94,
    overallScore: 95,
    status: 'interview_scheduled',
    assessmentSubmission: {
      passedCount: 3,
      totalCount: 3,
      codeRunAt: '2026-10-12T10:15:00Z',
      challengesCompleted: ['ch-01', 'ch-02', 'ch-03'],
    },
    appliedAt: '2026-10-11T16:45:10Z',
  },
  {
    id: 'cs-app-003',
    driveId: '6ac4b8f0e6703ebfc3ddb74c',
    fullName: 'Rohan Kulkarni',
    email: 'rohan.kulkarni@coep.ac.in',
    phone: '9765432109',
    gender: 'male',
    dob: '2003-11',
    collegeName: 'COEP Technological University',
    collegeTier: 'Tier 1',
    highestDegree: 'B.Tech',
    yearOfPassing: '2026',
    marks: {
      tenth: 89.4,
      twelfth: 91.0,
      graduation: 8.7,
    },
    internshipAvailability: 'cycle2',
    preferredTrack: 'Enterprise NestJS + TypeScript Microservices',
    preferredLocation: 'Pune',
    githubUrl: 'https://github.com/rohankul',
    resumeFileName: 'Rohan_Kulkarni_Backend.pdf',
    atsScore: 90,
    codingScore: 88,
    overallScore: 89,
    status: 'screening_passed',
    assessmentSubmission: {
      passedCount: 2,
      totalCount: 3,
      codeRunAt: '2026-10-13T14:20:00Z',
      challengesCompleted: ['ch-01', 'ch-02'],
    },
    appliedAt: '2026-10-12T09:12:00Z',
  },
  {
    id: 'cs-app-004',
    driveId: '6ac4b8f0e6703ebfc3ddb74c',
    fullName: 'Pooja Iyer',
    email: 'pooja.iyer@vit.ac.in',
    phone: '9840123456',
    gender: 'female',
    dob: '2003-08',
    collegeName: 'Vellore Institute of Technology (VIT)',
    collegeTier: 'Tier 2',
    highestDegree: 'B.Tech',
    yearOfPassing: '2026',
    marks: {
      tenth: 92.5,
      twelfth: 88.0,
      graduation: 8.45,
    },
    internshipAvailability: 'cycle1',
    preferredTrack: 'MERN Stack (React 19 + Node.js + Express + MongoDB)',
    preferredLocation: 'Bangalore',
    githubUrl: 'https://github.com/poojaiyer',
    resumeFileName: 'Pooja_Iyer_FullStack.pdf',
    atsScore: 86,
    codingScore: 85,
    overallScore: 85,
    status: 'assessment_pending',
    appliedAt: '2026-10-12T11:40:00Z',
  },
  {
    id: 'cs-app-005',
    driveId: '6ac4b8f0e6703ebfc3ddb74c',
    fullName: 'Aditya Verma',
    email: 'aditya.verma@manipal.edu',
    phone: '9890123456',
    gender: 'male',
    dob: '2004-01',
    collegeName: 'Manipal Institute of Technology',
    collegeTier: 'Tier 2',
    highestDegree: 'B.Tech',
    yearOfPassing: '2027',
    marks: {
      tenth: 91.0,
      twelfth: 87.5,
      graduation: 8.2,
    },
    internshipAvailability: 'cycle2',
    preferredTrack: 'Autonomous AI Agent & Tool Mesh Integration',
    preferredLocation: 'Bangalore',
    githubUrl: 'https://github.com/adityaverma',
    resumeFileName: 'Aditya_Verma_Resume.pdf',
    atsScore: 84,
    codingScore: 82,
    overallScore: 83,
    status: 'applied',
    appliedAt: '2026-10-13T08:15:30Z',
  },
  {
    id: 'cs-app-006',
    driveId: '6ac4b8f0e6703ebfc3ddb74c',
    fullName: 'Sneha Patel',
    email: 'sneha.patel@nirmauni.ac.in',
    phone: '9924123890',
    gender: 'female',
    dob: '2003-09',
    collegeName: 'Nirma University',
    collegeTier: 'Tier 2',
    highestDegree: 'MCA',
    yearOfPassing: '2026',
    marks: {
      tenth: 88.0,
      twelfth: 86.4,
      graduation: 8.6,
      postGrad: 8.8,
    },
    internshipAvailability: 'cycle1',
    preferredTrack: 'MERN Stack (React 19 + Node.js + Express + MongoDB)',
    preferredLocation: 'Work From Home',
    resumeFileName: 'Sneha_Patel_MCA.pdf',
    atsScore: 87,
    codingScore: 90,
    overallScore: 89,
    status: 'offer_extended',
    assessmentSubmission: {
      passedCount: 3,
      totalCount: 3,
      codeRunAt: '2026-10-12T16:00:00Z',
      challengesCompleted: ['ch-01', 'ch-02', 'ch-03'],
    },
    notes: 'Outstanding MCA candidate, cleared technical interview with 9/10 score.',
    appliedAt: '2026-10-11T17:30:00Z',
  },
  {
    id: 'cs-app-007',
    driveId: '6ac4b8f0e6703ebfc3ddb74c',
    fullName: 'Vikram Sengupta',
    email: 'vikram.sengupta@ju.edu.in',
    phone: '9830112233',
    gender: 'male',
    dob: '2003-04',
    collegeName: 'Jadavpur University',
    collegeTier: 'Tier 1',
    highestDegree: 'B.Tech',
    yearOfPassing: '2026',
    marks: {
      tenth: 93.0,
      twelfth: 90.0,
      graduation: 8.9,
    },
    internshipAvailability: 'cycle1',
    preferredTrack: 'Enterprise NestJS + TypeScript Microservices',
    preferredLocation: 'Hyderabad',
    githubUrl: 'https://github.com/vikramsengupta',
    resumeFileName: 'Vikram_JU_Software.pdf',
    atsScore: 92,
    codingScore: 92,
    overallScore: 92,
    status: 'interview_scheduled',
    appliedAt: '2026-10-11T18:00:00Z',
  },
  {
    id: 'cs-app-008',
    driveId: '6ac4b8f0e6703ebfc3ddb74c',
    fullName: 'Meera Nambiar',
    email: 'meera.nambiar@cet.ac.in',
    phone: '9447123456',
    gender: 'female',
    dob: '2004-06',
    collegeName: 'College of Engineering Trivandrum',
    collegeTier: 'Tier 2',
    highestDegree: 'B.Tech',
    yearOfPassing: '2026',
    marks: {
      tenth: 95.0,
      twelfth: 93.0,
      graduation: 8.8,
    },
    internshipAvailability: 'cycle2',
    preferredTrack: 'Next.js 15 App Router & Cloud Native Systems',
    preferredLocation: 'Bangalore',
    githubUrl: 'https://github.com/meeranambiar',
    resumeFileName: 'Meera_Nambiar_Resume.pdf',
    atsScore: 89,
    codingScore: 87,
    overallScore: 88,
    status: 'screening_passed',
    appliedAt: '2026-10-12T14:10:00Z',
  },
];

export const codingChallenges: CodingChallenge[] = [
  {
    id: 'ch-01',
    title: 'Next.js 15 Distributed Token Bucket Rate Limiter',
    difficulty: 'Medium',
    track: 'React 19 & Next.js',
    description:
      'Creative Squad microservices receive high concurrency during drive registrations. Implement a token-bucket rate limiter for the `/api/applications` endpoint that tracks IP tokens, replenishes dynamically over time, and returns 429 when exhausted.',
    instructions: [
      'Initialize bucket with capacity and refill rate (tokens per second).',
      'Consume tokens when request arrives; if tokens < 1, throw or return { allowed: false, remainingTokens: 0 }.',
      'Refill tokens proportionally based on elapsed milliseconds.',
    ],
    starterCode: `// Rate Limiter Token Bucket Implementation
export class TokenBucketRateLimiter {
  private capacity: number;
  private refillRate: number; // tokens per second
  private tokens: number;
  private lastRefill: number;

  constructor(capacity = 10, refillRate = 2) {
    this.capacity = capacity;
    this.refillRate = refillRate;
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }

  public allowRequest(tokensToConsume = 1): { allowed: boolean; remainingTokens: number } {
    const now = Date.now();
    const elapsedSeconds = (now - this.lastRefill) / 1000;
    
    // Refill tokens
    this.tokens = Math.min(this.capacity, this.tokens + elapsedSeconds * this.refillRate);
    this.lastRefill = now;

    if (this.tokens >= tokensToConsume) {
      this.tokens -= tokensToConsume;
      return { allowed: true, remainingTokens: Math.floor(this.tokens) };
    }

    return { allowed: false, remainingTokens: Math.floor(this.tokens) };
  }
}
`,
    testCases: [
      {
        id: 1,
        description: 'Allows bursts up to capacity (10 requests)',
        expected: 'allowed: true',
      },
      {
        id: 2,
        description: 'Rejects request when capacity is fully depleted',
        expected: 'allowed: false (HTTP 429)',
      },
      {
        id: 3,
        description: 'Replenishes tokens after 1000ms delay',
        expected: 'allowed: true after refill',
      },
    ],
  },
  {
    id: 'ch-02',
    title: 'MongoDB Candidate Aggregation & Shortlist Matrix',
    difficulty: 'Hard',
    track: 'MongoDB Aggregations',
    description:
      'Build a MongoDB aggregation pipeline for Creative Squad to compute the candidate qualification matrix: filter by active drive, calculate normalized academic score across 10th/12th/Graduation, bucket by College Tier, and sort candidates by overall suitability.',
    instructions: [
      'Filter candidates where `driveId` equals the target drive and `status != "rejected"`.',
      'Compute `$addFields` for `normalizedScore` combining 50% graduation, 25% 12th, 25% 10th.',
      'Group by `collegeTier` and compute `averageScore`, `candidateCount`, and `topCandidate`.',
    ],
    starterCode: `// MongoDB Aggregation Pipeline for Candidate Shortlisting
export function buildShortlistAggregation(driveId: string) {
  return [
    { $match: { driveId, status: { $ne: 'rejected' } } },
    {
      $addFields: {
        computedScore: {
          $add: [
            { $multiply: ['$marks.graduation', 5.0] }, // normalized to 50
            { $multiply: ['$marks.twelfth', 0.25] },
            { $multiply: ['$marks.tenth', 0.25] }
          ]
        }
      }
    },
    {
      $facet: {
        rankedCandidates: [
          { $sort: { computedScore: -1, 'marks.graduation': -1 } },
          { $limit: 50 },
          { $project: { fullName: 1, email: 1, collegeTier: 1, computedScore: 1, status: 1 } }
        ],
        tierStats: [
          {
            $group: {
              _id: '$collegeTier',
              count: { $sum: 1 },
              avgScore: { $avg: '$computedScore' }
            }
          }
        ]
      }
    }
  ];
}
`,
    testCases: [
      {
        id: 1,
        description: 'Correctly weights graduation marks at 50% and school marks at 25% each',
        expected: 'computedScore matches formula',
      },
      {
        id: 2,
        description: 'Separates outputs into rankedCandidates array and tierStats metrics',
        expected: 'Facet output has rankedCandidates & tierStats',
      },
    ],
  },
  {
    id: 'ch-03',
    title: 'React 19 Custom Hook: Real-Time Drive Sync & Optimistic Updates',
    difficulty: 'Medium',
    track: 'React 19 & Next.js',
    description:
      'Write a React 19 custom hook `useDriveApplication` using `useTransition` and optimistic state to allow immediate UI responses when recruiters change candidate status or candidates verify email OTPs.',
    instructions: [
      'Maintain an optimistic candidate list that immediately reflects changes before server confirmation.',
      'Revert state gracefully if the API mutation fails.',
      'Provide automatic revalidation and toast notifications.',
    ],
    starterCode: `// React 19 Optimistic Application State
'use client';
import { useOptimistic, useTransition } from 'react';

export function useOptimisticApplication(initialApplication: any, onServerUpdate: Function) {
  const [isPending, startTransition] = useTransition();
  const [optimisticApp, setOptimisticApp] = useOptimistic(
    initialApplication,
    (state, update: any) => ({ ...state, ...update })
  );

  const updateStatus = async (newStatus: string) => {
    startTransition(async () => {
      setOptimisticApp({ status: newStatus });
      try {
        await onServerUpdate(newStatus);
      } catch (err) {
        console.error('Rollback optimistic update:', err);
      }
    });
  };

  return { application: optimisticApp, updateStatus, isPending };
}
`,
    testCases: [
      {
        id: 1,
        description: 'Updates UI state synchronously within React transition boundary',
        expected: 'Instant optimistic UI render',
      },
      {
        id: 2,
        description: 'Handles server rejection without breaking component state',
        expected: 'Graceful rollback on error',
      },
    ],
  },
];
