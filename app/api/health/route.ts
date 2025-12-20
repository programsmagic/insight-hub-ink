import { NextRequest, NextResponse } from 'next/server';

/**
 * Health check endpoint to verify API routes are working
 * This endpoint accepts GET requests to test if the middleware and route handlers are functioning
 */
export async function GET(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const isGooglebot = /Googlebot|Google-InspectionTool/i.test(userAgent);
  
  return NextResponse.json(
    {
      status: 'ok',
      message: 'API routes are working correctly',
      timestamp: new Date().toISOString(),
      userAgent,
      isGooglebot,
      middleware: 'executed',
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
        'X-Debug-Health': 'true',
        'X-Debug-UserAgent': userAgent,
        'X-Debug-IsGooglebot': isGooglebot ? 'true' : 'false',
      },
    }
  );
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    {
      status: 'ok',
      message: 'POST requests are working',
    },
    { status: 200 }
  );
}

