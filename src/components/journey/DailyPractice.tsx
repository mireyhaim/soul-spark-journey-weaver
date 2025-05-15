
import React from 'react';
import { getJourneyLessonTopics } from '@/data/journeys/lesson-topics';
import { cn } from '@/lib/utils';

interface DailyPracticeProps {
  journeyId: string;
  category?: string;
  duration: number;
  currentDay: number;
}

const DailyPractice: React.FC<DailyPracticeProps> = ({
  journeyId,
  category,
  duration,
  currentDay
}) => {
  // Get the lesson topics for the current journey
  const lessonTopics = getJourneyLessonTopics(journeyId, category, duration);
  
  // Find the current day's lesson
  const currentLesson = lessonTopics.find(lesson => lesson.day === currentDay);
  
  if (!currentLesson) {
    return <div>No practice available for today.</div>;
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-xl font-serif font-medium mb-4">
        יום {currentDay}: {currentLesson.title}
      </h3>
      
      {currentLesson.guidanceText ? (
        <div className="prose max-w-none">
          <p className="text-earth-700">{currentLesson.guidanceText}</p>
        </div>
      ) : currentLesson.description ? (
        <div className="prose max-w-none">
          <p className="text-earth-700">{currentLesson.description}</p>
        </div>
      ) : (
        <p className="text-earth-500 italic">
          השלם את שאלות הרפלקציה להיום כדי להתקדם במסע שלך.
        </p>
      )}
      
      {currentLesson.videoUrl && (
        <div className="mt-6">
          <h4 className="font-medium mb-2">צפה בהדרכה של היום:</h4>
          <div className={cn("aspect-video bg-earth-100 rounded-md overflow-hidden")}>
            <iframe
              className="w-full h-full"
              src={currentLesson.videoUrl}
              title={`יום ${currentDay} - ${currentLesson.title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyPractice;
