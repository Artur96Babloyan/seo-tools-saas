import { NextResponse } from 'next/server';

export async function GET() {
  const content = 'google-site-verification: google9a27825822572195.html';
  
  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
} 