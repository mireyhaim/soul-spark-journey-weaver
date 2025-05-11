
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import ProcessCard, { ProcessCardProps } from '@/components/ProcessCard';

interface JourneysSectionProps {
  featuredProcesses: ProcessCardProps[];
}

const JourneysSection: React.FC<JourneysSectionProps> = ({ featuredProcesses }) => {
  return (
    <section className="py-16 px-4 md:px-6 bg-earth-50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-sans font-semibold mb-2">
              Featured Journeys
            </h2>
            <p className="text-earth-600">
              Explore our most popular spiritual journeys.
            </p>
          </div>
          <Button variant="ghost" className="hidden md:flex" asChild>
            <Link to="/journeys">View All Journeys</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProcesses.map((process) => (
            <ProcessCard key={process.id} {...process} />
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" asChild>
            <Link to="/journeys">View All Journeys</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JourneysSection;
