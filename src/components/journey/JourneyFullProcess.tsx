
import React from 'react';
import { getJourneyLessonTopics } from '@/data/journeys/lesson-topics';

interface JourneyFullProcessProps {
  journeyId: string;
  category?: string;
  duration: number;
  showFullProcess: boolean;
}

const JourneyFullProcess: React.FC<JourneyFullProcessProps> = ({ 
  journeyId, 
  category,
  duration,
  showFullProcess
}) => {
  if (!showFullProcess) {
    return null;
  }
  
  const lessonTopics = getJourneyLessonTopics(journeyId, category, duration);
  
  return (
    <div className="bg-earth-50 p-4 rounded-md mb-6 border border-earth-100">
      <ul className="space-y-2">
        {lessonTopics.map((lesson) => (
          <li key={lesson.day} className="flex items-start gap-2">
            <span className="font-bold">Day {lesson.day}:</span>
            <span>{lesson.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JourneyFullProcess;
