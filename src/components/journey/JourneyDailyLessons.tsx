
import React from 'react';
import { BookOpen } from 'lucide-react';
import { getJourneyLessonTopics } from '@/data/journeys/lesson-topics';

interface JourneyDailyLessonsProps {
  journeyId: string;
  category?: string;
  duration: number;
  maxPreview?: number;
}

const JourneyDailyLessons: React.FC<JourneyDailyLessonsProps> = ({ 
  journeyId, 
  category,
  duration,
  maxPreview = 5
}) => {
  const lessonTopics = getJourneyLessonTopics(journeyId, category, duration);
  
  // Show a limited number of lessons in the preview based on maxPreview
  const previewLessons = lessonTopics.slice(0, maxPreview);
  
  return (
    <div className="bg-earth-50 p-4 rounded-md mb-6">
      <h3 className="font-medium text-earth-800 flex items-center gap-2 mb-3">
        <BookOpen size={18} />
        <span>Daily Lessons:</span>
      </h3>
      <ul className="space-y-2 ml-2">
        {previewLessons.map((lesson) => (
          <li key={lesson.day} className="flex items-start gap-2">
            <span className="font-bold">Day {lesson.day}:</span>
            <span>{lesson.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JourneyDailyLessons;
