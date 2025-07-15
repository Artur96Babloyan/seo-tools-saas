import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.auditcraft.io';
    const apiRes = await fetch(`${API_BASE_URL}/api/seo/optimize-content`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await apiRes.json();
    return NextResponse.json(data, { status: apiRes.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to optimize content', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() });
} 