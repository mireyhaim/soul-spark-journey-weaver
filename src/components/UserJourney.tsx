
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import { useJourneyState } from '@/hooks/useJourneyState';
import JourneyNotFound from './journey/JourneyNotFound';
import JourneyLoading from './journey/JourneyLoading';
import JourneyContent from './journey/JourneyContent';

const UserJourney: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const journeyState = useJourneyState(id);
  const { 
    error, 
    isLoading, 
    journey,
    price,
    currentDay,
    savedProgress,
    isPurchased,
    completed,
    showExplanations,
    handleGoBack,
    handleDismissExplanations,
    handleComplete,
    handlePurchase,
    handleContinueJourney
  } = journeyState;
  
  // Show error state
  if (error) {
    return <JourneyNotFound error={error} onGoBack={handleGoBack} />;
  }
  
  // Show loading state
  if (isLoading) {
    return <JourneyLoading />;
  }

  // Render the main journey content with proper error boundary
  return (
    <ErrorBoundary fallback={<JourneyNotFound error={null} onGoBack={handleGoBack} />}>
      <JourneyContent 
        journey={journey}
        price={price}
        currentDay={currentDay}
        savedProgress={savedProgress}
        isPurchased={isPurchased}
        completed={completed}
        showExplanations={showExplanations}
        onDismissExplanations={handleDismissExplanations}
        onComplete={handleComplete}
        onPurchase={handlePurchase}
        onContinueJourney={handleContinueJourney}
      />
    </ErrorBoundary>
  );
};

export default UserJourney;
