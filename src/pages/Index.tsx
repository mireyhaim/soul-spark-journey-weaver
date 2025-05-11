
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import JourneysSection from '@/components/landing/JourneysSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CTASection from '@/components/landing/CTASection';
import { featuredProcesses } from '@/components/landing/data/featuredProcesses';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <JourneysSection featuredProcesses={featuredProcesses} />
        <TestimonialsSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
