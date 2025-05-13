
import { useState } from 'react';

export const useLanguageDetection = () => {
  const [userLanguage, setUserLanguage] = useState<string>('en'); // Default to English
  
  // Enhanced language detection function
  const detectLanguage = (text: string): string => {
    // Hebrew
    if (/[\u0590-\u05FF]/.test(text)) {
      return 'he';
    }
    
    // Arabic
    if (/[\u0600-\u06FF]/.test(text)) {
      return 'ar';
    }
    
    // Russian/Cyrillic
    if (/[\u0400-\u04FF]/.test(text)) {
      return 'ru';
    }
    
    // Spanish/Portuguese likely indicators
    if (/[áéíóúñ¿¡]/.test(text.toLowerCase())) {
      return 'es';
    }
    
    // French likely indicators
    if (/[àâçéèêëîïôùûüÿœ]/.test(text.toLowerCase())) {
      return 'fr';
    }
    
    // Chinese characters
    if (/[\u4E00-\u9FFF]/.test(text)) {
      return 'zh';
    }
    
    // Japanese characters (Hiragana and Katakana)
    if (/[\u3040-\u30FF]/.test(text)) {
      return 'ja';
    }
    
    // Korean characters
    if (/[\uAC00-\uD7AF\u1100-\u11FF]/.test(text)) {
      return 'ko';
    }
    
    // Thai characters
    if (/[\u0E00-\u0E7F]/.test(text)) {
      return 'th';
    }
    
    // Default to English for Latin script or when language can't be confidently determined
    return 'en';
  };

  // Update the detected language
  const updateLanguage = (text: string) => {
    const detectedLanguage = detectLanguage(text);
    if (detectedLanguage !== userLanguage) {
      setUserLanguage(detectedLanguage);
    }
    return detectedLanguage;
  };

  // Get follow-up message in the user's language
  const getFollowUpMessage = (): string => {
    switch (userLanguage) {
      case 'he':
        return "אתה עדיין כאן? אשמח לשמוע את התשובה שלך כשתהיה מוכן.";
      case 'ar':
        return "هل أنت ما زلت هنا؟ أتطلع إلى سماع إجابتك عندما تكون مستعدًا.";
      case 'ru':
        return "Вы все еще здесь? Я буду рад услышать ваш ответ, когда вы будете готовы.";
      case 'es':
        return "¿Sigues ahí? Espero escuchar tu respuesta cuando estés listo.";
      case 'fr':
        return "Es-tu toujours là ? J'attends ta réponse quand tu seras prêt.";
      default:
        return "Are you still there? I'm looking forward to hearing your answer when you're ready.";
    }
  };

  return {
    userLanguage,
    updateLanguage,
    getFollowUpMessage
  };
};
