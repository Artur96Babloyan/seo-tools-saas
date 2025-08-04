import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export async function GET(request: NextRequest) {
  try {
    // Redirect to backend Google OAuth endpoint
    const googleAuthUrl = `${API_BASE_URL}/api/auth/google`;
    
    return NextResponse.redirect(googleAuthUrl);
  } catch (error) {
    console.error('Google OAuth redirect error:', error);
    return NextResponse.redirect(new URL('/auth/login?error=oauth_failed', request.url));
  }
} 