
import { useState } from 'react';

export const useLanguageDetection = () => {
  const [detectedLanguage, setDetectedLanguage] = useState<string>('en');

  // Basic language detection based on input text
  const updateLanguage = (text: string): string => {
    // Check for Hebrew characters
    const hebrewPattern = /[\u0590-\u05FF]/;
    if (hebrewPattern.test(text)) {
      setDetectedLanguage('he');
      return 'he';
    }
    
    // Default to English
    return 'en';
  };

  // Get follow-up message based on detected language
  const getFollowUpMessage = (userName?: string): string => {
    const personalization = userName ? `${userName}, ` : '';
    
    if (detectedLanguage === 'he') {
      return `${userName ? `${userName}, ` : ''}אני מרגיש שיש עוד מחשבות שעולות בך. האם תרצה/י לשתף עוד על החוויה שלך?`;
    }
    
    const englishFollowUps = [
      `${personalization}I'm here with you in this moment. Is there anything else stirring within you that you'd like to explore?`,
      `${personalization}I sense there might be more to what you're experiencing. Would you like to share what else is present for you?`,
      `${personalization}I'm holding space for whatever might be arising in you right now. What else is moving through your awareness?`
    ];
    
    return englishFollowUps[Math.floor(Math.random() * englishFollowUps.length)];
  };

  return {
    detectedLanguage,
    updateLanguage,
    getFollowUpMessage
  };
};
