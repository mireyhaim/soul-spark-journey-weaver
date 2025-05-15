
import React from 'react';
import { Check, Calendar } from 'lucide-react';

interface ProcessesBarProps {
  currentDay: number;
  duration: number;
  savedProgress: number[];
}

const ProcessesBar: React.FC<ProcessesBarProps> = ({ 
  currentDay, 
  duration, 
  savedProgress 
}) => {
  // Create an array of days for the journey
  const days = Array.from({ length: duration }, (_, i) => i + 1);
  
  return (
    <div className="w-full md:w-auto flex items-center bg-white p-4 rounded-lg border shadow-sm overflow-x-auto">
      <div className="flex space-x-3 min-w-max">
        {days.map(day => {
          const isCompleted = savedProgress.includes(day);
          const isCurrent = day === currentDay;
          
          return (
            <div key={day} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-md flex items-center justify-center ${
                  isCompleted 
                    ? 'bg-spirit-600 text-white shadow-sm' 
                    : isCurrent
                      ? 'bg-spirit-100 border-2 border-spirit-600 text-spirit-600'
                      : 'bg-earth-50 border border-earth-200 text-earth-400'
                }`}
              >
                {isCompleted ? <Check size={16} /> : day}
              </div>
              <span className={`text-xs mt-1 ${
                isCurrent ? 'text-spirit-600 font-medium' : 'text-earth-500'
              }`}>
                Day {day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessesBar;
