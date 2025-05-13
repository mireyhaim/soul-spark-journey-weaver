
import React, { useState } from 'react';
import JourneyDailyLessons from './JourneyDailyLessons';
import JourneyExperienceList from './JourneyExperienceList';
import JourneyPurchaseButton from './JourneyPurchaseButton';
import JourneyFullProcess from './JourneyFullProcess';
import { getJourneyExperienceContent } from '@/data/journeys/journey-experiences';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface JourneyPurchaseProps {
  price: number;
  journeyTitle: string;
  duration: number;
  isPurchased: boolean;
  onPurchase: () => void;
  category?: string;
  journeyId: string;
}

const JourneyPurchase: React.FC<JourneyPurchaseProps> = ({
  price,
  journeyTitle,
  duration,
  isPurchased,
  onPurchase,
  category,
  journeyId
}) => {
  const [showFullProcess, setShowFullProcess] = useState(false);
  
  // If the journey is purchased, don't show this component at all
  if (isPurchased) {
    return null;
  }
  
  const experienceContent = getJourneyExperienceContent(journeyId, category);
  
  return (
    <div className="bg-white p-8 rounded-lg border shadow-sm mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Purchase This Journey</h2>
      <p className="text-earth-600 mb-6 text-center">
        Get full access to <span className="font-medium">{journeyTitle}</span> for just ${price}.
      </p>
      
      {/* Add the daily lessons preview with duration */}
      <JourneyDailyLessons journeyId={journeyId} category={category} duration={duration} />
      
      {/* Journey experience list */}
      <JourneyExperienceList experienceContent={experienceContent} />
      
      {/* Full journey process (day by day) */}
      <JourneyFullProcess 
        journeyId={journeyId} 
        category={category} 
        duration={duration}
        showFullProcess={showFullProcess}
      />
      
      {/* Toggle button to show/hide full process */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowFullProcess(prev => !prev)}
          className="flex items-center gap-1 text-spirit-700 hover:text-spirit-900 transition-colors"
        >
          <span>{showFullProcess ? 'Hide full process' : 'See full journey process'}</span>
          {showFullProcess ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Purchase button */}
      <JourneyPurchaseButton onPurchase={onPurchase} />
    </div>
  );
};

export default JourneyPurchase;
