
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Heart, Share } from 'lucide-react';
import { ProcessCardProps } from '@/components/ProcessCard';

interface JourneyHeaderProps {
  journey: ProcessCardProps;
}

// Calculate price based on journey duration
const getJourneyPrice = (duration: number): number => {
  if (duration <= 7) return 11;
  if (duration <= 14) return 15;
  return 27;
};

const JourneyHeader: React.FC<JourneyHeaderProps> = ({ journey }) => {
  const price = getJourneyPrice(journey.duration);
  
  return (
    <>
      <Link to="/journeys" className="inline-flex items-center gap-1 text-spirit-600 hover:text-spirit-700 mb-6">
        <ChevronLeft size={16} />
        <span>Back to journeys</span>
      </Link>
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="bg-spirit-50 text-spirit-700 border-spirit-200">
              {journey.category}
            </Badge>
            <Badge variant="outline">{journey.duration}-day journey</Badge>
            <Badge variant="default" className="bg-green-600 hover:bg-green-700">
              ${price}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-sans font-semibold mb-2">{journey.title}</h1>
          <div className="flex items-center gap-2 text-earth-600 mb-4">
            <span>Created by {journey.teacher}</span>
          </div>
          <p className="text-earth-700 max-w-3xl mb-4">
            {journey.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" size="sm" className="gap-2">
              <Heart size={16} />
              <span>Save</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Share size={16} />
              <span>Share</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JourneyHeader;
