import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
    const filename = params.filename;
    
    // Fetch the image from the backend
    const response = await fetch(`${API_BASE_URL}/uploads/avatars/${filename}`);
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Avatar not found' }, { status: 404 });
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
    return NextResponse.json({ error: 'Failed to fetch avatar' }, { status: 500 });
  }
} 