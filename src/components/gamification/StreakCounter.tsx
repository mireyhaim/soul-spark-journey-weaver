
import React from 'react';
import { Calendar } from 'lucide-react';

interface StreakCounterProps {
  streak: number;
  lastActiveDate: string;
}

const StreakCounter: React.FC<StreakCounterProps> = ({ streak, lastActiveDate }) => {
  const lastActive = new Date(lastActiveDate);
  const today = new Date();
  const isActiveToday = lastActive.toDateString() === today.toDateString();
  
  return (
    <div className="flex items-center gap-2">
      <div className={`p-2 rounded-full ${isActiveToday ? 'bg-spirit-100 text-spirit-700' : 'bg-earth-50 text-earth-500'}`}>
        <Calendar size={18} />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-lg">{streak} days</span>
        <span className="text-xs text-earth-500">Current streak</span>
      </div>
    </div>
  );
};

export default StreakCounter;
