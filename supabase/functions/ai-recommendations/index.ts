import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BrowsingHistoryItem {
  handle: string;
  title: string;
  price: string;
}

interface ProductInfo {
  handle: string;
  title: string;
  description: string;
  price: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { browsingHistory, allProducts, currentProductHandle } = await req.json() as {
      browsingHistory: BrowsingHistoryItem[];
      allProducts: ProductInfo[];
      currentProductHandle?: string;
    };

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Filter out current product from all products
    const availableProducts = allProducts.filter(p => p.handle !== currentProductHandle);

    if (availableProducts.length === 0) {
      return new Response(
        JSON.stringify({ recommendations: [] }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build context from browsing history
    const historyContext = browsingHistory.length > 0
      ? `The customer has recently viewed these products:
${browsingHistory.map((item, i) => `${i + 1}. "${item.title}" (${item.price})`).join('\n')}`
      : "The customer has no browsing history yet.";

    // Build available products context
    const productsContext = `Available products to recommend from:
${availableProducts.map((p, i) => `${i + 1}. Handle: "${p.handle}" | Title: "${p.title}" | Price: ${p.price} | Description: ${p.description.slice(0, 100)}...`).join('\n')}`;

    const systemPrompt = `You are an AI shopping assistant for a premium streetwear clothing brand called "A | M" (Aspire Manifest) based in Chicago. Your task is to analyze customer browsing patterns and recommend the most relevant products.

Guidelines:
- Recommend products that complement or match the style of items the customer has viewed
- Consider price ranges the customer seems interested in
- Prioritize variety while maintaining style coherence
- If no browsing history, recommend bestsellers or new arrivals
- Return exactly 4 product handles that would be most appealing to this customer
- Only recommend products from the available list provided`;

    const userPrompt = `${historyContext}

${productsContext}

Based on this customer's browsing behavior and preferences, recommend exactly 4 products from the available list. Return ONLY the product handles as a JSON array, nothing else.

Example response format: ["product-handle-1", "product-handle-2", "product-handle-3", "product-handle-4"]`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded, please try again later.", recommendations: [] }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted.", recommendations: [] }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "[]";
    
    // Parse the AI response to extract product handles
    let recommendedHandles: string[] = [];
    try {
      // Try to extract JSON array from the response
      const jsonMatch = content.match(/\[[\s\S]*?\]/);
      if (jsonMatch) {
        recommendedHandles = JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      // Fallback: return first 4 available products
      recommendedHandles = availableProducts.slice(0, 4).map(p => p.handle);
    }

    // Validate that recommended handles exist in available products
    const validHandles = recommendedHandles.filter(handle => 
      availableProducts.some(p => p.handle === handle)
    );

    // If we don't have enough valid recommendations, fill with remaining products
    if (validHandles.length < 4) {
      const remaining = availableProducts
        .filter(p => !validHandles.includes(p.handle))
        .slice(0, 4 - validHandles.length)
        .map(p => p.handle);
      validHandles.push(...remaining);
    }

    return new Response(
      JSON.stringify({ recommendations: validHandles.slice(0, 4) }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("AI recommendations error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        recommendations: [] 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
