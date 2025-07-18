import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
  
  try {
    // Try multiple possible avatar endpoints
    const endpoints = [
      `${API_BASE_URL}/uploads/avatars/${filename}`,
      `${API_BASE_URL}/api/user/avatar/${filename}`,
      `${API_BASE_URL}/avatars/${filename}`,
      `${API_BASE_URL}/static/avatars/${filename}`,
    ];

    let response: Response | null = null;
    let lastError: Error | null = null;

    for (const endpoint of endpoints) {
      try {
        console.log(`Trying to fetch avatar from: ${endpoint}`);
        response = await fetch(endpoint);
        
        if (response.ok) {
          console.log(`Successfully fetched avatar from: ${endpoint}`);
          break;
        }
      } catch (error) {
        console.log(`Failed to fetch from ${endpoint}:`, error);
        lastError = error as Error;
        continue;
      }
    }

    if (!response || !response.ok) {
      console.error('All avatar endpoints failed. Last error:', lastError);
      console.error('Attempted filename:', filename);
      console.error('API_BASE_URL:', API_BASE_URL);
      
      // Return a default avatar or error image
      return NextResponse.json({ 
        error: 'Avatar not found',
        message: `Could not find avatar: ${filename}`,
        triedEndpoints: endpoints
      }, { status: 404 });
    }

    // Get the image data
    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/png';

    // Return the image with proper headers
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
      },
    });
  } catch (error) {
    console.error('Error fetching avatar:', error);
    console.error('Attempted to fetch avatar with filename:', filename);
    console.error('API_BASE_URL:', API_BASE_URL);
    return NextResponse.json({ error: 'Failed to fetch avatar' }, { status: 500 });
  }
} 