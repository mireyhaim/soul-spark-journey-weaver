
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Calendar } from 'lucide-react';

interface JourneyTimelineProps {
  currentDay: number;
  savedProgress?: number[];
}

const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ currentDay, savedProgress = [] }) => {
  // Get current date to calculate past and future dates
  const today = new Date();
  
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
      // Calculate completed date (just for demonstration)
      const completedDate = new Date(today);
      completedDate.setDate(today.getDate() - (currentDay - day));
      return `Completed on May ${completedDate.getDate()}`;
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
      <h2 className="text-2xl font-sans font-semibold mb-4">Your Journey Timeline</h2>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Timeline items */}
            {timelineItems.map((item) => (
              <div key={item.day} className="flex">
                <div className="flex flex-col items-center mr-4">
                  {savedProgress.includes(item.day) ? (
                    <div className="rounded-full bg-green-500 text-white p-1">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                  ) : item.day === currentDay ? (
                    <div className="rounded-full bg-spirit-500 text-white p-1">
                      <Calendar className="h-5 w-5" />
                    </div>
                  ) : (
                    <div className="rounded-full bg-earth-200 text-earth-500 p-1">
                      <Calendar className="h-5 w-5" />
                    </div>
                  )}
                  {item.day < timelineItems.length && (
                    <div className={`h-full w-px ${item.day < currentDay ? 'bg-green-300' : 'bg-earth-200'} my-1`}></div>
                  )}
                </div>
                <div className={`pt-1 ${item.day > currentDay ? 'opacity-60' : ''}`}>
                  <h3 className="font-medium">Day {item.day}: {item.title}</h3>
                  <p className="text-sm text-earth-600">{getDayStatus(item.day)}</p>
                </div>
              </div>
            ))}
            
            {/* And more... entry */}
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="rounded-full bg-earth-200 text-earth-500 p-1">
                  <Calendar className="h-5 w-5" />
                </div>
              </div>
              <div className="pt-1 opacity-60">
                <h3 className="font-medium">And more...</h3>
                <p className="text-sm text-earth-600">Upcoming practices</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JourneyTimeline;
