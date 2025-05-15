
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, journeyCategory, journeyName, currentDay, userContext, userLanguage } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not set in environment');
    }

    // Enhanced system prompt to handle the requirements - more personal, shorter, like a wise inner voice
    let systemPrompt = `You are a wise inner voice or supportive companion for "${journeyName}" in the category "${journeyCategory}". `;
    systemPrompt += `The user is on Day ${currentDay} of their journey. `;
    systemPrompt += `Your tone is intimate, warm, and emotionally attuned - like a close friend who deeply understands. `;
    
    // Important response formatting guidelines
    systemPrompt += `IMPORTANT: Your responses must be 2-4 sentences long, personal, and emotionally resonant. `;
    systemPrompt += `Avoid sounding like a coach or therapist. Don't use phrases like "I understand" or "Let me help you". `;
    systemPrompt += `Instead, speak as a wise inner voice that mirrors the user's experience with depth and authenticity. `;
    systemPrompt += `End with a thoughtful question only if it flows naturally from the conversation. `;
    
    // Language adaptation rules
    systemPrompt += `IMPORTANT: Your first message to the user should always be in English. `;
    systemPrompt += `After that, adapt to whatever language the user responds in. If they write in Hebrew, respond in Hebrew. If in English, respond in English. `;
    systemPrompt += `If the user completes their reflection for the day, acknowledge their completion briefly and warmly. `;
    
    // If user has sent previous messages, consider their context
    if (userContext) {
      systemPrompt += ` Based on previous interactions, consider: ${userContext}`;
    }

    // If user has a preferred language already detected from previous interactions
    if (userLanguage && userLanguage !== 'en') {
      systemPrompt += ` The user has previously communicated in ${userLanguage}, so you should respond in that language after your initial English greeting.`;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 300, // Reducing token limit to encourage shorter responses
      }),
    });

    const data = await response.json();
    
    return new Response(JSON.stringify({
      message: data.choices[0].message.content,
      success: true
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-ai-response function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
