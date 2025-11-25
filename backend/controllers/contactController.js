import nodemailer from 'nodemailer';

// Contact form submission
export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message'
      });
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('❌ Email credentials not configured in .env file');
      return res.status(500).json({
        success: false,
        message: 'Email service is not configured. Please contact the administrator.',
        error: process.env.NODE_ENV === 'development' ? 'EMAIL_USER or EMAIL_PASS not set in .env' : undefined
      });
    }

    // Check if using placeholder values
    if (process.env.EMAIL_USER === 'your-email@gmail.com' || process.env.EMAIL_PASS === 'your-app-password-here') {
      console.error('❌ Email credentials are still using placeholder values');
      return res.status(500).json({
        success: false,
        message: 'Email service is not properly configured. Please contact the administrator.',
        error: process.env.NODE_ENV === 'development' ? 'Please update EMAIL_USER and EMAIL_PASS in .env file' : undefined
      });
    }

    console.log('📧 Attempting to send email...');
    console.log('From:', process.env.EMAIL_USER);
    console.log('To:', process.env.EMAIL_USER);

    // Create transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      // Add debug options
      debug: process.env.NODE_ENV === 'development',
      logger: process.env.NODE_ENV === 'development'
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to your own email
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 10px;">New Contact Form Submission</h2>
            
            <div style="margin: 20px 0;">
              <p style="margin: 10px 0;"><strong style="color: #374151;">Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong style="color: #374151;">Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
              ${phone ? `<p style="margin: 10px 0;"><strong style="color: #374151;">Phone:</strong> ${phone}</p>` : ''}
            </div>
            
            <div style="margin: 20px 0; padding: 20px; background-color: #f9fafb; border-left: 4px solid #2563eb; border-radius: 5px;">
              <h3 style="color: #374151; margin-top: 0;">Message:</h3>
              <p style="color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
              <p>This email was sent from the CarDealing contact form.</p>
              <p>Received on: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      `,
      // Plain text version
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}

Message:
${message}

Received on: ${new Date().toLocaleString()}
      `
    };

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log('✅ SMTP connection verified');
    } catch (verifyError) {
      console.error('❌ SMTP verification failed:', verifyError.message);
      return res.status(500).json({
        success: false,
        message: 'Email service configuration error. Please check your credentials.',
        error: process.env.NODE_ENV === 'development' ? verifyError.message : undefined
      });
    }

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
      messageId: process.env.NODE_ENV === 'development' ? info.messageId : undefined
    });

  } catch (error) {
    console.error('❌ Contact form error:', error);
    
    // Provide specific error messages
    let errorMessage = 'Failed to send message. Please try again later.';
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please check your credentials.';
    } else if (error.code === 'ESOCKET') {
      errorMessage = 'Network error. Please check your internet connection.';
    } else if (error.code === 'ETIMEDOUT') {
      errorMessage = 'Connection timeout. Please try again.';
    }
    
    res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      code: process.env.NODE_ENV === 'development' ? error.code : undefined
    });
  }
};
