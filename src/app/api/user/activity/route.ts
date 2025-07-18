import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
    const token = request.headers.get('authorization');
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '10';
    const page = searchParams.get('page') || '1';
    
    const response = await fetch(`${API_BASE_URL}/api/user/activity?limit=${limit}&page=${page}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': token }),
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error fetching user activity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user activity' },
      { status: 500 }
    );
  }
} 