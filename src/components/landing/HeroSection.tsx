
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import StaticChatImage from './StaticChatImage';

const HeroSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-earth-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-tight text-gradient">
              Begin Your Personal Growth Journey
            </h1>
            <p className="text-lg text-black font-medium mb-4">
              Within Flow 83, you'll find powerful journeys for personal growth, mindset transformation, conscious business, and spiritual development — each created by top mentors and experts in their fields, and brought to life through supportive, intelligent AI guidance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-spirit-600 hover:bg-spirit-700" asChild>
                <Link to="/signup">Start Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/journeys">Explore Journeys</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-float">
              <div className="absolute top-0 right-0 w-24 h-24 bg-spirit-100 rounded-full -z-10 -translate-y-1/3 translate-x-1/3 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-calm-100 rounded-full -z-10 translate-y-1/3 -translate-x-1/3 blur-3xl"></div>
              <StaticChatImage />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
