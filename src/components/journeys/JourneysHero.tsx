
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

interface JourneysHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const JourneysHero: React.FC<JourneysHeroProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-14">
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="absolute -z-10 w-64 h-64 bg-spirit-200/30 rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        
        <h1 className="text-5xl md:text-6xl font-serif font-semibold mb-6 bg-gradient-to-r from-spirit-600 to-spirit-700 bg-clip-text text-transparent">
          Perfect Journey
        </h1>
        
        <p className="text-lg md:text-xl text-earth-700 max-w-3xl mx-auto mb-10">
          Explore our collection of transformative spiritual and personal development journeys, 
          thoughtfully created by experienced teachers and guides to help you thrive.
        </p>
        
        <div className="relative w-full md:max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-earth-400" size={20} />
          <Input
            placeholder="Search journeys, teachers, or topics..."
            className="pl-12 pr-4 py-6 bg-white shadow-lg rounded-full border-0 focus-visible:ring-2 focus-visible:ring-spirit-300 transition-all text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default JourneysHero;
