import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.auditcraft.io';

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(100, 'Last name is too long'),
  email: z.string().email('Invalid email address').max(255, 'Email is too long'),
  company: z.string().max(255, 'Company is too long').optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000, 'Message is too long'),
  // Optional subject if frontend supplies it
  subject: z.string().max(100, 'Subject is too long').optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = contactSchema.parse(body);

    // Conform to backend shape: omit subject, optionally prefix into message
    const { subject, ...rest } = validated as typeof validated & { subject?: string };
    const forwardBody = {
      ...rest,
      message: subject ? `Subject: ${subject}\n\n${rest.message}` : rest.message,
    };

    const res = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(forwardBody),
    });

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json().catch(() => ({ success: false, error: 'Invalid JSON from server' }));
      return NextResponse.json(data, { status: res.status });
    }
    const text = await res.text().catch(() => '');
    if (res.ok) {
      return NextResponse.json({ success: true, data: { message: text || 'OK' } }, { status: res.status });
    }
    return NextResponse.json(
      { success: false, error: text || `HTTP ${res.status}` },
      { status: res.status }
    );
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation error', details: error.format() },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() });
}


