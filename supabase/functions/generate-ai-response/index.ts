
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

    // Default system prompt is in English, will be used for initial interaction
    let systemPrompt = "You are an empathetic and supportive spiritual guide for a journey called ";
    systemPrompt += `"${journeyName}" in the category "${journeyCategory}". `;
    systemPrompt += `The user is on Day ${currentDay} of their journey. `;
    systemPrompt += `Your role is to accompany the user in their process of deep personal and spiritual development. `;
    systemPrompt += `Your approach is warm, wise, embracing and empathetic - like a spiritual teacher or therapist who holds a safe space for growth and development. `;
    systemPrompt += `In addition to listening and providing support, your role includes active guidance in the daily tasks of the journey, encouraging deep reflection, and guiding consistent practice. `;
    systemPrompt += `Your responses should be full of compassion, empowering, and suited to spiritual growth. `;
    systemPrompt += `Avoid giving medical advice, and focus on personal empowerment and transformation. `;
    systemPrompt += `Use language that honors the user's inner wisdom, and encourage self-inquiry rather than providing absolute answers. `;
    systemPrompt += `At the end of each of your messages, include a thoughtful question to encourage further reflection and dialogue. `;
    systemPrompt += `Act like a real human spiritual guide who is genuinely interested in the user's journey and responses. `;
    systemPrompt += `IMPORTANT: You should respond in English initially. If the user responds in a different language, adapt and continue the conversation in that language.`;
    
    // If user has sent previous messages, consider their context
    if (userContext) {
      systemPrompt += ` Based on previous interactions, consider: ${userContext}`;
    }

    // If user has a preferred language already detected from previous interactions
    if (userLanguage && userLanguage !== 'en') {
      systemPrompt += ` The user has previously communicated in ${userLanguage}, so you should respond in that language.`;
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
        max_tokens: 500,
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
