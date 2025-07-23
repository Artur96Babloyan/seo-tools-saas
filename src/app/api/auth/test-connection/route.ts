import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
    
    console.log('Testing connection to:', API_BASE_URL);
    
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return NextResponse.json({
      success: true,
      backendUrl: API_BASE_URL,
      backendResponse: data,
      status: response.status
    });

  } catch (error) {
    console.error('Backend connection test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      backendUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'
    }, { status: 500 });
  }
} 