import { NextResponse } from 'next/server';
import { getDriveAnalytics } from '@/lib/store';

export async function GET() {
  const analytics = getDriveAnalytics();
  return NextResponse.json({
    success: true,
    analytics,
  });
}
