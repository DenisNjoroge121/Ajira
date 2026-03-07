// src/lib/email-service.ts
import * as brevo from '@getbrevo/brevo';

// Initialize Brevo API instance
const apiInstance = new brevo.TransactionalEmailsApi();

// Set API key from environment variables
const apiKey = import.meta.env.VITE_BREVO_API_KEY;
if (!apiKey) {
  console.warn('VITE_BREVO_API_KEY is not set. Email notifications will not work.');
} else {
  apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);
}

const adminEmail = "ajiraclubku@gmail.com";

export interface RegistrationData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  reg_number: string;
  year_of_study: string;
  course: string;
  school: string;
  career_interests?: string | null;
}

export const sendRegistrationEmail = async (registration: RegistrationData): Promise<{ success: boolean; error?: any }> => {
  try {
    // Check if API key is configured
    if (!import.meta.env.VITE_BREVO_API_KEY) {
      console.log('Email not sent: API key missing');
      return { success: false, error: 'API key not configured' };
    }

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    
    sendSmtpEmail.subject = "🎉 New Member Registration - Ajira Club KU";
    sendSmtpEmail.to = [{ 
      email: adminEmail,
      name: "Ajira Club Admin" 
    }];
    
    // Use a verified sender email (you'll need to set this up in Brevo)
    sendSmtpEmail.sender = { 
      email: "noreply@ajiraclubku.com", 
      name: "Ajira Club KU" 
    };
    
    // Format the current date
    const submissionDate = new Date().toLocaleString('en-KE', {
      timeZone: 'Africa/Nairobi',
      dateStyle: 'full',
      timeStyle: 'short'
    });

    // Create HTML email content
    sendSmtpEmail.htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Inter', Arial, sans-serif; background-color: #f4f4f5;">
        <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
          
          <!-- Header with Kenyan flag colors -->
          <div style="background: linear-gradient(135deg, #B22234 0%, #006B3F 100%); padding: 30px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Ajira Club KU</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px;">New Member Registration</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 30px 25px;">
            <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 25px; border-left: 4px solid #B22234;">
              <p style="margin: 0; color: #475569; font-size: 14px;">Submission Date</p>
              <p style="margin: 5px 0 0 0; color: #0f172a; font-size: 16px; font-weight: 600;">${submissionDate}</p>
            </div>
            
            <!-- Personal Information -->
            <h3 style="color: #006B3F; margin: 25px 0 15px 0; font-size: 18px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">👤 Personal Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; background: #f8fafc; width: 40%; font-weight: 600; border-radius: 6px 0 0 6px;">Full Name:</td>
                <td style="padding: 10px; background: white; border-radius: 0 6px 6px 0;">${registration.first_name} ${registration.last_name}</td>
              </tr>
            </table>
            
            <!-- Contact Information -->
            <h3 style="color: #006B3F; margin: 25px 0 15px 0; font-size: 18px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">📞 Contact Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; background: #f8fafc; width: 40%; font-weight: 600;">Email:</td>
                <td style="padding: 10px; background: white;">
                  <a href="mailto:${registration.email}" style="color: #B22234; text-decoration: none;">${registration.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8fafc; font-weight: 600;">Phone:</td>
                <td style="padding: 10px; background: white;">${registration.phone}</td>
              </tr>
            </table>
            
            <!-- Academic Information -->
            <h3 style="color: #006B3F; margin: 25px 0 15px 0; font-size: 18px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">🎓 Academic Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; background: #f8fafc; width: 40%; font-weight: 600;">Reg Number:</td>
                <td style="padding: 10px; background: white;">${registration.reg_number}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8fafc; font-weight: 600;">Year of Study:</td>
                <td style="padding: 10px; background: white;">${registration.year_of_study}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8fafc; font-weight: 600;">Course:</td>
                <td style="padding: 10px; background: white;">${registration.course}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f8fafc; font-weight: 600;">School:</td>
                <td style="padding: 10px; background: white;">${registration.school}</td>
              </tr>
            </table>
            
            <!-- Career Interests -->
            ${registration.career_interests ? `
            <h3 style="color: #006B3F; margin: 25px 0 15px 0; font-size: 18px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">💼 Career Interests</h3>
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0; color: #1e293b; line-height: 1.6;">${registration.career_interests}</p>
            </div>
            ` : ''}
            
            <!-- Admin Actions -->
            <div style="margin-top: 30px; padding: 20px; background: #f0fdf4; border-radius: 8px; border: 1px solid #86efac;">
              <h4 style="color: #166534; margin: 0 0 12px 0; font-size: 16px;">🔐 Admin Actions Required</h4>
              <p style="margin: 0 0 15px 0; color: #166534; font-size: 14px;">Review this registration in the admin dashboard:</p>
              <a href="${window.location.origin}/admin" style="display: inline-block; background: #006B3F; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">Go to Admin Dashboard</a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #1e293b; padding: 20px; text-align: center; color: #94a3b8; font-size: 12px;">
            <p style="margin: 0 0 8px 0;">© 2024 Ajira Club Kenyatta University. All rights reserved.</p>
            <p style="margin: 0;">This is an automated notification. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Add text version for email clients that don't support HTML
    sendSmtpEmail.textContent = `
      New Member Registration - Ajira Club KU
      
      Submission Date: ${submissionDate}
      
      PERSONAL INFORMATION
      Name: ${registration.first_name} ${registration.last_name}
      
      CONTACT INFORMATION
      Email: ${registration.email}
      Phone: ${registration.phone}
      
      ACADEMIC INFORMATION
      Registration Number: ${registration.reg_number}
      Year of Study: ${registration.year_of_study}
      Course: ${registration.course}
      School: ${registration.school}
      
      ${registration.career_interests ? `CAREER INTERESTS\n${registration.career_interests}` : ''}
      
      Admin Dashboard: ${window.location.origin}/admin
    `;

    // Send the email
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent successfully:', data);
    return { success: true };
    
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};