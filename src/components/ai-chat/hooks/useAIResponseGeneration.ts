
import { useRef } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from '@/hooks/use-toast';
import { getJourneyLessonTopics } from '@/data/journeys/lesson-topics';

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
        return "אשמח לשמוע עוד על כך. האם תוכל/י לפרט יותר?";
      }
      
      // Store user response for context
      userResponses.current.push(userInput);
      
      // Get lesson topics for current journey
      let dailyTaskInfo = '';
      if (currentJourney?.id && currentJourney?.category) {
        const lessonTopics = getJourneyLessonTopics(currentJourney.id, currentJourney.category, currentJourney.duration);
        const currentTopic = lessonTopics.find(topic => topic.day === currentDay);
        if (currentTopic) {
          dailyTaskInfo = `Current task: ${currentTopic.title}. ${currentTopic.guidanceText || currentTopic.description || ''}`;
        }
      }
      
      // If we're in the practice flow, create a prompt specific to the question
      let contextPrompt = '';
      
      if (questionIndex >= 0) {
        const { getDailyQuestions } = await import('../practiceQuestions');
        const dailyQuestions = getDailyQuestions(currentDay);
        contextPrompt = `
          The user is on Day ${currentDay} of the journey "${currentJourney?.title || 'Personal Development'}".
          ${dailyTaskInfo}
          The user is answering this question: "${dailyQuestions[questionIndex].question}". 
          Their answer is: "${userInput}". 
          Provide a supportive, empathetic response that acknowledges their reflection and gently guides them deeper. 
          If this seems like their final reflection for today, offer a closing personal message that summarizes their progress and offers encouragement.
        `;
      } else {
        // General conversation
        contextPrompt = `
          The user is on Day ${currentDay} of the journey "${currentJourney?.title || 'Personal Development'}".
          ${dailyTaskInfo}
          The user said: "${userInput}". 
          Provide a supportive, empathetic response related to their spiritual journey.
          Analyze their input for emotions and personal insights, and provide personalized feedback.
          If this seems like their final reflection for today, offer a closing personal message that summarizes their progress and offers encouragement.
        `;
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
        return "אני מהרהר/ת במה שחלקת איתי. בזמן שאני מעבד/ת זאת, אולי תרצה/י לספר לי עוד על החוויה שלך?";
      }
      
      return data.message;
    } catch (error) {
      console.error('Error generating AI response:', error);
      return "תודה על השיתוף. אני כאן כדי לתמוך בך במסע הזה. האם תרצה/י לחקור נושא זה לעומק?";
    }
  };

  return {
    generateAIResponse
  };
};
