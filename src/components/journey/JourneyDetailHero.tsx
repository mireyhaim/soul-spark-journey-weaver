
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { User, Calendar, Clock } from 'lucide-react';

interface JourneyDetailHeroProps {
  journey: {
    title: string;
    teacher: string;
    duration: number;
    category?: string;
    description: string;
    image?: string;
  };
}

const JourneyDetailHero: React.FC<JourneyDetailHeroProps> = ({ journey }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
      {journey.image && (
        <div className="w-full h-64 md:h-80 bg-spirit-100 overflow-hidden">
          <img 
            src={journey.image} 
            alt={journey.title} 
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}
      
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-earth-900 mb-2">
              {journey.title}
            </h1>
            
            <div className="flex items-center gap-2 text-earth-600 mb-4">
              <User size={16} />
              <span>{journey.teacher}</span>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-4">
              <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 border-spirit-200 bg-spirit-50 text-spirit-700">
                <Calendar size={14} />
                <span>{journey.duration} Days</span>
              </Badge>
              
              <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 border-earth-200 bg-earth-50 text-earth-700">
                <Clock size={14} />
                <span>15-20 min/day</span>
              </Badge>
              
              {journey.category && (
                <Badge variant="outline" className="px-3 py-1 border-calm-200 bg-calm-50 text-calm-700">
                  {journey.category}
                </Badge>
              )}
            </div>
            
            <p className="text-lg text-earth-700">
              {journey.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyDetailHero;
