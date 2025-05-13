
import React from 'react';
import JourneyDailyLessons from './JourneyDailyLessons';
import JourneyExperienceList from './JourneyExperienceList';
import JourneyPurchaseButton from './JourneyPurchaseButton';
import JourneyFullProcess from './JourneyFullProcess';
import { getJourneyExperienceContent } from '@/data/journeys/journey-experiences';

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
      
      {/* Journey experience list */}
      <JourneyExperienceList experienceContent={experienceContent} />
      
      {/* Full journey process (day by day) */}
      <JourneyFullProcess 
        journeyId={journeyId} 
        category={category} 
        duration={duration}
        showFullProcess={true}
      />
      
      {/* Purchase button */}
      <JourneyPurchaseButton onPurchase={onPurchase} />
    </div>
  );
};

export default JourneyPurchase;
