
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Calendar } from 'lucide-react';

interface JourneyTimelineProps {
  currentDay: number;
}

const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ currentDay }) => {
  // Get current date to calculate past and future dates
  const today = new Date();
  
  return (
    <div>
      <h2 className="text-2xl font-sans font-semibold mb-4">Your Journey Timeline</h2>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Timeline items */}
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="rounded-full bg-green-500 text-white p-1">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="h-full w-px bg-earth-200 my-1"></div>
              </div>
              <div className="pt-1">
                <h3 className="font-medium">Day 1: Setting Intentions</h3>
                <p className="text-sm text-earth-600">Completed on May 7</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="rounded-full bg-green-500 text-white p-1">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="h-full w-px bg-earth-200 my-1"></div>
              </div>
              <div className="pt-1">
                <h3 className="font-medium">Day 2: Identifying Blocks</h3>
                <p className="text-sm text-earth-600">Completed on May 8</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="rounded-full bg-green-500 text-white p-1">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="h-full w-px bg-earth-200 my-1"></div>
              </div>
              <div className="pt-1">
                <h3 className="font-medium">Day 3: Releasing Limiting Beliefs</h3>
                <p className="text-sm text-earth-600">Completed on May 9</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="rounded-full bg-green-500 text-white p-1">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="h-full w-px bg-earth-200 my-1"></div>
              </div>
              <div className="pt-1">
                <h3 className="font-medium">Day 4: Abundance Meditation</h3>
                <p className="text-sm text-earth-600">Completed on May 10</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="rounded-full bg-spirit-500 text-white p-1">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="h-full w-px bg-earth-200 my-1"></div>
              </div>
              <div className="pt-1">
                <h3 className="font-medium">Day 5: Gratitude Reflection</h3>
                <p className="text-sm text-earth-600">Today</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className="rounded-full bg-earth-200 text-earth-500 p-1">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="h-full w-px bg-earth-200 my-1"></div>
              </div>
              <div className="pt-1 opacity-60">
                <h3 className="font-medium">Day 6: Visualizing Success</h3>
                <p className="text-sm text-earth-600">Tomorrow</p>
              </div>
            </div>
            
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
