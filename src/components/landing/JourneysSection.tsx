
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import ProcessCard, { ProcessCardProps } from '@/components/ProcessCard';
import { ChevronRight } from 'lucide-react';

interface JourneysSectionProps {
  featuredProcesses: ProcessCardProps[];
}

const JourneysSection: React.FC<JourneysSectionProps> = ({ featuredProcesses }) => {
  return (
    <section className="py-24 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-3">
              Featured Journeys
            </h2>
            <p className="text-lg text-earth-600 max-w-xl">
              Explore our most popular spiritual and personal development journeys curated by expert mentors.
            </p>
          </div>
          <Button variant="ghost" className="hidden md:flex items-center group" asChild>
            <Link to="/journeys">
              View All Journeys
              <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProcesses.map((process) => (
            <div key={process.id} className="flex flex-col h-full transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <ProcessCard {...process} />
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
          <Button variant="outline" className="rounded-full" asChild>
            <Link to="/journeys" className="flex items-center">
              View All Journeys
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JourneysSection;
