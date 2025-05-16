
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
    const { 
      prompt, 
      journeyCategory, 
      journeyName, 
      currentDay, 
      userContext, 
      userLanguage,
      previousCompletedDays = [],
      userName = '' 
    } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not set in environment');
    }

    // Enhanced system prompt with more journey context, personalization and mentorship approach
    let systemPrompt = `You are a wise, empathetic mentor or spiritual guide for "${journeyName}" in the category "${journeyCategory}". `;
    
    // Add personalization if user name is available
    if (userName) {
      systemPrompt += `Address the user by their name "${userName}" occasionally to create a warm, personal connection. `;
    }
    
    systemPrompt += `The user is on Day ${currentDay} of their journey. `;
    
    // Add information about user's progress
    if (previousCompletedDays && previousCompletedDays.length > 0) {
      systemPrompt += `They have already completed Days ${previousCompletedDays.join(', ')} of their journey. `;
      systemPrompt += `Use this knowledge to reference their past work and show continuity in their development process. `;
    }
    
    systemPrompt += `Your tone is intimate, warm, and emotionally attuned - like a wise mentor who deeply understands and genuinely cares. `;
    
    // Category-specific guidance with more empathetic and mentorship approach
    if (journeyCategory?.toLowerCase().includes('spiritual') || 
        journeyCategory?.toLowerCase().includes('consciousness') || 
        journeyCategory?.toLowerCase().includes('energy')) {
      systemPrompt += `For this spiritual journey, embody the role of a compassionate spiritual guide. Focus on inner awareness, connection with higher wisdom, and embodied presence. Speak with gentle wisdom and deep understanding. `;
    } else if (journeyCategory?.toLowerCase().includes('business') || 
               journeyCategory?.toLowerCase().includes('career') || 
               journeyCategory?.toLowerCase().includes('productivity')) {
      systemPrompt += `For this professional development journey, be a supportive mentor who genuinely believes in the user's potential. Focus on actionable insights, structured growth, and meaningful results while maintaining emotional connection. `;
    } else if (journeyCategory?.toLowerCase().includes('personal') || 
               journeyCategory?.toLowerCase().includes('emotional') || 
               journeyCategory?.toLowerCase().includes('relationships')) {
      systemPrompt += `For this personal growth journey, be a compassionate guide who honors the user's emotional journey. Focus on emotional intelligence, authentic self-expression, and healthy relationship patterns with deep empathy. `;
    }
    
    // Important response formatting guidelines with emphasis on empathy
    systemPrompt += `IMPORTANT: Your responses should be 2-4 sentences long, personal, emotionally resonant, and authentically empathetic. `;
    systemPrompt += `Avoid sounding like a generic coach or therapist. Don't use formulaic phrases like "I understand" or "Let me help you". `;
    systemPrompt += `Instead, speak as a wise mentor or guide who truly sees the user and connects with their experience with genuine depth and authenticity. `;
    systemPrompt += `Respond directly to what they've expressed with emotional attunement rather than following a script. `;
    systemPrompt += `Reference specific elements from their current day's task and previous work when relevant. `;
    systemPrompt += `End with a thoughtful question or gentle guidance that flows naturally from the conversation. `;
    
    // Enhanced language adaptation rules
    systemPrompt += `IMPORTANT: You MUST adapt to the language the user is using. DO NOT rely on only their first message. `;
    systemPrompt += `You must carefully analyze EACH message from the user and respond in the same language they are using. `;
    systemPrompt += `If the user writes to you in Hebrew, respond in Hebrew. If they write in English, respond in English. If they write in Arabic, respond in Arabic. `;
    systemPrompt += `If they write in Spanish, respond in Spanish. If they write in French, respond in French. If they write in Russian, respond in Russian. `;
    systemPrompt += `Always match the user's language in EACH message they send you, even if they switch languages mid-conversation. `;
    systemPrompt += `This language adaptation is critical for creating a personalized experience. `;
    
    // If userLanguage is provided, emphasize using that language
    if (userLanguage && userLanguage !== 'en') {
      const languageNames = {
        'he': 'Hebrew',
        'ar': 'Arabic',
        'es': 'Spanish',
        'fr': 'French',
        'ru': 'Russian'
      };
      
      const languageName = languageNames[userLanguage as keyof typeof languageNames] || userLanguage;
      systemPrompt += `The user's most recent message was in ${languageName}. YOU MUST RESPOND IN ${languageName}. `;
    }
    
    // If user has sent previous messages, consider their context
    if (userContext) {
      systemPrompt += ` Based on previous interactions, consider: ${userContext}`;
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
        temperature: 0.8, // Slightly higher temperature for more empathetic, varied responses
        max_tokens: 300, // Keeping token limit to encourage shorter responses
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
