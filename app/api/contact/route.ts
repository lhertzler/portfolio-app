import { NextRequest, NextResponse } from 'next/server';

// Rate limiting: simple in-memory store (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3; // Max 3 requests per minute per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input: string): string {
  return input.trim().slice(0, 10000); // Max 10k characters
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               request.headers.get('x-real-ip') || 
               'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, businessName, websiteUrl, service, estimatedBudget, message } = body;

    // Validation
    if (!name || !email || !service || !estimatedBudget) {
      return NextResponse.json(
        { error: 'Name, email, service, and estimated budget are required.' },
        { status: 400 }
      );
    }

    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 100 characters.' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    // Validate website URL if provided
    if (websiteUrl && !/^https?:\/\/.+\..+/.test(websiteUrl.trim())) {
      return NextResponse.json(
        { error: 'Please provide a valid website URL (e.g., https://example.com).' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      businessName: businessName ? sanitizeInput(businessName) : '',
      websiteUrl: websiteUrl ? sanitizeInput(websiteUrl) : '',
      service: sanitizeInput(service),
      estimatedBudget: sanitizeInput(estimatedBudget),
      message: message ? sanitizeInput(message) : '',
    };

    // TODO: Integrate with email service (Resend, SendGrid, etc.)
    // For now, log to console and return success
    console.log('Contact form submission:', {
      ...sanitizedData,
      timestamp: new Date().toISOString(),
      ip,
    });

    // In production, replace this with actual email sending:
    // await sendEmail({
    //   to: process.env.CONTACT_EMAIL,
    //   from: process.env.FROM_EMAIL,
    //   subject: `New contact form submission: ${sanitizedData.service}`,
    //   html: formatEmailTemplate(sanitizedData),
    // });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message! I\'ll get back to you soon.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}

