
import React from 'react';
import JourneyHeader from './JourneyHeader';
import JourneyProgress from './JourneyProgress';
import DailyPractice from './DailyPractice';
import JourneyTimeline from './JourneyTimeline';
import JourneyInsights from './JourneyInsights';
import JourneyExplanations from './JourneyExplanations';
import JourneyPurchase from './JourneyPurchase';

interface JourneyContentProps {
  journey: any;
  price: number;
  currentDay: number;
  savedProgress: number[];
  isPurchased: boolean;
  completed: boolean;
  showExplanations: boolean;
  onDismissExplanations: () => void;
  onComplete: () => void;
  onPurchase: () => void;
  onContinueJourney: () => void;
}

const JourneyContent: React.FC<JourneyContentProps> = ({
  journey,
  price,
  currentDay,
  savedProgress,
  isPurchased,
  completed,
  showExplanations,
  onDismissExplanations,
  onComplete,
  onPurchase,
  onContinueJourney
}) => {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        <div>
          {/* Journey header with title, description and actions */}
          <JourneyHeader journey={journey} />
          
          {/* Pre and Post Journey Explanations */}
          <JourneyExplanations 
            journey={journey}
            showExplanations={showExplanations}
            onDismiss={onDismissExplanations}
          />
          
          {/* Only show progress info and content if journey is purchased */}
          {isPurchased ? (
            <>
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
                {/* Progress information */}
                <JourneyProgress 
                  currentDay={currentDay} 
                  duration={journey.duration}
                  onContinue={onContinueJourney}
                />
              </div>
              <DailyPractice 
                currentDay={currentDay} 
                completed={completed}
                onComplete={onComplete}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Journey Timeline */}
                <JourneyTimeline 
                  currentDay={currentDay} 
                  savedProgress={savedProgress}
                />
                
                {/* AI Insights */}
                <JourneyInsights />
              </div>
            </>
          ) : (
            <JourneyPurchase 
              price={price}
              journeyTitle={journey.title}
              duration={journey.duration}
              isPurchased={isPurchased}
              onPurchase={onPurchase}
              category={journey.category}
              journeyId={journey.id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default JourneyContent;
