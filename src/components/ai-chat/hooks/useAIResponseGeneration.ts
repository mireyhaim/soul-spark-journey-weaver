
import { useRef } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from '@/hooks/use-toast';
import { getJourneyLessonTopics } from '@/data/journeys/lesson-topics';
import { getJourneyExperienceContent } from '@/data/journeys/journey-experiences';

export const useAIResponseGeneration = () => {
  const userResponses = useRef<string[]>([]);
  const supabase = useSupabaseClient();

  // Generate responses to user messages
  const generateAIResponse = async (
    userInput: string, 
    questionIndex: number = -1, 
    currentDay: number = 1,
    userLanguage: string = 'en',
    currentJourney?: any,
    previousCompletedDays?: number[],
    userName?: string
  ): Promise<string> => {
    try {
      // For very short responses, prompt for more detail
      if (userInput.length < 5) {
        return userLanguage === 'he' ? 
          "אשמח לשמוע עוד על כך. האם תוכל/י לפרט יותר?" : 
          "I'd love to hear more about that. Could you elaborate?";
      }
      
      // Store user response for context
      userResponses.current.push(userInput);
      
      // Get lesson topics for current journey
      let dailyTaskInfo = '';
      let previousDaysInfo = '';
      let journeyExperiences = '';
      
      if (currentJourney?.id && currentJourney?.category) {
        // Get current day's task information
        const lessonTopics = getJourneyLessonTopics(currentJourney.id, currentJourney.category, currentJourney.duration);
        const currentTopic = lessonTopics.find(topic => topic.day === currentDay);
        
        if (currentTopic) {
          dailyTaskInfo = `Current task: ${currentTopic.title}. ${currentTopic.guidanceText || currentTopic.description || ''}`;
        }
        
        // Get previous days' information for context
        if (previousCompletedDays && previousCompletedDays.length > 0) {
          const previousTopics = lessonTopics.filter(topic => 
            previousCompletedDays.includes(topic.day) && topic.day < currentDay
          ).slice(-2); // Get last 2 completed days
          
          if (previousTopics.length > 0) {
            previousDaysInfo = `Previous completed tasks: ${previousTopics.map(topic => 
              `Day ${topic.day}: ${topic.title}`
            ).join(', ')}`;
          }
        }
        
        // Get journey experiences to provide better context
        const experiences = getJourneyExperienceContent(currentJourney.id, currentJourney.category);
        if (experiences) {
          journeyExperiences = `Journey focus: ${experiences.title}. Key aspects: ${experiences.experiences.slice(0, 3).join(', ')}`;
        }
      }
      
      // If we're in the practice flow, create a prompt specific to the question
      let contextPrompt = '';
      
      if (questionIndex >= 0) {
        const { getDailyQuestions } = await import('../practiceQuestions');
        const dailyQuestions = getDailyQuestions(currentDay);
        contextPrompt = `
          The user ${userName ? `${userName} ` : ''}is on Day ${currentDay} of the journey "${currentJourney?.title || 'Personal Development'}".
          ${dailyTaskInfo}
          ${previousDaysInfo}
          ${journeyExperiences}
          The user is answering this question: "${dailyQuestions[questionIndex].question}". 
          Their answer is: "${userInput}". 
          Previous interactions: ${userResponses.current.slice(-3).join(' | ')}
          Provide a supportive, empathetic response that acknowledges their reflection and gently guides them deeper. 
          Remember their journey progress (they've completed days: ${previousCompletedDays?.join(', ') || 'none yet'}).
          If this seems like their final reflection for today, offer a closing personal message that summarizes their progress and offers encouragement.
        `;
      } else {
        // General conversation with enhanced context and mentorship approach
        contextPrompt = `
          The user ${userName ? `${userName} ` : ''}is on Day ${currentDay} of the journey "${currentJourney?.title || 'Personal Development'}".
          ${dailyTaskInfo}
          ${previousDaysInfo}
          ${journeyExperiences}
          The user said: "${userInput}". 
          Previous interactions: ${userResponses.current.slice(-3).join(' | ')}
          Provide a supportive, empathetic response related to their journey as their mentor or guide.
          Remember their journey progress (they've completed days: ${previousCompletedDays?.join(', ') || 'none yet'}).
          Analyze their input for emotions and personal insights, and provide personalized feedback with genuine empathy.
          If this seems like their final reflection for today, offer a closing personal message that summarizes their progress and offers encouragement.
        `;
      }
      
      // Get user information if available
      const { data: { user } } = await supabase.auth.getUser();
      let userProfile = null;
      
      if (user) {
        const { data: profileData } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
          
        userProfile = profileData;
      }
      
      const { data, error } = await supabase.functions.invoke('generate-ai-response', {
        body: {
          prompt: contextPrompt,
          journeyCategory: currentJourney?.category || 'Spiritual Growth',
          journeyName: currentJourney?.title || 'Personal Development',
          currentDay: currentDay,
          userContext: userResponses.current.slice(-3).join('\n'),
          userLanguage: userLanguage,
          previousCompletedDays: previousCompletedDays || [],
          userName: userName || (userProfile?.name || '')
        }
      });
      
      if (error) {
        console.error('Error calling AI function:', error);
        return userLanguage === 'he' ?
          "אני מהרהר/ת במה שחלקת איתי. בזמן שאני מעבד/ת זאת, אולי תרצה/י לספר לי עוד על החוויה שלך?" :
          "I'm reflecting on what you've shared. While I process that, perhaps you'd like to tell me more about your experience?";
      }
      
      return data.message;
    } catch (error) {
      console.error('Error generating AI response:', error);
      return userLanguage === 'he' ?
        "תודה על השיתוף. אני כאן כדי לתמוך בך במסע הזה. האם תרצה/י לחקור נושא זה לעומק?" :
        "Thank you for sharing. I'm here to support you on this journey. Would you like to explore this topic further?";
    }
  };

  return {
    generateAIResponse
  };
};
