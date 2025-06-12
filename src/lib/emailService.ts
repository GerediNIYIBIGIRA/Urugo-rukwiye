// utils/emailService.ts
import { supabase } from '../lib/supabase';

interface WelcomeEmailData {
  email: string;
  fullName: string;
  userType: 'employer' | 'employee';
  services?: string[];
}

// Email templates
const getWelcomeEmailTemplate = (data: WelcomeEmailData) => {
  const isEmployer = data.userType === 'employer';
  const servicesText = data.services?.join(', ') || '';

  return {
    subject: `Welcome to DomesticWorker Platform - ${isEmployer ? 'Employer' : 'Worker'} Registration Confirmed`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to DomesticWorker Platform</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .content { background: white; padding: 30px; border: 1px solid #ddd; }
          .highlight { background: #ffd700; color: #1a1a1a; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .services { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 14px; color: #666; }
          .button { display: inline-block; background: #ffd700; color: #1a1a1a; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 15px 0; }
          .next-steps { background: #f0f0f0; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .step { margin: 10px 0; padding-left: 20px; position: relative; }
          .step:before { content: "✓"; position: absolute; left: 0; color: #ffd700; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🏠 DomesticWorker Platform</div>
            <h1>Welcome aboard, ${data.fullName}!</h1>
            <p>Your ${isEmployer ? 'employer' : 'worker'} registration was successful</p>
          </div>
          
          <div class="content">
            <div class="highlight">
              <h2>🎉 Registration Confirmed!</h2>
              <p>We're excited to have you join our community of ${isEmployer ? 'employers' : 'domestic workers'} in Rwanda.</p>
            </div>

            ${data.services && data.services.length > 0 ? `
            <div class="services">
              <h3>Services ${isEmployer ? 'Requested' : 'Offered'}:</h3>
              <p><strong>${servicesText}</strong></p>
            </div>
            ` : ''}

            <div class="next-steps">
              <h3>What happens next?</h3>
              ${isEmployer ? `
                <div class="step">Our team will review your requirements and contact you within 24-48 hours</div>
                <div class="step">We'll schedule a brief consultation to understand your specific needs</div>
                <div class="step">We'll match you with pre-screened, qualified domestic workers</div>
                <div class="step">You'll receive profiles of suitable candidates for your review</div>
                <div class="step">Once you select a worker, we'll facilitate the introduction and agreement</div>
              ` : `
                <div class="step">Our verification team will review your profile within 24-48 hours</div>
                <div class="step">You may be contacted for additional documentation or verification</div>
                <div class="step">Once verified, your profile will be visible to potential employers</div>
                <div class="step">We'll notify you when employers express interest in your services</div>
                <div class="step">You'll have the opportunity to review and accept suitable job offers</div>
              `}
            </div>

            <p><strong>Important:</strong> Please keep this email for your records. You'll receive updates about your application status at this email address.</p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="#" class="button">Access Your Dashboard</a>
            </div>

            <h3>Need Help?</h3>
            <p>If you have any questions or need assistance, please don't hesitate to contact us:</p>
            <ul>
              <li>📧 Email: support@domesticworker.rw</li>
              <li>📱 Phone: +250 788 XXX XXX</li>
              <li>🕒 Business Hours: Monday - Friday, 8:00 AM - 6:00 PM</li>
            </ul>
          </div>

          <div class="footer">
            <p>Thank you for choosing DomesticWorker Platform</p>
            <p>Connecting trusted domestic workers with caring families across Rwanda</p>
            <p style="font-size: 12px; margin-top: 20px;">
              © 2025 DomesticWorker Platform. All rights reserved.<br>
              This is an automated message. Please do not reply directly to this email.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Welcome to DomesticWorker Platform, ${data.fullName}!

      Your ${isEmployer ? 'employer' : 'worker'} registration was successful.

      ${data.services && data.services.length > 0 ? `Services ${isEmployer ? 'Requested' : 'Offered'}: ${servicesText}` : ''}

      What happens next?
      ${isEmployer ? `
      - Our team will review your requirements and contact you within 24-48 hours
      - We'll schedule a brief consultation to understand your specific needs
      - We'll match you with pre-screened, qualified domestic workers
      - You'll receive profiles of suitable candidates for your review
      - Once you select a worker, we'll facilitate the introduction and agreement
      ` : `
      - Our verification team will review your profile within 24-48 hours
      - You may be contacted for additional documentation or verification
      - Once verified, your profile will be visible to potential employers
      - We'll notify you when employers express interest in your services
      - You'll have the opportunity to review and accept suitable job offers
      `}

      Need Help?
      Email: support@domesticworker.rw
      Phone: +250 788 XXX XXX
      Business Hours: Monday - Friday, 8:00 AM - 6:00 PM

      Thank you for choosing DomesticWorker Platform!
    `
  };
};

// Function to send welcome email using Supabase Edge Functions
export const sendWelcomeEmail = async (data: WelcomeEmailData): Promise<boolean> => {
  try {
    const emailTemplate = getWelcomeEmailTemplate(data);
    
    // Option 1: Using Supabase Edge Functions (recommended)
    const { data: result, error } = await supabase.functions.invoke('send-email', {
      body: {
        to: data.email,
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text
      }
    });

    if (error) {
      console.error('Error sending welcome email:', error);
      return false;
    }

    console.log('Welcome email sent successfully:', result);
    return true;
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return false;
  }
};

// Alternative: Using a third-party email service like EmailJS
export const sendWelcomeEmailViaEmailJS = async (data: WelcomeEmailData): Promise<boolean> => {
  try {
    // You'll need to install emailjs-com: npm install emailjs-com
    // import emailjs from 'emailjs-com';
    
    const emailTemplate = getWelcomeEmailTemplate(data);
    
    // Configure with your EmailJS credentials
    const templateParams = {
      to_email: data.email,
      to_name: data.fullName,
      subject: emailTemplate.subject,
      message: emailTemplate.text,
      html_message: emailTemplate.html
    };

    // Uncomment and configure when ready to use
    /*
    const result = await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      templateParams,
      'YOUR_PUBLIC_KEY'
    );
    
    console.log('Email sent successfully:', result);
    return true;
    */
    
    console.log('EmailJS configuration needed');
    return false;
  } catch (error) {
    console.error('Failed to send email via EmailJS:', error);
    return false;
  }
};

// Function to log email attempts in database
export const logEmailAttempt = async (
  email: string, 
  type: 'welcome_employer' | 'welcome_employee', 
  status: 'sent' | 'failed',
  error?: string
) => {
  try {
    await supabase.from('email_logs').insert([{
      email,
      type,
      status,
      error_message: error || null,
      sent_at: new Date().toISOString()
    }]);
  } catch (logError) {
    console.error('Failed to log email attempt:', logError);
  }
};