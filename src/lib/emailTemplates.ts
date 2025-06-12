export interface EmailTemplateData {
  name: string;
  email: string;
  company?: string;
  services?: string[];
  loginUrl?: string;
}

export const employeeWelcomeTemplate = (data: EmailTemplateData): string => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Platform</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #0a0a0a;
            color: #ffffff;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }
        .header {
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%23000" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            color: #000000;
            margin-bottom: 10px;
            position: relative;
            z-index: 1;
        }
        .header-subtitle {
            color: #333333;
            font-size: 16px;
            position: relative;
            z-index: 1;
        }
        .content {
            padding: 40px 30px;
        }
        .welcome-message {
            font-size: 24px;
            font-weight: bold;
            color: #FFD700;
            margin-bottom: 20px;
            text-align: center;
        }
        .message-text {
            font-size: 16px;
            line-height: 1.8;
            margin-bottom: 30px;
            color: #e0e0e0;
        }
        .highlight {
            color: #FFD700;
            font-weight: bold;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            color: #000000;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            font-size: 16px;
            text-align: center;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
        }
        .cta-container {
            text-align: center;
            margin: 30px 0;
        }
        .features {
            background: #1e1e1e;
            padding: 30px;
            margin: 30px 0;
            border-radius: 8px;
            border-left: 4px solid #FFD700;
        }
        .features h3 {
            color: #FFD700;
            margin-bottom: 15px;
            font-size: 18px;
        }
        .features ul {
            list-style: none;
            padding: 0;
        }
        .features li {
            padding: 8px 0;
            color: #e0e0e0;
            position: relative;
            padding-left: 25px;
        }
        .features li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #FFD700;
            font-weight: bold;
        }
        .footer {
            background: #111111;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #333333;
        }
        .footer p {
            margin: 10px 0;
            color: #888888;
            font-size: 14px;
        }
        .social-links {
            margin: 20px 0;
        }
        .social-links a {
            color: #FFD700;
            text-decoration: none;
            margin: 0 10px;
        }
        @media (max-width: 600px) {
            .container {
                margin: 10px;
            }
            .header, .content, .footer {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🏢 JobConnect Pro</div>
            <div class="header-subtitle">Professional Employment Solutions</div>
        </div>
        
        <div class="content">
            <div class="welcome-message">Welcome, ${data.name}! 🎉</div>
            
            <div class="message-text">
                Thank you for registering as an <span class="highlight">employee</span> on our platform. 
                We're excited to help you find your next career opportunity and connect you with top employers.
            </div>
            
            <div class="features">
                <h3>What's Next?</h3>
                <ul>
                    <li>Complete your profile to attract employers</li>
                    <li>Browse available job opportunities</li>
                    <li>Set up job alerts for your preferred positions</li>
                    <li>Connect with hiring managers directly</li>
                    <li>Access career resources and tips</li>
                </ul>
            </div>
            
            <div class="cta-container">
                <a href="${data.loginUrl || '#'}" class="cta-button">
                    Complete Your Profile →
                </a>
            </div>
            
            <div class="message-text">
                Our team is here to support you throughout your job search journey. 
                If you have any questions, don't hesitate to reach out to our support team.
            </div>
        </div>
        
        <div class="footer">
            <div class="social-links">
                <a href="#">LinkedIn</a> • 
                <a href="#">Twitter</a> • 
                <a href="#">Facebook</a>
            </div>
            <p>© 2024 JobConnect Pro. All rights reserved.</p>
            <p>This email was sent to ${data.email}</p>
            <p><a href="#" style="color: #FFD700;">Unsubscribe</a> | <a href="#" style="color: #FFD700;">Privacy Policy</a></p>
        </div>
    </div>
</body>
</html>
`;

export const employerWelcomeTemplate = (data: EmailTemplateData): string => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Platform</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #0a0a0a;
            color: #ffffff;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }
        .header {
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%23000" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            color: #000000;
            margin-bottom: 10px;
            position: relative;
            z-index: 1;
        }
        .header-subtitle {
            color: #333333;
            font-size: 16px;
            position: relative;
            z-index: 1;
        }
        .content {
            padding: 40px 30px;
        }
        .welcome-message {
            font-size: 24px;
            font-weight: bold;
            color: #FFD700;
            margin-bottom: 20px;
            text-align: center;
        }
        .message-text {
            font-size: 16px;
            line-height: 1.8;
            margin-bottom: 30px;
            color: #e0e0e0;
        }
        .highlight {
            color: #FFD700;
            font-weight: bold;
        }
        .company-info {
            background: #1e1e1e;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            border-left: 4px solid #FFD700;
        }
        .services-list {
            background: #1e1e1e;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
        }
        .services-list h3 {
            color: #FFD700;
            margin-bottom: 15px;
        }
        .service-badge {
            display: inline-block;
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            color: #000000;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            margin: 3px;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            color: #000000;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            font-size: 16px;
            text-align: center;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
        }
        .cta-container {
            text-align: center;
            margin: 30px 0;
        }
        .features {
            background: #1e1e1e;
            padding: 30px;
            margin: 30px 0;
            border-radius: 8px;
            border-left: 4px solid #FFD700;
        }
        .features h3 {
            color: #FFD700;
            margin-bottom: 15px;
            font-size: 18px;
        }
        .features ul {
            list-style: none;
            padding: 0;
        }
        .features li {
            padding: 8px 0;
            color: #e0e0e0;
            position: relative;
            padding-left: 25px;
        }
        .features li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #FFD700;
            font-weight: bold;
        }
        .footer {
            background: #111111;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #333333;
        }
        .footer p {
            margin: 10px 0;
            color: #888888;
            font-size: 14px;
        }
        .social-links {
            margin: 20px 0;
        }
        .social-links a {
            color: #FFD700;
            text-decoration: none;
            margin: 0 10px;
        }
        @media (max-width: 600px) {
            .container {
                margin: 10px;
            }
            .header, .content, .footer {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🏢 JobConnect Pro</div>
            <div class="header-subtitle">Professional Employment Solutions</div>
        </div>
        
        <div class="content">
            <div class="welcome-message">Welcome, ${data.name}! 🤝</div>
            
            <div class="message-text">
                Thank you for registering as an <span class="highlight">employer</span> on our platform. 
                We're excited to help you find the perfect candidates for your organization.
            </div>
            
            ${data.company ? `
            <div class="company-info">
                <h3 style="color: #FFD700; margin-bottom: 10px;">Company Information</h3>
                <p style="color: #e0e0e0; margin: 0;"><strong>Company:</strong> ${data.company}</p>
            </div>
            ` : ''}
            
            ${data.services && data.services.length > 0 ? `
            <div class="services-list">
                <h3>Services You're Looking For:</h3>
                <div>
                    ${data.services.map(service => `<span class="service-badge">${service}</span>`).join('')}
                </div>
            </div>
            ` : ''}
            
            <div class="features">
                <h3>What's Next?</h3>
                <ul>
                    <li>Post your first job opening</li>
                    <li>Browse qualified candidate profiles</li>
                    <li>Set up hiring preferences and criteria</li>
                    <li>Access our candidate matching system</li>
                    <li>Utilize our interview scheduling tools</li>
                    <li>Get dedicated account management support</li>
                </ul>
            </div>
            
            <div class="cta-container">
                <a href="${data.loginUrl || '#'}" class="cta-button">
                    Start Hiring Today →
                </a>
            </div>
            
            <div class="message-text">
                Our dedicated team will reach out within 24 hours to help you set up your hiring process 
                and ensure you get the most out of our platform.
            </div>
        </div>
        
        <div class="footer">
            <div class="social-links">
                <a href="#">LinkedIn</a> • 
                <a href="#">Twitter</a> • 
                <a href="#">Facebook</a>
            </div>
            <p>© 2024 JobConnect Pro. All rights reserved.</p>
            <p>This email was sent to ${data.email}</p>
            <p><a href="#" style="color: #FFD700;">Unsubscribe</a> | <a href="#" style="color: #FFD700;">Privacy Policy</a></p>
        </div>
    </div>
</body>
</html>
`;

export const getEmailTemplate = (type: 'employee' | 'employer', data: EmailTemplateData): string => {
  switch (type) {
    case 'employee':
      return employeeWelcomeTemplate(data);
    case 'employer':
      return employerWelcomeTemplate(data);
    default:
      throw new Error(`Unknown email template type: ${type}`);
  }
};