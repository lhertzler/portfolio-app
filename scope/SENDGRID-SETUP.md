# SendGrid Email Setup Guide

This guide will walk you through setting up SendGrid to receive emails from your contact form.

## Prerequisites

- A SendGrid account (free tier available)
- Access to your Vercel project dashboard
- Your domain verified (optional but recommended for production)

---

## Step 1: Create a SendGrid Account

1. Go to [https://sendgrid.com](https://sendgrid.com)
2. Click **"Start for Free"** or **"Sign Up"**
3. Fill in your details:
   - Email address
   - Password
   - Company name (optional)
4. Verify your email address
5. Complete the onboarding questions (you can skip most of these)

---

## Step 2: Verify Your Sender Identity

SendGrid requires you to verify who you're sending emails from. You have two options:

### Option A: Single Sender Verification (Easiest - Recommended for Testing)

1. In SendGrid dashboard, go to **Settings** → **Sender Authentication**
2. Click **"Verify a Single Sender"**
3. Fill in the form:
   - **From Email Address**: Your email (e.g., `noreply@yourdomain.com` or your personal email)
   - **From Name**: Your name or company name
   - **Reply To**: Same as From Email Address
   - **Company Address**: Your address
   - **City**: Your city
   - **State**: Your state
   - **Country**: Your country
   - **Zip Code**: Your zip code
4. Click **"Create"**
5. Check your email and click the verification link
6. **Important**: Note the verified email address - you'll use this as `FROM_EMAIL`

### Option B: Domain Authentication (Recommended for Production)

1. In SendGrid dashboard, go to **Settings** → **Sender Authentication**
2. Click **"Authenticate Your Domain"**
3. Select your DNS provider (or choose "Other")
4. Follow the instructions to add DNS records to your domain
5. Wait for verification (can take up to 48 hours)

---

## Step 3: Create an API Key

1. In SendGrid dashboard, go to **Settings** → **API Keys**
2. Click **"Create API Key"**
3. Give it a name (e.g., "Portfolio Contact Form")
4. Select **"Full Access"** or **"Restricted Access"**:
   - **Full Access**: Easier but less secure
   - **Restricted Access**: Select only "Mail Send" permissions (recommended)
5. Click **"Create & View"**
6. **IMPORTANT**: Copy the API key immediately - you won't be able to see it again!
   - It will look like: `SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
7. Store it securely (you'll add it to Vercel in the next step)

---

## Step 4: Install SendGrid Package

Add the SendGrid package to your project:

```bash
npm install @sendgrid/mail
```

Or if using yarn:

```bash
yarn add @sendgrid/mail
```

---

## Step 5: Update Environment Variables

### Local Development (.env.local)

1. Open your `.env.local` file (create it if it doesn't exist)
2. Add these variables:

```env
SENDGRID_API_KEY=SG.your_actual_api_key_here
FROM_EMAIL=your-verified-email@example.com
CONTACT_EMAIL=your-personal-email@example.com
```

**Replace:**
- `SG.your_actual_api_key_here` with your actual SendGrid API key from Step 3
- `your-verified-email@example.com` with the email you verified in Step 2
- `your-personal-email@example.com` with the email where you want to receive contact form submissions

### Vercel Production

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - **Key**: `SENDGRID_API_KEY`
     - **Value**: Your SendGrid API key
     - **Environments**: Production, Preview, Development (select all)
   - **Key**: `FROM_EMAIL`
     - **Value**: Your verified SendGrid email
     - **Environments**: Production, Preview, Development (select all)
   - **Key**: `CONTACT_EMAIL`
     - **Value**: Your personal email (where you want to receive emails)
     - **Environments**: Production, Preview, Development (select all)
4. Click **"Save"** for each variable
5. **Important**: Redeploy your application for changes to take effect

---

## Step 6: Update Contact Form API Route

The contact form API route needs to be updated to use SendGrid. Here's what needs to be changed:

### Current Status

Your `app/api/contact/route.ts` currently logs submissions to the console. You need to:

1. Import SendGrid
2. Initialize SendGrid with your API key
3. Replace the console.log with actual email sending

### Implementation

Update `app/api/contact/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// ... existing rate limiting and validation code ...

export async function POST(request: NextRequest) {
  try {
    // ... existing validation code ...

    // Send email using SendGrid
    if (process.env.SENDGRID_API_KEY && process.env.FROM_EMAIL && process.env.CONTACT_EMAIL) {
      const msg = {
        to: process.env.CONTACT_EMAIL,
        from: process.env.FROM_EMAIL,
        subject: `New Contact Form Submission: ${sanitizedData.service}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${sanitizedData.name}</p>
          <p><strong>Email:</strong> ${sanitizedData.email}</p>
          ${sanitizedData.businessName ? `<p><strong>Business Name:</strong> ${sanitizedData.businessName}</p>` : ''}
          ${sanitizedData.websiteUrl ? `<p><strong>Website:</strong> <a href="${sanitizedData.websiteUrl}">${sanitizedData.websiteUrl}</a></p>` : ''}
          <p><strong>Service:</strong> ${sanitizedData.service}</p>
          <p><strong>Estimated Budget:</strong> ${sanitizedData.estimatedBudget}</p>
          ${sanitizedData.message ? `<p><strong>Message:</strong><br>${sanitizedData.message.replace(/\n/g, '<br>')}</p>` : ''}
          <hr>
          <p><small>Submitted: ${new Date().toISOString()}</small></p>
          <p><small>IP: ${ip}</small></p>
        `,
        text: `
          New Contact Form Submission
          
          Name: ${sanitizedData.name}
          Email: ${sanitizedData.email}
          ${sanitizedData.businessName ? `Business Name: ${sanitizedData.businessName}\n` : ''}
          ${sanitizedData.websiteUrl ? `Website: ${sanitizedData.websiteUrl}\n` : ''}
          Service: ${sanitizedData.service}
          Estimated Budget: ${sanitizedData.estimatedBudget}
          ${sanitizedData.message ? `\nMessage:\n${sanitizedData.message}\n` : ''}
          
          Submitted: ${new Date().toISOString()}
          IP: ${ip}
        `,
      };

      await sgMail.send(msg);
    } else {
      // Fallback to console log if SendGrid not configured
      console.log('Contact form submission:', {
        ...sanitizedData,
        timestamp: new Date().toISOString(),
        ip,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message! I\'ll get back to you soon.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    
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
```

---

## Step 7: Test the Setup

### Test Locally

1. Make sure your `.env.local` file has all the required variables
2. Start your development server:
   ```bash
   npm run dev
   ```
3. Navigate to your contact form page
4. Fill out and submit the form
5. Check your email inbox (the one set as `CONTACT_EMAIL`)
6. Check the terminal/console for any errors

### Test in Production

1. Make sure all environment variables are set in Vercel
2. Redeploy your application (or push a new commit)
3. Visit your live site and submit the contact form
4. Check your email inbox

### Troubleshooting

**No email received:**
- Check SendGrid dashboard → **Activity** → **Email Activity** to see if email was sent
- Verify all environment variables are set correctly
- Check spam/junk folder
- Verify the `FROM_EMAIL` is verified in SendGrid
- Check Vercel function logs for errors

**SendGrid API Error:**
- Verify your API key is correct
- Check API key permissions (needs "Mail Send" permission)
- Verify sender email is authenticated
- Check SendGrid account status (not suspended)

**Rate Limiting:**
- Free tier: 100 emails/day
- Check SendGrid dashboard for usage limits

---

## Step 8: Optional - Email Template

For a more professional look, you can create an HTML email template. Here's a basic template:

```typescript
const emailTemplate = (data: typeof sanitizedData, ip: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%); padding: 20px; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
  </div>
  <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px;">
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
    ${data.businessName ? `<p><strong>Business Name:</strong> ${data.businessName}</p>` : ''}
    ${data.websiteUrl ? `<p><strong>Website:</strong> <a href="${data.websiteUrl}" target="_blank">${data.websiteUrl}</a></p>` : ''}
    <p><strong>Service:</strong> ${data.service}</p>
    <p><strong>Estimated Budget:</strong> ${data.estimatedBudget}</p>
    ${data.message ? `<div style="margin-top: 20px; padding: 15px; background: white; border-left: 4px solid hsl(var(--primary));"><strong>Message:</strong><br>${data.message.replace(/\n/g, '<br>')}</div>` : ''}
    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
    <p style="font-size: 12px; color: #666;">
      Submitted: ${new Date().toLocaleString()}<br>
      IP: ${ip}
    </p>
  </div>
</body>
</html>
`;
```

---

## Security Best Practices

1. **Never commit API keys** - Always use environment variables
2. **Use restricted API keys** - Only grant "Mail Send" permission
3. **Validate all inputs** - Your existing validation is good
4. **Rate limiting** - Your existing rate limiting helps prevent abuse
5. **Sanitize HTML** - Consider using a library like `DOMPurify` for user-generated content

---

## SendGrid Free Tier Limits

- **100 emails/day** - Free tier limit
- **Unlimited contacts** - Can store unlimited contacts
- **Email API** - Full API access
- **Email Activity** - View email activity and analytics

For higher limits, consider upgrading to a paid plan.

---

## Additional Resources

- [SendGrid Documentation](https://docs.sendgrid.com/)
- [SendGrid Node.js Library](https://github.com/sendgrid/sendgrid-nodejs)
- [SendGrid API Reference](https://docs.sendgrid.com/api-reference)
- [Email Best Practices](https://docs.sendgrid.com/ui/sending-email/getting-started-with-marketing-campaigns)

---

## Quick Checklist

- [ ] Created SendGrid account
- [ ] Verified sender email address
- [ ] Created API key
- [ ] Installed `@sendgrid/mail` package
- [ ] Added environment variables to `.env.local`
- [ ] Added environment variables to Vercel
- [ ] Updated `app/api/contact/route.ts` with SendGrid code
- [ ] Tested locally
- [ ] Tested in production
- [ ] Verified emails are being received

---

## Need Help?

If you encounter issues:
1. Check SendGrid dashboard → **Activity** → **Email Activity**
2. Check Vercel function logs
3. Verify all environment variables are set correctly
4. Ensure sender email is verified
5. Check SendGrid account status

