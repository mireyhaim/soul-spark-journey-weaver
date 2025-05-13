
import React from 'react';
import { useParams } from 'react-router-dom';
import { journeys } from '@/data/journeys';
import JourneyHeader from './journey/JourneyHeader';
import JourneyProgress from './journey/JourneyProgress';
import JourneyExplanations from './journey/JourneyExplanations';
import JourneyPurchase from './journey/JourneyPurchase';
import MobileChatView from './journey/MobileChatView';
import JourneyChatSection from './journey/JourneyChatSection';
import { useJourneyState, getJourneyPrice } from '@/hooks/use-journey-state';

const UserJourney: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the selected journey
  const journey = journeys.find(j => j.id === id) || {
    id: '13',
    title: 'Abundance Meditation',
    description: 'Open yourself to receive abundance in all areas of your life through mindfulness and gratitude.',
    teacher: 'Sarah Jenkins',
    duration: 14,
    category: 'Abundance Manifestation',
    image: 'https://images.unsplash.com/photo-1502139214982-d0ad755818d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  };
  
  const {
    currentDay,
    completed,
    isPurchased,
    showExplanations,
    showChatOnMobile,
    price,
    isMobile,
    handleComplete,
    handleNextDay,
    handlePurchase,
    handleContinueJourney,
    handleDismissExplanations,
    toggleMobileChat
  } = useJourneyState(journey);

  // If we're on mobile and showing the chat, only render JourneyInsights
  if (isMobile && showChatOnMobile && isPurchased) {
    return (
      <MobileChatView
        currentDay={currentDay}
        completed={completed}
        onComplete={handleComplete}
        onBack={() => toggleMobileChat()}
      />
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        <div>
          {/* Journey header with title, description and actions */}
          <JourneyHeader journey={journey} />
          
          {/* Pre and Post Journey Explanations - only show if not purchased and explanations are enabled */}
          {!isPurchased && (
            <JourneyExplanations 
              journey={journey}
              showExplanations={showExplanations}
              onDismiss={handleDismissExplanations}
            />
          )}
          
          {/* Only show progress info and content if journey is purchased */}
          {isPurchased ? (
            <>
              <div className="mb-6">
                {/* Progress information */}
                <JourneyProgress 
                  currentDay={currentDay} 
                  duration={journey.duration}
                  onContinue={handleContinueJourney}
                  completed={completed}
                  onNext={handleNextDay}
                />
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {/* Journey AI Chat with Practice Questions */}
                <JourneyChatSection
                  currentDay={currentDay}
                  completed={completed}
                  onComplete={handleComplete}
                  isMobile={isMobile}
                  onToggleChat={toggleMobileChat}
                />
              </div>
            </>
          ) : (
            <JourneyPurchase 
              price={price}
              journeyTitle={journey.title}
              duration={journey.duration}
              isPurchased={isPurchased}
              onPurchase={handlePurchase}
              category={journey.category}
              journeyId={journey.id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserJourney;
