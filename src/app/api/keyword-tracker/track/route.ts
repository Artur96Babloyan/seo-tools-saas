import { NextResponse } from 'next/server';
import { z } from 'zod';
import { keywordTracker } from '@/services/keywordTracker';
import { isValidGoogleDomain, getGoogleDomains } from '@/lib/googleDomains';

// Helper function to extract country code from Google domain
function extractCountryCode(googleDomain: string): string {
  const domains = getGoogleDomains();
  const domain = domains.find(d => d.value === googleDomain.toLowerCase());
  
  if (!domain || !domain.countryCode) {
    throw new Error(`Invalid Google domain: ${googleDomain}`);
  }

  return domain.countryCode;
}

// Validation schema
const keywordTrackingSchema = z.object({
  domain: z.string()
    .min(1, "Domain is required")
    .max(255, "Domain is too long")
    .regex(/^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/, "Invalid domain format"),
  
  keywords: z.array(z.string()
    .min(1, "Keywords cannot be empty")
    .max(100, "Keywords must be less than 100 characters")
    .regex(/^[\p{L}\p{N}\s\-_.,!?'"()]+$/u, "Invalid characters in keyword"))
    .min(1, "At least one keyword is required")
    .max(10, "Maximum 10 keywords allowed"),
  
  location: z.string()
    .min(1, "Location is required")
    .transform((val) => val.toLowerCase())
    .refine((val) => isValidGoogleDomain(val), {
      message: "Invalid Google domain. Must be in format like 'google.com' or 'google.co.uk'"
    })
    .transform(extractCountryCode)
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = keywordTrackingSchema.parse(body);
    
    // Track keywords using the service
    const results = await keywordTracker.trackKeywords(
      validatedData.domain,
      validatedData.keywords
    );
    
    return NextResponse.json({
      success: true,
      data: {
        domain: validatedData.domain,
        location: validatedData.location,
        results
      }
    });
    
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.format() },
        { status: 400 }
      );
    }
    
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 