
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import StaticChatImage from './StaticChatImage';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 px-4 md:px-6 relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-spirit-200/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-calm-200/30 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-tight">
              Begin Your <span className="text-gradient">Personal Growth</span> Journey
            </h1>
            <p className="text-lg text-earth-700 font-medium">
              Within Flow 83, you'll find powerful journeys for personal growth, mindset transformation, 
              conscious business, and spiritual development — each created by top mentors and experts 
              in their fields, and brought to life through supportive, intelligent AI guidance.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-spirit-600 hover:bg-spirit-700 rounded-full px-8" asChild>
                <Link to="/signup" className="flex items-center gap-2">
                  Start Now <ArrowRight size={16} className="ml-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
                <Link to="/journeys">Explore Journeys</Link>
              </Button>
            </div>
          </div>
          <div className="relative animate-float lg:flex justify-end">
            <div className="relative z-10 bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-spirit-100/50">
              <div className="absolute -right-20 -top-20 w-40 h-40 bg-spirit-100/50 rounded-full -z-10 blur-3xl"></div>
              <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-calm-100/50 rounded-full -z-10 blur-3xl"></div>
              <StaticChatImage />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
