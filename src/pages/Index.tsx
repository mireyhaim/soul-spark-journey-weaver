
import React from 'react';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import JourneysSection from '@/components/landing/JourneysSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CTASection from '@/components/landing/CTASection';
import QuestionnaireSection from '@/components/landing/QuestionnaireSection';
import { featuredProcesses } from '@/components/landing/data/featuredProcesses';

const Index: React.FC = () => {
  return (
    <main className="flex-grow">
      <HeroSection />
      <div className="relative">
        <div className="absolute inset-0 bg-spirit-50/50 skew-y-3 -z-10 transform-gpu"></div>
        <FeaturesSection />
      </div>
      <QuestionnaireSection />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-earth-50/70 -skew-y-3 -z-10 transform-gpu"></div>
        <JourneysSection featuredProcesses={featuredProcesses} />
      </div>
      <TestimonialsSection />
      <CTASection />
    </main>
  );
};

export default Index;
