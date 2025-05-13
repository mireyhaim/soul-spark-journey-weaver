
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface JourneyHeaderProps {
  journey: {
    title: string;
    description: string;
    teacher: string;
    duration: number;
    category?: string;
    image?: string;
  };
}

const JourneyHeader: React.FC<JourneyHeaderProps> = ({ journey }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-4 mb-2">
        <h1 className="text-3xl font-bold text-earth-900">{journey.title}</h1>
        {/* Price and duration badge removed as requested */}
      </div>
      
      <p className="text-lg text-earth-700 mb-4">{journey.description}</p>
      
      <div className="flex items-center gap-2">
        <span className="text-sm text-earth-600">Created by</span>
        <span className="font-medium">{journey.teacher}</span>
      </div>
    </div>
  );
};

export default JourneyHeader;
