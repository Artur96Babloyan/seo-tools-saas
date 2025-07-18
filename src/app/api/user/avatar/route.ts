import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
    const token = request.headers.get('authorization');
    
    // Get the form data from the request
    const formData = await request.formData();
    
    const response = await fetch(`${API_BASE_URL}/api/user/avatar`, {
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': token }),
      },
      body: formData,
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error uploading avatar:', error);
    return NextResponse.json(
      { error: 'Failed to upload avatar' },
      { status: 500 }
    );
  }
} 