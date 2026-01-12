import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Validation schema
const PreOrderEmailSchema = z.object({
  email: z.string().email("Invalid email address").max(255),
  name: z.string().max(100).optional(),
  productTitle: z.string().min(1).max(200),
  variantTitle: z.string().min(1).max(200),
  quantity: z.number().int().positive().max(999),
  price: z.string().max(50),
});

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    // Validate input
    const result = PreOrderEmailSchema.safeParse(body);
    if (!result.success) {
      return new Response(
        JSON.stringify({
          error: "Invalid input",
          details: result.error.format(),
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { email, name, productTitle, variantTitle, quantity, price } =
      result.data;

    const customerName = escapeHtml(name || "Valued Customer");
    const safeProductTitle = escapeHtml(productTitle);
    const safeVariantTitle = escapeHtml(variantTitle);
    const safePrice = escapeHtml(price);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <tr>
                  <td style="background-color: #000000; padding: 30px 40px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: 2px;">ASPIRE MANIFEST</h1>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <h2 style="margin: 0 0 20px; color: #000000; font-size: 20px; font-weight: 600;">Pre-Order Confirmed!</h2>
                    
                    <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                      Hi ${customerName},
                    </p>
                    
                    <p style="margin: 0 0 30px; color: #333333; font-size: 16px; line-height: 1.6;">
                      Thank you for your pre-order! We've reserved the following item for you and will notify you as soon as it's back in stock.
                    </p>
                    
                    <!-- Product Details -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                      <tr>
                        <td style="padding: 20px;">
                          <p style="margin: 0 0 8px; color: #000000; font-size: 16px; font-weight: 600;">${safeProductTitle}</p>
                          <p style="margin: 0 0 8px; color: #666666; font-size: 14px;">${safeVariantTitle}</p>
                          <p style="margin: 0; color: #666666; font-size: 14px;">Quantity: ${quantity} • ${safePrice}</p>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="margin: 0 0 10px; color: #666666; font-size: 14px; line-height: 1.6;">
                      <strong>What happens next?</strong>
                    </p>
                    <ul style="margin: 0 0 30px; padding-left: 20px; color: #666666; font-size: 14px; line-height: 1.8;">
                      <li>We'll email you when the item is available</li>
                      <li>You'll have priority access to purchase</li>
                      <li>Final price may vary at time of purchase</li>
                    </ul>
                    
                    <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6;">
                      Questions? Reply to this email or contact us at <a href="mailto:support@aspiremanifest.com" style="color: #000000;">support@aspiremanifest.com</a>
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f9f9f9; padding: 30px 40px; text-align: center; border-top: 1px solid #eeeeee;">
                    <p style="margin: 0 0 10px; color: #999999; font-size: 12px;">
                      © ${new Date().getFullYear()} Aspire Manifest. All rights reserved.
                    </p>
                    <p style="margin: 0; color: #999999; font-size: 12px;">
                      <a href="https://aspiremanifest.com" style="color: #999999; text-decoration: none;">aspiremanifest.com</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Aspire Manifest <noreply@aspiremanifest.com>",
        to: [email],
        subject: "Pre-Order Confirmation - Aspire Manifest",
        html: htmlContent,
      }),
    });

    const emailData = await emailResponse.json();

    if (!emailResponse.ok) {
      throw new Error(emailData.message || "Failed to send email");
    }

    console.log("Pre-order confirmation email sent successfully:", emailData);

    return new Response(JSON.stringify({ success: true, data: emailData }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    console.error("Error sending pre-order confirmation email:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send confirmation email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
