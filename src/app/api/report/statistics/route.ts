import { NextResponse } from 'next/server';

export async function GET() {
  // Mock statistics data
  const mockStats = {
    totalReports: 0,
    totalWebsites: 0,
    averagePerformanceScore: 0,
    recentActivity: [
      { date: new Date().toISOString().split('T')[0], count: 0 }
    ]
  };

  return NextResponse.json({
    success: true,
    data: mockStats
  });
} 