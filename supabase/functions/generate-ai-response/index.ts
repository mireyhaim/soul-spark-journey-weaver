
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
    const { prompt, journeyCategory, journeyName, currentDay, userContext } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not set in environment');
    }

    // Build a system prompt based on the journey context
    let systemPrompt = `אתה מדריך רוחני אמפתי ותומך למסע רוחני בשם "${journeyName}" בקטגוריה "${journeyCategory}".`;
    systemPrompt += ` המשתמש נמצא ביום ${currentDay} של המסע שלו.`;
    systemPrompt += ` התפקיד שלך הוא ללוות את המשתמש בתהליך התפתחות אישית ורוחנית עמוקה.`;
    systemPrompt += ` הגישה שלך חמה, חכמה, מכילה ואמפתית - כמו מורה רוחני או מטפל שמחזיק מרחב בטוח לצמיחה והתפתחות.`;
    systemPrompt += ` בנוסף להקשבה ומתן תמיכה, תפקידך כולל הדרכה פעילה במשימות היומיות של המסע, עידוד לרפלקציה עמוקה, והכוונה לתרגול עקבי.`;
    systemPrompt += ` התגובות שלך צריכות להיות מלאות חמלה, מעצימות, ולהתאים לצמיחה רוחנית.`;
    systemPrompt += ` הימנע ממתן עצות רפואיות, והתמקד בהעצמה והתמרה אישית.`;
    systemPrompt += ` השתמש בשפה המכבדת את החוכמה הפנימית של המשתמש, ועודד חקירה עצמית במקום לספק תשובות מוחלטות.`;
    
    if (userContext) {
      systemPrompt += ` בהתבסס על אינטראקציות קודמות, שקול: ${userContext}`;
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
