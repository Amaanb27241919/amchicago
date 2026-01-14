import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// The password is stored server-side only
const EMPLOYEE_PASSWORD = Deno.env.get("EMPLOYEE_ACCESS_PASSWORD") || "amthreads101";
const TOKEN_SECRET = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "default-secret";

// Input validation schema
const AccessSchema = z.object({
  password: z.string().min(1, "Password required").max(100, "Password too long"),
});

// Verification schema
const VerifySchema = z.object({
  token: z.string().min(1, "Token required"),
});

// Rate limiting map (IP-based)
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(identifier: string, maxRequests: number = 5, windowMinutes: number = 15): boolean {
  const now = Date.now();
  const windowMs = windowMinutes * 60 * 1000;
  
  const requests = rateLimitMap.get(identifier) || [];
  const recentRequests = requests.filter(time => now - time < windowMs);
  
  if (recentRequests.length >= maxRequests) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitMap.set(identifier, recentRequests);
  return true;
}

// Generate a simple token with expiration using Web Crypto API
async function generateToken(): Promise<string> {
  const expiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  const payload = `employee_access:${expiry}`;
  
  const encoder = new TextEncoder();
  const keyData = encoder.encode(TOKEN_SECRET);
  const msgData = encoder.encode(payload);
  
  // Use Web Crypto API for HMAC
  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  
  const signature = await crypto.subtle.sign("HMAC", key, msgData);
  const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)));
  
  return btoa(JSON.stringify({ payload, signature: signatureBase64 }));
}

// Verify the token
async function verifyToken(token: string): Promise<boolean> {
  try {
    const decoded = JSON.parse(atob(token));
    const { payload, signature } = decoded;
    
    // Check expiry
    const [, expiryStr] = payload.split(':');
    const expiry = parseInt(expiryStr, 10);
    if (Date.now() > expiry) {
      return false;
    }
    
    // Regenerate and compare signature
    const encoder = new TextEncoder();
    const keyData = encoder.encode(TOKEN_SECRET);
    const msgData = encoder.encode(payload);
    
    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    
    const expectedSignature = await crypto.subtle.sign("HMAC", key, msgData);
    const expectedBase64 = btoa(String.fromCharCode(...new Uint8Array(expectedSignature)));
    
    return signature === expectedBase64;
  } catch {
    return false;
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const url = new URL(req.url);
    const action = url.searchParams.get('action') || 'login';

    const body = await req.json();

    if (action === 'verify') {
      // Verify an existing token
      const result = VerifySchema.safeParse(body);
      if (!result.success) {
        return new Response(
          JSON.stringify({ valid: false }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const valid = await verifyToken(result.data.token);
      return new Response(
        JSON.stringify({ valid }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Login action - rate limit
    if (!checkRateLimit(clientIp, 5, 15)) {
      return new Response(
        JSON.stringify({ error: "Too many attempts. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate input
    const result = AccessSchema.safeParse(body);
    if (!result.success) {
      return new Response(
        JSON.stringify({ error: "Invalid input" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { password } = result.data;

    // Verify password
    if (password !== EMPLOYEE_PASSWORD) {
      return new Response(
        JSON.stringify({ error: "Incorrect password" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate access token
    const token = await generateToken();

    return new Response(
      JSON.stringify({ success: true, token }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
