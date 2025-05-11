
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DailyPracticeProps {
  currentDay: number;
  completed: boolean;
  onComplete: () => void;
}

const DailyPractice: React.FC<DailyPracticeProps> = ({ currentDay, completed, onComplete }) => {
  return (
    <Card className="mb-8">
      <CardHeader className="pb-3">
        <CardTitle>Today's Practice: Gratitude Reflection</CardTitle>
        <CardDescription>Day {currentDay} • May 11, 2025</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>Today we'll be focusing on cultivating gratitude as a pathway to abundance. When we appreciate what we have, we open ourselves to receiving more.</p>
        <div className="bg-earth-50 p-4 rounded-lg border border-earth-100">
          <h4 className="font-medium mb-2">Reflection Questions</h4>
          <ul className="list-disc list-inside space-y-1 text-earth-700">
            <li>What three things are you most grateful for today?</li>
            <li>How has gratitude helped you overcome challenges?</li>
            <li>Where do you see abundance already present in your life?</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={onComplete}
          disabled={completed}
        >
          {completed ? "Completed ✓" : "Complete Today's Practice"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DailyPractice;
