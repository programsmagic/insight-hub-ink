import { NextRequest, NextResponse } from 'next/server';
import { contactSchema, sanitizeInput } from '@/lib/validation';
import { logger } from '@/lib/logger';
import { contactRateLimiter, getClientIdentifier } from '@/lib/rate-limit';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimitResult = contactRateLimiter.check(clientId);

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
            'X-RateLimit-Limit': '10',
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
      logger.warn('Invalid JSON in contact request', { error: parseError });
      return NextResponse.json(
        { error: 'Invalid request body. Expected JSON.' },
        { status: 400 }
      );
    }

    // Validate input using Zod schema
    const validationResult = contactSchema.safeParse(body);
    
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      
      logger.warn('Contact form validation failed', { errors });
      
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
      subject: sanitizeInput(validatedData.subject),
      message: sanitizeInput(validatedData.message),
    };

    // TODO: Integrate with your backend/database service
    // Options:
    // 1. Send to email service (Resend, SendGrid, etc.)
    // 2. Save to database (Supabase, Firebase, etc.)
    // 3. Send to CRM (HubSpot, Salesforce, etc.)
    
    // Example: Email notification (using Resend)
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'contact@insighthub.ink',
    //   to: 'admin@insighthub.ink',
    //   subject: `Contact Form: ${sanitizedData.subject}`,
    //   html: generateContactEmail(sanitizedData),
    // });

    // Log contact form submission (without sensitive data)
    logger.info('Contact form submission received', {
      name: sanitizedData.name,
      email: sanitizedData.email,
      subject: sanitizedData.subject,
      timestamp: new Date().toISOString(),
    });

    // Return success response
    return NextResponse.json(
      { 
        success: true,
        message: 'Message sent successfully! We will get back to you soon.',
      },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
        },
      }
    );
  } catch (error) {
    logger.error('Contact API error', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

