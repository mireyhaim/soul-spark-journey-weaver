
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from 'lucide-react';

interface JourneyTimelineProps {
  currentDay: number;
  savedProgress?: number[];
}

const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ currentDay, savedProgress = [] }) => {
  // Create timeline items dynamically based on the journey progress
  const timelineItems = [
    { day: 1, title: "Setting Intentions" },
    { day: 2, title: "Identifying Blocks" },
    { day: 3, title: "Releasing Limiting Beliefs" },
    { day: 4, title: "Abundance Meditation" },
    { day: 5, title: "Gratitude Reflection" },
    { day: 6, title: "Visualizing Success" }
  ];
  
  // Function to determine the status text for a day
  const getDayStatus = (day: number) => {
    if (savedProgress.includes(day)) {
      return "Completed";
    } else if (day === currentDay) {
      return "Today";
    } else if (day === currentDay + 1) {
      return "Tomorrow";
    } else {
      return "Upcoming";
    }
  };
  
  return (
    <div>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Timeline items */}
            {timelineItems.map((item) => (
              <div key={item.day} className="flex items-center gap-3 py-2">
                <div className={`p-2 rounded-full ${
                  savedProgress.includes(item.day) 
                    ? 'bg-spirit-100 text-spirit-600' 
                    : item.day === currentDay
                      ? 'bg-spirit-500 text-white' 
                      : 'bg-earth-100 text-earth-600'
                }`}>
                  <Calendar className="h-5 w-5" />
                </div>
                <div className={`${item.day > currentDay ? 'text-earth-600' : 'text-earth-900'}`}>
                  <div className="font-medium">Day {item.day}: {item.title}</div>
                  <div className="text-sm text-earth-500">{getDayStatus(item.day)}</div>
                </div>
              </div>
            ))}
            
            {/* And more... entry */}
            <div className="flex items-center gap-3 py-2">
              <div className="p-2 rounded-full bg-earth-100 text-earth-600">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="text-earth-600">
                <div className="font-medium">And more...</div>
                <div className="text-sm">Upcoming practices</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JourneyTimeline;
