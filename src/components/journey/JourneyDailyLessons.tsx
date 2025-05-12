
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
        <span>Daily Lessons Preview:</span>
      </h3>
      <ul className="text-earth-700 space-y-2 ml-2">
        {previewLessons.map((lesson) => (
          <li key={lesson.day} className="flex items-start gap-2">
            <span className="text-earth-900 font-bold">Day {lesson.day}:</span>
            <span>{lesson.title}</span>
          </li>
        ))}
        {lessonTopics.length > maxPreview && (
          <li className="text-earth-500 italic text-sm mt-2">
            ...and {lessonTopics.length - maxPreview} more lessons throughout the journey
          </li>
        )}
      </ul>
    </div>
  );
};

export default JourneyDailyLessons;
