import { NextRequest, NextResponse } from 'next/server';

/**
 * Standard GET handler for API routes that only accept POST
 * Returns 405 Method Not Allowed instead of 403 Forbidden
 */
export function createGetHandler(allowedMethods: string[] = ['POST']) {
  return async function GET(request: NextRequest) {
    return NextResponse.json(
      { 
        error: 'Method not allowed',
        message: `This endpoint only accepts ${allowedMethods.join(', ')} requests.`,
      },
      { 
        status: 405,
        headers: { 
          'Allow': allowedMethods.join(', '),
          'Cache-Control': 'no-store',
        },
      }
    );
  };
}

/**
 * Standard handler for unsupported HTTP methods
 */
export function createMethodNotAllowedHandler(allowedMethods: string[] = ['POST']) {
  return async function handler(request: NextRequest) {
    return NextResponse.json(
      { 
        error: 'Method not allowed',
        message: `This endpoint only accepts ${allowedMethods.join(', ')} requests.`,
      },
      { 
        status: 405,
        headers: { 
          'Allow': allowedMethods.join(', '),
          'Cache-Control': 'no-store',
        },
      }
    );
  };
}


