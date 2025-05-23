
import React from 'react';
import ProcessCard from '@/components/ProcessCard';
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';

interface JourneyGridProps {
  currentJourneys: any[];
  filteredJourneys: any[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setActiveTab: (tab: string) => void;
}

const JourneyGrid: React.FC<JourneyGridProps> = ({ 
  currentJourneys, 
  filteredJourneys, 
  searchQuery, 
  setSearchQuery, 
  setActiveTab
}) => {
  return (
    <div className="mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        {currentJourneys.map((journey, index) => (
          <div key={journey.id} 
            className="group transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
            style={{ animationDelay: `${0.1 * index}s` }}>
            <ProcessCard key={journey.id} {...journey} />
          </div>
        ))}
      </div>
      
      {filteredJourneys.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-earth-100 animate-fade-in">
          <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-earth-100 flex items-center justify-center">
            <Search size={24} className="text-earth-500" />
          </div>
          <h3 className="text-xl font-sans font-medium mb-2">No journeys found</h3>
          <p className="text-earth-600 mb-4">Try adjusting your search or filters</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchQuery('');
              setActiveTab('All');
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default JourneyGrid;
