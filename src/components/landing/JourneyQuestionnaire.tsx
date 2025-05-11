
import React, { useState } from 'react';
import { ProcessCardProps } from '@/components/ProcessCard';
import QuestionnaireForm, { QuestionnaireFormValues } from './questionnaire/QuestionnaireForm';
import QuestionnaireResults from './questionnaire/QuestionnaireResults';
import { findMatchingJourneys } from './questionnaire/journeyMatcher';

interface JourneyQuestionnaireProps {
  onClose: () => void;
}

const JourneyQuestionnaire: React.FC<JourneyQuestionnaireProps> = ({ onClose }) => {
  const [results, setResults] = useState<ProcessCardProps[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (data: QuestionnaireFormValues) => {
    const matchingJourneys = findMatchingJourneys(data);
    setResults(matchingJourneys);
    setShowResults(true);
  };

  const handleTakeAgain = () => {
    setShowResults(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-3xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-serif font-semibold mb-6 text-center text-spirit-800">Find Your Perfect Journey</h2>
      
      {!showResults ? (
        <QuestionnaireForm onSubmit={handleSubmit} onClose={onClose} />
      ) : (
        <QuestionnaireResults 
          results={results} 
          onClose={onClose} 
          onTakeAgain={handleTakeAgain} 
        />
      )}
    </div>
  );
};

export default JourneyQuestionnaire;
