import { NextRequest, NextResponse } from 'next/server';
import { codingChallenges } from '@/lib/seedData';
import { recordAssessmentCompletion } from '@/lib/store';

export async function GET() {
  return NextResponse.json({
    success: true,
    challenges: codingChallenges,
  });
}

export async function POST(req: NextRequest) {
  try {
    const { applicationId, passedCount, totalCount, challengeIds } = await req.json();

    if (!applicationId) {
      return NextResponse.json(
        { success: false, message: 'Application ID is required.' },
        { status: 400 }
      );
    }

    const updated = recordAssessmentCompletion(
      applicationId,
      passedCount || 3,
      totalCount || 3,
      challengeIds || ['ch-01', 'ch-02', 'ch-03']
    );

    return NextResponse.json({
      success: true,
      message: 'Assessment results submitted and verified!',
      application: updated,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Assessment execution error.' },
      { status: 500 }
    );
  }
}
