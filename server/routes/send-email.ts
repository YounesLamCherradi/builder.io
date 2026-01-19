import { Request, Response } from "express";

export async function sendEmail(req: Request, res: Response) {
  const { name, email, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      error: "Missing required fields",
      required: ["name", "email", "subject", "message"],
    });
  }

  try {
    // Get Resend API key from environment
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("RESEND_API_KEY not configured");
      return res.status(500).json({
        error: "Email service not configured",
        message: "RESEND_API_KEY environment variable is missing",
      });
    }

    // Prepare email HTML
    const emailHTML = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h2 style="color: #dc2626; margin-bottom: 20px;">New Contact Form Submission</h2>
        
        <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
        </div>
        
        <div style="border-top: 1px solid #ddd; padding-top: 20px;">
          <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
          <p style="white-space: pre-wrap; word-wrap: break-word; line-height: 1.6; background: #f9f9f9; padding: 15px; border-left: 4px solid #dc2626; border-radius: 4px;">${message}</p>
        </div>
        
        <div style="border-top: 1px solid #ddd; margin-top: 20px; padding-top: 15px; font-size: 12px; color: #666;">
          <p>This email was sent from your MoroccoGlobal contact form.</p>
        </div>
      </div>
    `;

    // Send email via Resend API
    console.log("Sending email via Resend API...", {
      to: "younes@lamhamedicherradi.com",
      from: "noreply@resend.dev",
      subject,
    });

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "noreply@resend.dev",
        to: "younes@lamhamedicherradi.com",
        replyTo: email,
        subject: `New Contact Form Submission: ${subject}`,
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
        details: responseData,
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
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
