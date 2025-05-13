
import { useRef } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from '@/hooks/use-toast';

export const useAIResponseGeneration = () => {
  const userResponses = useRef<string[]>([]);
  const supabase = useSupabaseClient();

  // Generate responses to user messages
  const generateAIResponse = async (
    userInput: string, 
    questionIndex: number = -1, 
    currentDay: number = 1,
    userLanguage: string = 'en',
    currentJourney?: any
  ): Promise<string> => {
    try {
      // For very short responses, prompt for more detail
      if (userInput.length < 5) {
        return "I'd love to hear more about that. Could you please elaborate a bit?";
      }
      
      // Store user response for context
      userResponses.current.push(userInput);
      
      // If we're in the practice flow, create a prompt specific to the question
      let contextPrompt = '';
      
      if (questionIndex >= 0) {
        const { getDailyQuestions } = await import('../practiceQuestions');
        const dailyQuestions = getDailyQuestions(currentDay);
        contextPrompt = `The user is answering this question: "${dailyQuestions[questionIndex].question}". Their answer is: "${userInput}". Provide a supportive, empathetic response that acknowledges their reflection and gently guides them deeper.`;
      } else {
        // General conversation
        contextPrompt = `The user said: "${userInput}". Provide a supportive, empathetic response related to their spiritual journey.`;
      }
      
      const { data, error } = await supabase.functions.invoke('generate-ai-response', {
        body: {
          prompt: contextPrompt,
          journeyCategory: currentJourney?.category || 'Spiritual Growth',
          journeyName: currentJourney?.title || 'Personal Development',
          currentDay: currentDay,
          userContext: userResponses.current.slice(-3).join('\n'),
          userLanguage: userLanguage
        }
      });
      
      if (error) {
        console.error('Error calling AI function:', error);
        return "I'm reflecting on what you shared. While I process that, would you like to tell me more about your experience?";
      }
      
      return data.message;
    } catch (error) {
      console.error('Error generating AI response:', error);
      return "Thank you for sharing. I'm here to support you on this journey. Would you like to explore this topic further?";
    }
  };

  return {
    generateAIResponse
  };
};
