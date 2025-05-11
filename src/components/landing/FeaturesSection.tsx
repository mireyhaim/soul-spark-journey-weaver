
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            How SoulPath Works
          </h2>
          <p className="text-lg text-earth-600 max-w-3xl mx-auto">
            Our platform connects you with personalized spiritual guidance through AI-powered journeys.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-spirit-100">
            <CardContent className="pt-8 px-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full spirit-gradient mx-auto flex items-center justify-center">
                <span className="text-white font-serif text-2xl">1</span>
              </div>
              <h3 className="text-xl font-medium">Choose Your Journey</h3>
              <p className="text-earth-600">
                Select from a variety of transformative spiritual journeys designed for your needs.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-spirit-100">
            <CardContent className="pt-8 px-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full spirit-gradient mx-auto flex items-center justify-center">
                <span className="text-white font-serif text-2xl">2</span>
              </div>
              <h3 className="text-xl font-medium">Daily Guidance</h3>
              <p className="text-earth-600">
                Receive personalized exercises, meditations, and practices tailored to your unique journey.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-spirit-100">
            <CardContent className="pt-8 px-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full spirit-gradient mx-auto flex items-center justify-center">
                <span className="text-white font-serif text-2xl">3</span>
              </div>
              <h3 className="text-xl font-medium">Experience Growth</h3>
              <p className="text-earth-600">
                Grow spiritually through consistent practice with your AI companion guiding your transformation.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
