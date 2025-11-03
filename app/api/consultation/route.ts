import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'preferredDate', 'preferredTime', 'serviceInterest', 'goals'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

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
    //   subject: `New Consultation Request from ${body.name}`,
    //   html: generateConsultationEmail(body),
    // });

    // Example: Save to database (using Supabase)
    // const { data, error } = await supabase
    //   .from('consultations')
    //   .insert([{
    //     name: body.name,
    //     email: body.email,
    //     phone: body.phone,
    //     company: body.company,
    //     preferred_date: body.preferredDate,
    //     preferred_time: body.preferredTime,
    //     timezone: body.timezone,
    //     service_interest: body.serviceInterest,
    //     current_platforms: body.currentPlatforms,
    //     goals: body.goals,
    //     budget: body.budget,
    //     status: 'pending',
    //     created_at: new Date().toISOString(),
    //   }]);

    // For now, log the consultation request
    console.log('Consultation Request Received:', {
      ...body,
      timestamp: new Date().toISOString(),
    });

    // Return success response
    return NextResponse.json(
      { 
        success: true,
        message: 'Consultation request received successfully',
        data: {
          id: `consultation_${Date.now()}`, // Temporary ID
          status: 'pending',
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Consultation API error:', error);
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

