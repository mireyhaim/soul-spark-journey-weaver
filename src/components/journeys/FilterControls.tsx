
import React from 'react';
import { Button } from "@/components/ui/button";
import { Filter } from 'lucide-react';

interface FilterControlsProps {
  activeTab: string;
  filteredJourneys: any[];
}

const FilterControls: React.FC<FilterControlsProps> = ({ activeTab, filteredJourneys }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center text-xl font-serif font-medium text-earth-800">
        {activeTab === 'All' ? 'All Journeys' : activeTab} 
        <span className="ml-2 text-sm text-earth-600 font-sans font-normal">
          ({filteredJourneys.length} journeys)
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-2 border-spirit-200 hover:bg-spirit-50">
          <Filter size={16} className="text-spirit-600" />
          <span className="hidden sm:inline">Filter</span>
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-spirit-200 hover:bg-spirit-50 hover:text-spirit-700"
        >
          Popular
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="border-spirit-200 hover:bg-spirit-50 hover:text-spirit-700"
        >
          Newest
        </Button>
      </div>
    </div>
  );
};

export default FilterControls;
