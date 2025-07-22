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

    for (const endpoint of endpoints) {
      try {
        response = await fetch(endpoint);
        
        if (response.ok) {
          break;
        }
      } catch {
        continue;
      }
    }

    if (!response || !response.ok) {
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
  } catch {
    return NextResponse.json({ error: 'Failed to fetch avatar' }, { status: 500 });
  }
} 