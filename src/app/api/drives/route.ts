import { NextResponse } from 'next/server';
import { getStoredDrive } from '@/lib/store';

export async function GET() {
  const drive = getStoredDrive();
  return NextResponse.json({
    success: true,
    drive: {
      _id: drive.id,
      name: drive.name,
      company: drive.company,
      role: drive.role,
      token: drive.token,
      startDate: drive.startDate,
      endDate: drive.endDate,
      isActive: drive.isActive,
      internshipCycles: drive.internshipCycles,
      stipend: drive.stipend,
      ppoCtc: drive.ppoCtc,
      locations: drive.locations,
      tracks: drive.tracks,
      trainingDays: drive.trainingDays,
      internshipMonths: drive.internshipMonths,
    },
  });
}
