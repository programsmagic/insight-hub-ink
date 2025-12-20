import { NextRequest, NextResponse } from 'next/server';
import { createGetHandler } from '@/lib/api-route-helpers';

/**
 * Catch-all route handler for any API routes that don't have explicit handlers
 * This ensures all API routes return 405 instead of 403 for GET requests
 * 
 * Note: This will only catch routes that don't have their own route.ts file
 * Routes with explicit handlers will use their own GET handlers
 */
export const GET = createGetHandler(['POST']);

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { 
      error: 'Not found',
      message: 'This API endpoint does not exist or is not implemented.',
    },
    { status: 404 }
  );
}

export async function PUT(request: NextRequest) {
  return NextResponse.json(
    { 
      error: 'Method not allowed',
      message: 'This endpoint only accepts POST requests.',
    },
    { status: 405, headers: { 'Allow': 'POST' } }
  );
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json(
    { 
      error: 'Method not allowed',
      message: 'This endpoint only accepts POST requests.',
    },
    { status: 405, headers: { 'Allow': 'POST' } }
  );
}

export async function PATCH(request: NextRequest) {
  return NextResponse.json(
    { 
      error: 'Method not allowed',
      message: 'This endpoint only accepts POST requests.',
    },
    { status: 405, headers: { 'Allow': 'POST' } }
  );
}

