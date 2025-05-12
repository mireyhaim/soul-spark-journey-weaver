
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface JourneyProgressProps {
  currentDay: number;
  duration: number;
  onContinue: () => void;
}

const JourneyProgress: React.FC<JourneyProgressProps> = ({ currentDay, duration, onContinue }) => {
  const progressPercentage = Math.round((currentDay / duration) * 100);
  
  return (
    <div className="w-full md:w-auto bg-white p-4 rounded-lg border shadow-sm">
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm text-earth-600">Your progress</p>
          <p className="font-medium">{currentDay} of {duration}</p>
        </div>
        <Progress value={progressPercentage} className="w-full md:w-[200px] h-2" />
      </div>
      <div className="flex items-center gap-3 text-sm text-earth-600 mb-3">
        <div className="flex items-center gap-1">
          <BookOpen size={14} />
          <span>{duration} days</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>~15 min/day</span>
        </div>
      </div>
      <Button className="w-full" onClick={onContinue}>
        {currentDay === 1 ? "Start Journey" : "Continue Journey"}
      </Button>
    </div>
  );
};

export default JourneyProgress;
