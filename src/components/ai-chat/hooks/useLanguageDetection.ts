import { useState } from 'react';

export const useLanguageDetection = () => {
  const [detectedLanguage, setDetectedLanguage] = useState<string>('en');

  // Enhanced language detection based on input text
  const updateLanguage = (text: string): string => {
    // Check for Hebrew characters
    const hebrewPattern = /[\u0590-\u05FF]/;
    if (hebrewPattern.test(text)) {
      setDetectedLanguage('he');
      return 'he';
    }
    
    // Check for Arabic characters
    const arabicPattern = /[\u0600-\u06FF]/;
    if (arabicPattern.test(text)) {
      setDetectedLanguage('ar');
      return 'ar';
    }
    
    // Check for Russian characters
    const russianPattern = /[\u0400-\u04FF]/;
    if (russianPattern.test(text)) {
      setDetectedLanguage('ru');
      return 'ru';
    }

    // Check for Spanish common words and characters
    const spanishPattern = /(\b(hola|gracias|como|está|buenos|días|qué|por|favor)\b)|[áéíóúüñ¿¡]/i;
    if (spanishPattern.test(text)) {
      setDetectedLanguage('es');
      return 'es';
    }

    // Check for French common words and characters
    const frenchPattern = /(\b(bonjour|merci|comment|ça va|salut|oui|non|je|tu|nous|vous)\b)|[àâäæçéèêëîïôœùûüÿ]/i;
    if (frenchPattern.test(text)) {
      setDetectedLanguage('fr');
      return 'fr';
    }
    
    // Default to English or keep previous detection
    return detectedLanguage || 'en';
  };

  // Get follow-up message based on detected language
  const getFollowUpMessage = (userName?: string): string => {
    const personalization = userName ? `${userName}, ` : '';
    
    // Follow-up messages in different languages
    const followUps: Record<string, string[]> = {
      'en': [
        `${personalization}I'm here with you in this moment. Is there anything else stirring within you that you'd like to explore?`,
        `${personalization}I sense there might be more to what you're experiencing. Would you like to share what else is present for you?`,
        `${personalization}I'm holding space for whatever might be arising in you right now. What else is moving through your awareness?`
      ],
      'he': [
        `${personalization}אני כאן איתך ברגע זה. האם יש עוד משהו שעולה בך שהיית רוצה לחקור?`,
        `${personalization}אני מרגיש שיש עוד למה שאתה חווה. האם תרצה לשתף מה עוד נוכח עבורך?`,
        `${personalization}אני מחזיק מרחב למה שעולה בך כרגע. מה עוד נע דרך המודעות שלך?`
      ],
      'ar': [
        `${personalization}أنا هنا معك في هذه اللحظة. هل هناك أي شيء آخر يتحرك بداخلك وترغب في استكشافه؟`,
        `${personalization}أشعر أنه قد يكون هناك المزيد مما تختبره. هل ترغب في مشاركة ما هو موجود أيضًا بالنسبة لك؟`,
        `${personalization}أنا أحتفظ بمساحة لأي شيء قد ينشأ فيك الآن. ما الذي يتحرك أيضًا من خلال وعيك؟`
      ],
      'es': [
        `${personalization}Estoy aquí contigo en este momento. ¿Hay algo más que esté surgiendo dentro de ti que te gustaría explorar?`,
        `${personalization}Siento que podría haber más en lo que estás experimentando. ¿Te gustaría compartir qué más está presente para ti?`,
        `${personalization}Estoy sosteniendo espacio para lo que sea que esté surgiendo en ti ahora mismo. ¿Qué más se está moviendo a través de tu conciencia?`
      ],
      'fr': [
        `${personalization}Je suis ici avec toi en ce moment. Y a-t-il autre chose qui s'éveille en toi que tu aimerais explorer?`,
        `${personalization}Je sens qu'il pourrait y avoir plus dans ce que tu vis. Aimerais-tu partager ce qui est également présent pour toi?`,
        `${personalization}Je crée un espace pour tout ce qui peut surgir en toi en ce moment. Qu'est-ce qui traverse aussi ta conscience?`
      ],
      'ru': [
        `${personalization}Я здесь с тобой в этот момент. Есть ли что-то еще, что возникает внутри тебя, что ты хотел бы исследовать?`,
        `${personalization}Я чувствую, что в твоем опыте может быть больше. Хотел бы ты поделиться, что еще присутствует для тебя?`,
        `${personalization}Я держу пространство для всего, что может возникать в тебе прямо сейчас. Что еще движется через твое осознание?`
      ]
    };
    
    // Get messages for the detected language or fall back to English
    const messages = followUps[detectedLanguage] || followUps['en'];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return {
    detectedLanguage,
    updateLanguage,
    getFollowUpMessage
  };
};
