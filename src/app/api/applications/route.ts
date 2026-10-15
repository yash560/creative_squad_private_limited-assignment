import { NextRequest, NextResponse } from 'next/server';
import {
  getStoredApplications,
  addApplication,
  updateApplicationStatus,
} from '@/lib/store';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search')?.toLowerCase() || '';
  const tier = searchParams.get('tier') || '';
  const degree = searchParams.get('degree') || '';
  const cycle = searchParams.get('cycle') || '';
  const status = searchParams.get('status') || '';
  const shortlistedOnly = searchParams.get('shortlistedOnly') === 'true';

  let applications = getStoredApplications();

  if (search) {
    applications = applications.filter(
      (app) =>
        app.fullName.toLowerCase().includes(search) ||
        app.email.toLowerCase().includes(search) ||
        app.collegeName.toLowerCase().includes(search)
    );
  }

  if (tier) {
    applications = applications.filter((app) => app.collegeTier === tier);
  }

  if (degree) {
    applications = applications.filter((app) => app.highestDegree === degree);
  }

  if (cycle) {
    applications = applications.filter((app) => app.internshipAvailability === cycle);
  }

  if (status) {
    applications = applications.filter((app) => app.status === status);
  }

  if (shortlistedOnly) {
    applications = applications.filter(
      (app) => app.status === 'shortlisted' || app.status === 'offer_extended'
    );
  }

  return NextResponse.json({
    success: true,
    total: applications.length,
    applications,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Required fields check
    if (!body.fullName || !body.email || !body.phone || !body.collegeName) {
      return NextResponse.json(
        { success: false, message: 'Please provide all required application details.' },
        { status: 400 }
      );
    }

    const application = addApplication({
      driveId: body.driveId || '6ac4b8f0e6703ebfc3ddb74c',
      fullName: body.fullName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      gender: body.gender || 'male',
      dob: body.dob || '2004-01',
      collegeName: body.collegeName.trim(),
      collegeTier: body.collegeTier || 'Tier 2',
      highestDegree: body.highestDegree || 'B.Tech',
      yearOfPassing: body.yearOfPassing || '2026',
      marks: {
        tenth: parseFloat(body.marks?.tenth || '85'),
        twelfth: parseFloat(body.marks?.twelfth || '85'),
        graduation: parseFloat(body.marks?.graduation || '8.5'),
        ...(body.marks?.postGrad ? { postGrad: parseFloat(body.marks.postGrad) } : {}),
      },
      internshipAvailability: body.internshipAvailability || 'cycle1',
      preferredTrack: body.preferredTrack || 'MERN Stack (React 19 + Node.js + Express + MongoDB)',
      preferredLocation: body.preferredLocation || 'Work From Home',
      githubUrl: body.githubUrl,
      portfolioUrl: body.portfolioUrl,
      resumeFileName: body.resumeFileName || `${body.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
      notes: body.notes,
    });

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully!',
      application,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Failed to submit application.' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: 'Application ID and status are required.' },
        { status: 400 }
      );
    }

    const updated = updateApplicationStatus(id, status, notes);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Application not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Status updated to ${status}`,
      application: updated,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Failed to update application.' },
      { status: 500 }
    );
  }
}
