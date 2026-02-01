import { Request, Response } from "express";

// Sanitize HTML to prevent XSS attacks
function sanitizeHTML(input: string): string {
  if (!input) return "";
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

// Validate email format (basic RFC 5322 compliance)
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Validate input length
function validateInputLength(input: string, maxLength: number): boolean {
  return input && input.length > 0 && input.length <= maxLength;
}

export async function sendEmail(req: Request, res: Response) {
  const { name, email, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      error: "Missing required fields",
      required: ["name", "email", "subject", "message"],
    });
  }

  // Validate input lengths
  if (!validateInputLength(name, 100)) {
    return res
      .status(400)
      .json({ error: "Name must be between 1 and 100 characters" });
  }
  if (!validateInputLength(subject, 200)) {
    return res
      .status(400)
      .json({ error: "Subject must be between 1 and 200 characters" });
  }
  if (!validateInputLength(message, 5000)) {
    return res
      .status(400)
      .json({ error: "Message must be between 1 and 5000 characters" });
  }

  // Validate email format
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    // Get Resend API key and recipient email from environment
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail =
      process.env.CONTACT_FORM_EMAIL || process.env.VITE_CONTACT_EMAIL;

    if (!resendApiKey) {
      console.error("RESEND_API_KEY not configured");
      return res.status(500).json({
        error: "Email service not configured",
      });
    }

    if (!recipientEmail) {
      console.error("CONTACT_FORM_EMAIL not configured");
      return res.status(500).json({
        error: "Email service not properly configured",
      });
    }

    // Sanitize inputs to prevent XSS
    const sanitizedName = sanitizeHTML(name.trim());
    const sanitizedSubject = sanitizeHTML(subject.trim());
    const sanitizedMessage = sanitizeHTML(message.trim());

    // Prepare email HTML with sanitized content
    const emailHTML = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h2 style="color: #dc2626; margin-bottom: 20px;">New Contact Form Submission</h2>

        <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <p style="margin: 5px 0;"><strong>Name:</strong> ${sanitizedName}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${sanitizeHTML(email)}">${sanitizeHTML(email)}</a></p>
          <p style="margin: 5px 0;"><strong>Subject:</strong> ${sanitizedSubject}</p>
        </div>

        <div style="border-top: 1px solid #ddd; padding-top: 20px;">
          <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
          <p style="white-space: pre-wrap; word-wrap: break-word; line-height: 1.6; background: #f9f9f9; padding: 15px; border-left: 4px solid #dc2626; border-radius: 4px;">${sanitizedMessage}</p>
        </div>

        <div style="border-top: 1px solid #ddd; margin-top: 20px; padding-top: 15px; font-size: 12px; color: #666;">
          <p>This email was sent from your MoroccoGlobal contact form.</p>
        </div>
      </div>
    `;

    // Send email via Resend API
    console.log("Sending email via Resend API...", {
      to: recipientEmail,
      from: "noreply@resend.dev",
      subject: sanitizedSubject,
    });

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "noreply@wyfmorocco.com",
        to: recipientEmail,
        replyTo: email,
        subject: `New Contact Form Submission: ${sanitizedSubject}`,
        html: emailHTML,
      }),
    });

    const responseData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API error:", {
        status: resendResponse.status,
        error: responseData,
      });

      return res.status(resendResponse.status).json({
        error: "Failed to send email",
      });
    }

    console.log("Email sent successfully:", responseData.id);

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
      id: responseData.id,
    });
  } catch (error) {
    console.error("Error in send-email route:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
