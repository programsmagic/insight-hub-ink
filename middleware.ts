import { NextRequest, NextResponse } from 'next/server';

// #region agent log
const LOG_ENDPOINT = 'http://127.0.0.1:7242/ingest/c72d9968-db9a-43d8-a1fa-4300d5bc8db2';
const LOG_FILE = '/Users/prashantmishra/Developer/projects/insidhub.ink/.cursor/debug.log';

function logRequest(data: {
  location: string;
  message: string;
  data: Record<string, unknown>;
  hypothesisId?: string;
}) {
  const payload = {
    sessionId: 'debug-session',
    runId: 'run1',
    hypothesisId: data.hypothesisId || 'A',
    location: data.location,
    message: data.message,
    data: data.data,
    timestamp: Date.now(),
  };

  // Try HTTP logging first
  fetch(LOG_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {});

  // Fallback: file-based logging (Node.js only, won't work in Edge runtime)
  try {
    if (typeof process !== 'undefined' && process.versions?.node) {
      const fs = require('fs');
      const logLine = JSON.stringify(payload) + '\n';
      fs.appendFileSync(LOG_FILE, logLine, { flag: 'a' });
    }
  } catch (e) {
    // Ignore file write errors
  }
}
// #endregion agent log

export function middleware(request: NextRequest) {
  try {
    const { pathname, search } = request.nextUrl;
    const method = request.method;
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // #region agent log
    logRequest({
      location: 'middleware.ts:entry',
      message: 'Request received',
      data: {
        pathname,
        method,
        userAgent,
        ip: ip.split(',')[0],
        isGooglebot: /Googlebot|Google-InspectionTool/i.test(userAgent),
        search,
      },
      hypothesisId: 'A',
    });
    // #endregion agent log

  // Check if this is Googlebot
  const isGooglebot = /Googlebot|Google-InspectionTool/i.test(userAgent);
  
  // #region agent log
  logRequest({
    location: 'middleware.ts:googlebot-check',
    message: 'Googlebot detection',
    data: {
      isGooglebot,
      userAgent,
      pathname,
    },
    hypothesisId: 'B',
  });
  // #endregion agent log

  // Block API routes from being crawled (they should return 405, not 403)
  // This ensures all crawlers get proper 405 responses instead of 403
  // Exception: /api/health endpoint is allowed for GET requests (health check)
  if (pathname.startsWith('/api/') && pathname !== '/api/health') {
    // #region agent log
    logRequest({
      location: 'middleware.ts:api-route',
      message: 'API route accessed',
      data: {
        pathname,
        method,
        isGooglebot,
        shouldBlock: method === 'GET',
      },
      hypothesisId: 'C',
    });
    // #endregion agent log

    // Block GET requests to API routes (they should be POST-only)
    // This prevents 403 errors and returns proper 405 Method Not Allowed
    if (method === 'GET') {
      // #region agent log
      logRequest({
        location: 'middleware.ts:api-block',
        message: 'Blocking GET request to API route',
        data: {
          pathname,
          method,
          isGooglebot,
          userAgent,
        },
        hypothesisId: 'C',
      });
      // #endregion agent log
      
      // Return 405 Method Not Allowed instead of letting it through (which might return 403)
      const response = NextResponse.json(
        { 
          error: 'Method not allowed',
          message: 'This endpoint only accepts POST requests.',
        },
        { 
          status: 405, 
          headers: { 
            'Allow': 'POST',
            'Cache-Control': 'no-store',
            'X-Debug-Middleware': 'blocked-api-get',
            'X-Debug-Path': pathname,
            'X-Debug-Method': method,
          },
        }
      );
      
      // #region agent log
      logRequest({
        location: 'middleware.ts:api-block-response',
        message: 'Returning 405 for API GET request',
        data: {
          pathname,
          method,
          isGooglebot,
          responseStatus: 405,
        },
        hypothesisId: 'C',
      });
      // #endregion agent log
      
      return response;
    }
  }

  // #region agent log
  logRequest({
    location: 'middleware.ts:continue',
    message: 'Request allowed to continue',
    data: {
      pathname,
      method,
      isGooglebot,
      responseStatus: '200',
    },
    hypothesisId: 'A',
  });
  // #endregion agent log

  // Allow all other requests to continue
  const response = NextResponse.next();
  
  // Add debug headers to track middleware execution
  response.headers.set('X-Debug-Middleware', 'executed');
  response.headers.set('X-Debug-Path', pathname);
  response.headers.set('X-Debug-Method', method);
  response.headers.set('X-Debug-IsGooglebot', isGooglebot ? 'true' : 'false');
  
  // #region agent log
  logRequest({
    location: 'middleware.ts:response',
    message: 'Response created',
    data: {
      pathname,
      method,
      isGooglebot,
      status: response.status,
      headersAdded: true,
    },
    hypothesisId: 'A',
  });
  // #endregion agent log
  
  return response;
  } catch (error) {
    // #region agent log
    logRequest({
      location: 'middleware.ts:error',
      message: 'Middleware error',
      data: {
        error: error instanceof Error ? error.message : 'Unknown error',
        pathname: request.nextUrl.pathname,
      },
      hypothesisId: 'F',
    });
    // #endregion agent log
    
    // If middleware fails, still try to handle API routes
    const pathname = request.nextUrl.pathname;
    const method = request.method;
    
    if (pathname.startsWith('/api/') && pathname !== '/api/health' && method === 'GET') {
      return NextResponse.json(
        { 
          error: 'Method not allowed',
          message: 'This endpoint only accepts POST requests.',
        },
        { 
          status: 405, 
          headers: { 
            'Allow': 'POST',
            'Cache-Control': 'no-store',
            'X-Debug-Middleware': 'error-handler',
          },
        }
      );
    }
    
    // On error, allow request to continue (fallback)
    const fallbackResponse = NextResponse.next();
    fallbackResponse.headers.set('X-Debug-Middleware', 'error-fallback');
    return fallbackResponse;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     * 
     * This regex already matches all routes including /api/* routes
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
};

