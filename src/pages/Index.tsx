
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
      <FeaturesSection />
      <QuestionnaireSection />
      <JourneysSection featuredProcesses={featuredProcesses} />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
};

export default Index;
