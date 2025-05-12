
export interface PracticeQuestion {
  question: string;
  fieldKey: string;
}

// Get daily practice questions based on current day
export const getDailyQuestions = (currentDay: number): PracticeQuestion[] => {
  switch(currentDay) {
    case 1:
      return [
        { question: "What specific form of abundance are you seeking to manifest?", fieldKey: "question1" },
        { question: "Why is this important to you on a soul level?", fieldKey: "question2" },
        { question: "How will you feel when this abundance manifests in your life?", fieldKey: "question3" }
      ];
    case 2:
      return [
        { question: "What beliefs about money or abundance did you learn growing up?", fieldKey: "question1" },
        { question: "What fears come up when you think about having more abundance?", fieldKey: "question2" },
        { question: "What new belief would better serve your abundance journey?", fieldKey: "question3" }
      ];
    case 3:
      return [
        { question: "Write a letter to release a limiting belief about abundance:", fieldKey: "question1" },
        { question: "What emotions arise as you release this belief?", fieldKey: "question2" },
        { question: "Create an affirmation to replace this limiting belief:", fieldKey: "question3" }
      ];
    case 4:
      return [
        { question: "Describe what you saw during your abundance meditation:", fieldKey: "question1" },
        { question: "What emotions did you experience?", fieldKey: "question2" },
        { question: "How can you bring this feeling into your daily life?", fieldKey: "question3" }
      ];
    case 5:
    default:
      return [
        { question: "What three things are you most grateful for today?", fieldKey: "question1" },
        { question: "How has gratitude helped you overcome challenges?", fieldKey: "question2" },
        { question: "Where do you see abundance already present in your life?", fieldKey: "question3" }
      ];
  }
};
