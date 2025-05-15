
import React from 'react';
import { getJourneyLessonTopics } from '@/data/journeys/lesson-topics';
import { CalendarDays, BookOpen } from 'lucide-react';

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
    <div className="bg-white rounded-lg border shadow-sm mb-6 overflow-hidden">
      <div className="p-4 border-b bg-earth-50 flex items-center gap-2">
        <CalendarDays size={20} className="text-spirit-700" />
        <h3 className="font-medium text-lg">Complete {duration}-Day Journey Process</h3>
      </div>
      
      <div className="p-4">
        <ul className="space-y-3 divide-y divide-earth-100">
          {lessonTopics.map((lesson) => (
            <li key={lesson.day} className="pt-3 first:pt-0">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-spirit-100 to-spirit-200 h-8 w-8 rounded-md flex items-center justify-center flex-shrink-0 shadow-sm">
                  <BookOpen size={14} className="text-spirit-700" />
                  <span className="font-medium text-spirit-800 ml-0.5">{lesson.day}</span>
                </div>
                <span className="text-gray-800">{lesson.title}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JourneyFullProcess;
