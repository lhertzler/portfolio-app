import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

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

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Email template function
function createEmailTemplate(data: {
  name: string;
  email: string;
  agencyName: string;
  website: string;
  engagementType: string;
  servicesNeeded: string[];
  otherService: string;
  urgency: string;
  projectBudget: string;
  message: string;
}, ip: string): { html: string; text: string } {
  const timestamp = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New Agency Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5; line-height: 1.6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">New Agency Contact Form Submission</h1>
              <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px; font-weight: 400;">Agency Partnership Inquiry</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <!-- Contact Info Section -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding-bottom: 16px;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="width: 140px; padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 500;">Name:</td>
                        <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${escapeHtml(data.name)}</td>
                      </tr>
                      <tr>
                        <td style="width: 140px; padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 500;">Email:</td>
                        <td style="padding: 8px 0;">
                          <a href="mailto:${escapeHtml(data.email)}" style="color: #667eea; text-decoration: none; font-size: 14px; font-weight: 500;">${escapeHtml(data.email)}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="width: 140px; padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 500;">Agency:</td>
                        <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 500;">${escapeHtml(data.agencyName)}</td>
                      </tr>
                      <tr>
                        <td style="width: 140px; padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 500;">Website:</td>
                        <td style="padding: 8px 0;">
                          <a href="${escapeHtml(data.website)}" target="_blank" rel="noopener noreferrer" style="color: #667eea; text-decoration: none; font-size: 14px; font-weight: 500;">${escapeHtml(data.website)}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="height: 1px; background: linear-gradient(to right, transparent, #e5e7eb, transparent); margin: 24px 0;"></div>

              <!-- Project Details Section -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #667eea;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding-bottom: 12px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Engagement Type</td>
                      </tr>
                      <tr>
                        <td style="color: #111827; font-size: 16px; font-weight: 600;">${escapeHtml(data.engagementType)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 12px;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="width: 140px; padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 500;">Services Needed:</td>
                        <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${escapeHtml(data.servicesNeeded.join(', '))}${data.otherService ? ` (${escapeHtml(data.otherService)})` : ''}</td>
                      </tr>
                      <tr>
                        <td style="width: 140px; padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 500;">Urgency:</td>
                        <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${escapeHtml(data.urgency)}</td>
                      </tr>
                      ${data.projectBudget ? `
                      <tr>
                        <td style="width: 140px; padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 500;">Budget:</td>
                        <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: 600;">${escapeHtml(data.projectBudget)}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              ${data.message ? `
              <!-- Message Section -->
              <div style="margin-top: 24px;">
                <div style="padding: 20px; background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #667eea;">
                  <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
                  <div style="color: #374151; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(data.message).replace(/\n/g, '<br>')}</div>
                </div>
              </div>
              ` : ''}

              <!-- Footer -->
              <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding-bottom: 8px;">
                      <p style="margin: 0; color: #9ca3af; font-size: 12px; line-height: 1.5;">
                        <strong style="color: #6b7280;">Submitted:</strong> ${timestamp}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p style="margin: 0; color: #9ca3af; font-size: 12px; line-height: 1.5;">
                        <strong style="color: #6b7280;">IP Address:</strong> ${ip}
                      </p>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 32px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${escapeHtml(data.email)}?subject=Re: Agency Partnership Inquiry" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 600; box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);">Reply to ${escapeHtml(data.name)}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        
        <!-- Footer Note -->
        <table role="presentation" style="max-width: 600px; width: 100%; margin-top: 20px;">
          <tr>
            <td align="center" style="padding: 20px;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">This email was sent from your agency contact form</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `
NEW AGENCY CONTACT FORM SUBMISSION
Agency Partnership Inquiry

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${escapeHtml(data.name)}
Email: ${escapeHtml(data.email)}
Agency: ${escapeHtml(data.agencyName)}
Website: ${escapeHtml(data.website)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROJECT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Engagement Type: ${escapeHtml(data.engagementType)}
Services Needed: ${escapeHtml(data.servicesNeeded.join(', '))}${data.otherService ? ` (${escapeHtml(data.otherService)})` : ''}
Urgency: ${escapeHtml(data.urgency)}
${data.projectBudget ? `Budget: ${escapeHtml(data.projectBudget)}\n` : ''}

${data.message ? `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nMESSAGE\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n${escapeHtml(data.message)}\n` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Submitted: ${timestamp}
IP Address: ${ip}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reply to: ${escapeHtml(data.email)}
  `.trim();

  return { html, text };
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
    const { name, email, agencyName, website, engagementType, servicesNeeded, otherService, urgency, projectBudget, message } = body;

    // Validation - Only name, email, agencyName, and website are required
    if (!name || !email || !agencyName || !website) {
      return NextResponse.json(
        { error: 'Name, email, agency name, and website are required.' },
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

    // Optional field validation - only validate if "Other" is selected
    if (servicesNeeded && Array.isArray(servicesNeeded) && servicesNeeded.includes('Other') && !otherService) {
      return NextResponse.json(
        { error: 'Please specify the other service.' },
        { status: 400 }
      );
    }

    // Validate website URL
    if (!/^https?:\/\/.+\..+/.test(website.trim())) {
      return NextResponse.json(
        { error: 'Please provide a valid website URL (e.g., https://example.com).' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      agencyName: sanitizeInput(agencyName),
      website: sanitizeInput(website),
      engagementType: engagementType ? sanitizeInput(engagementType) : '',
      servicesNeeded: Array.isArray(servicesNeeded) ? servicesNeeded.map(s => sanitizeInput(s)) : [],
      otherService: otherService ? sanitizeInput(otherService) : '',
      urgency: urgency ? sanitizeInput(urgency) : '',
      projectBudget: projectBudget ? sanitizeInput(projectBudget) : '',
      message: message ? sanitizeInput(message) : '',
    };

    // Send email using SendGrid
    if (process.env.SENDGRID_API_KEY && process.env.FROM_EMAIL && process.env.CONTACT_EMAIL) {
      const emailTemplate = createEmailTemplate(sanitizedData, ip);
      
      const msg = {
        to: process.env.CONTACT_EMAIL,
        from: process.env.FROM_EMAIL,
        replyTo: sanitizedData.email,
        subject: `New Agency Contact Form Submission: ${sanitizedData.agencyName}`,
        html: emailTemplate.html,
        text: emailTemplate.text,
      };

      await sgMail.send(msg);
    } else {
      // Fallback to console log if SendGrid not configured
      console.log('Agency contact form submission:', {
        ...sanitizedData,
        timestamp: new Date().toISOString(),
        ip,
      });
      console.warn('SendGrid not configured. Set SENDGRID_API_KEY, FROM_EMAIL, and CONTACT_EMAIL environment variables.');
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message! I\'ll get back to you soon.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Agency contact form error:', error);
    
    // SendGrid specific error handling
    if (error instanceof Error && 'response' in error) {
      const sgError = error as any;
      console.error('SendGrid error details:', sgError.response?.body);
    }
    
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}

