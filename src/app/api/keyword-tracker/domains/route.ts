import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // For now, return an empty array since we don't have persistent storage
    // TODO: Implement database storage and retrieval
    return NextResponse.json({
      success: true,
      data: {
        domains: []
      }
    });
  } catch (error) {
    console.error('Error fetching domains:', error);
    return NextResponse.json(
      { error: 'Failed to fetch domains' },
      { status: 500 }
    );
  }
} 