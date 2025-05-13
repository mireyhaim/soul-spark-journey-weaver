
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getJourneyLessonTopics } from '@/data/journeys/lesson-topics';
import { CalendarDays, BookOpen, MessageCircle } from 'lucide-react';

interface JourneyFullProcessProps {
  journeyId: string;
  category?: string;
  duration: number;
  showFullProcess?: boolean;
}

const JourneyFullProcess: React.FC<JourneyFullProcessProps> = ({
  journeyId,
  category,
  duration,
  showFullProcess = false
}) => {
  const lessonTopics = getJourneyLessonTopics(journeyId, category, duration);
  
  // Group lessons by week for easier navigation - ensure each week has up to 7 days
  const weeks: { [key: string]: typeof lessonTopics } = {};
  lessonTopics.forEach(lesson => {
    // Calculate week number (1-based) - each week has exactly 7 days
    const weekNumber = Math.ceil(lesson.day / 7);
    const weekKey = `Week ${weekNumber}`;
    if (!weeks[weekKey]) {
      weeks[weekKey] = [];
    }
    weeks[weekKey].push(lesson);
  });
  
  // If we shouldn't show full process yet, provide a simplified view
  if (!showFullProcess) {
    return (
      <div className="bg-white p-6 rounded-lg border shadow-sm mb-6">
        <h3 className="font-medium text-xl mb-4 flex items-center gap-2">
          <CalendarDays size={20} />
          <span>Your {duration}-Day Journey Process</span>
        </h3>
        <p className="text-earth-600 mb-4">
          This journey guides you through {duration} days of transformative practices, 
          meditations, and exercises designed to awaken and strengthen your connection 
          to your feminine power and wisdom.
        </p>
        <div className="bg-spirit-50/50 p-4 rounded-md border border-spirit-100">
          <p className="text-spirit-800 text-sm">
            Purchase this journey to see the complete day-by-day process and begin your transformation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm mb-6">
      <h3 className="font-medium text-xl mb-4 flex items-center gap-2">
        <CalendarDays size={20} />
        <span>Your {duration}-Day Journey Process</span>
      </h3>
      
      <Tabs defaultValue={Object.keys(weeks)[0]} className="w-full">
        <TabsList className="mb-4 w-full justify-start bg-earth-50 p-1 h-auto overflow-auto flex flex-wrap">
          {Object.keys(weeks).map((weekKey) => {
            const weekLessons = weeks[weekKey];
            const firstDay = weekLessons[0]?.day || 0;
            const lastDay = weekLessons[weekLessons.length - 1]?.day || 0;
            
            return (
              <TabsTrigger 
                key={weekKey} 
                value={weekKey}
                className="py-2 px-4 data-[state=active]:bg-spirit-100 data-[state=active]:text-spirit-800"
              >
                <span>{weekKey}</span>
                <span className="ml-1 text-xs text-earth-500">(Day {firstDay}-{lastDay})</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
        
        {Object.entries(weeks).map(([weekKey, weekLessons]) => (
          <TabsContent key={weekKey} value={weekKey} className="space-y-4">
            {weekLessons.map((lesson) => (
              <div key={lesson.day} className="border-b pb-4 last:border-0">
                <div className="flex items-start gap-3">
                  <div className="bg-spirit-100 text-spirit-800 rounded-full h-8 w-8 flex items-center justify-center mt-1 flex-shrink-0">
                    <span className="text-sm font-medium">{lesson.day}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-earth-900">{lesson.title}</h4>
                    {lesson.description && (
                      <p className="text-earth-600 mt-1">{lesson.description}</p>
                    )}
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1 text-earth-500 text-sm">
                        <BookOpen size={14} />
                        <span>Daily Lesson</span>
                      </div>
                      <div className="flex items-center gap-1 text-earth-500 text-sm">
                        <MessageCircle size={14} />
                        <span>AI Guide Conversation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default JourneyFullProcess;
