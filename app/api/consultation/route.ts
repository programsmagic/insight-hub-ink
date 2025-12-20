import { NextRequest, NextResponse } from 'next/server';
import { consultationSchema, sanitizeInput } from '@/lib/validation';
import { logger } from '@/lib/logger';
import { consultationRateLimiter, getClientIdentifier } from '@/lib/rate-limit';

export const runtime = 'nodejs';

// #region agent log
const LOG_ENDPOINT = 'http://127.0.0.1:7242/ingest/c72d9968-db9a-43d8-a1fa-4300d5bc8db2';
function logRequest(data: { location: string; message: string; data: Record<string, unknown>; hypothesisId?: string }) {
  const payload = { sessionId: 'debug-session', runId: 'run1', hypothesisId: data.hypothesisId || 'E', location: data.location, message: data.message, data: data.data, timestamp: Date.now() };
  fetch(LOG_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).catch(() => {});
}
// #endregion agent log

// Handle GET requests (should return 405, not 403)
export async function GET(request: NextRequest) {
  // #region agent log
  logRequest({
    location: 'app/api/consultation/route.ts:GET',
    message: 'GET request to consultation API',
    data: {
      userAgent: request.headers.get('user-agent') || 'unknown',
      isGooglebot: /Googlebot|Google-InspectionTool/i.test(request.headers.get('user-agent') || ''),
    },
    hypothesisId: 'E',
  });
  // #endregion agent log
  
  return NextResponse.json(
    { error: 'Method not allowed. This endpoint only accepts POST requests.' },
    { status: 405, headers: { 'Allow': 'POST' } }
  );
}

export async function POST(request: NextRequest) {
  // #region agent log
  logRequest({
    location: 'app/api/consultation/route.ts:POST-entry',
    message: 'POST request received',
    data: {
      userAgent: request.headers.get('user-agent') || 'unknown',
      isGooglebot: /Googlebot|Google-InspectionTool/i.test(request.headers.get('user-agent') || ''),
    },
    hypothesisId: 'E',
  });
  // #endregion agent log
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimitResult = consultationRateLimiter.check(clientId);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000),
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
          },
        }
      );
    }

    // Parse and validate request body
    let body: unknown;
    try {
      body = await request.json();
    } catch (parseError) {
      logger.warn('Invalid JSON in consultation request', { error: parseError });
      return NextResponse.json(
        { error: 'Invalid request body. Expected JSON.' },
        { status: 400 }
      );
    }

    // Validate input using Zod schema
    const validationResult = consultationSchema.safeParse(body);
    
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      
      logger.warn('Consultation validation failed', { errors });
      
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: errors,
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(validatedData.name),
      email: validatedData.email.toLowerCase().trim(),
      phone: sanitizeInput(validatedData.phone),
      company: validatedData.company ? sanitizeInput(validatedData.company) : undefined,
      preferredDate: sanitizeInput(validatedData.preferredDate),
      preferredTime: sanitizeInput(validatedData.preferredTime),
      timezone: validatedData.timezone ? sanitizeInput(validatedData.timezone) : undefined,
      serviceInterest: sanitizeInput(validatedData.serviceInterest),
      currentPlatforms: validatedData.currentPlatforms ? sanitizeInput(validatedData.currentPlatforms) : undefined,
      goals: sanitizeInput(validatedData.goals),
      budget: validatedData.budget ? sanitizeInput(validatedData.budget) : undefined,
    };

    // TODO: Integrate with your backend/database service
    // Options:
    // 1. Send to email service (Resend, SendGrid, etc.)
    // 2. Save to database (Supabase, Firebase, etc.)
    // 3. Send to CRM (HubSpot, Salesforce, etc.)
    // 4. Create calendar event via API (Google Calendar, Calendly, etc.)
    
    // Example: Email notification (using Resend)
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'consultation@insighthub.ink',
    //   to: 'admin@insighthub.ink',
    //   subject: `New Consultation Request from ${sanitizedData.name}`,
    //   html: generateConsultationEmail(sanitizedData),
    // });

    // Example: Save to database (using Supabase)
    // const { data, error } = await supabase
    //   .from('consultations')
    //   .insert([{
    //     name: sanitizedData.name,
    //     email: sanitizedData.email,
    //     phone: sanitizedData.phone,
    //     company: sanitizedData.company,
    //     preferred_date: sanitizedData.preferredDate,
    //     preferred_time: sanitizedData.preferredTime,
    //     timezone: sanitizedData.timezone,
    //     service_interest: sanitizedData.serviceInterest,
    //     current_platforms: sanitizedData.currentPlatforms,
    //     goals: sanitizedData.goals,
    //     budget: sanitizedData.budget,
    //     status: 'pending',
    //     created_at: new Date().toISOString(),
    //   }]);

    // Log consultation request (without sensitive data)
    logger.info('Consultation request received', {
      name: sanitizedData.name,
      email: sanitizedData.email,
      serviceInterest: sanitizedData.serviceInterest,
      timestamp: new Date().toISOString(),
    });

    // Return success response
    return NextResponse.json(
      { 
        success: true,
        message: 'Consultation request received successfully',
        data: {
          id: `consultation_${Date.now()}`,
          status: 'pending',
        }
      },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
        },
      }
    );
  } catch (error) {
    logger.error('Consultation API error', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// Example email template function (uncomment when using email service)
/*
function generateConsultationEmail(body: any) {
  return `
    <html>
      <body>
        <h2>New Consultation Request</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Company:</strong> ${body.company || 'N/A'}</p>
        <p><strong>Preferred Date:</strong> ${body.preferredDate}</p>
        <p><strong>Preferred Time:</strong> ${body.preferredTime}</p>
        <p><strong>Service Interest:</strong> ${body.serviceInterest}</p>
        <p><strong>Current Platforms:</strong> ${body.currentPlatforms || 'N/A'}</p>
        <p><strong>Goals:</strong> ${body.goals}</p>
        <p><strong>Budget:</strong> ${body.budget || 'Not specified'}</p>
      </body>
    </html>
  `;
}
*/

