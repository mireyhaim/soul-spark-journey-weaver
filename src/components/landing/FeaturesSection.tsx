
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Calendar, TrendingUp } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-24 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            How Flow 83 Works
          </h2>
          <p className="text-lg text-earth-600 max-w-2xl mx-auto">
            Our platform connects you with personalized spiritual guidance through AI-powered journeys.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <Card className="border-spirit-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-10 px-6 text-center space-y-6 relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-spirit-100 mx-auto flex items-center justify-center">
                <MessageSquare className="h-7 w-7 text-spirit-600" />
              </div>
              <h3 className="text-xl font-medium">Choose Your Journey</h3>
              <p className="text-earth-600">
                Select from a variety of transformative spiritual journeys designed for your unique needs and goals.
              </p>
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-spirit-50 rounded-full opacity-50"></div>
            </CardContent>
          </Card>
          
          <Card className="border-spirit-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-10 px-6 text-center space-y-6 relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-calm-100 mx-auto flex items-center justify-center">
                <Calendar className="h-7 w-7 text-calm-600" />
              </div>
              <h3 className="text-xl font-medium">Daily Guidance</h3>
              <p className="text-earth-600">
                Receive personalized exercises, meditations, and practices tailored to your unique journey every day.
              </p>
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-calm-50 rounded-full opacity-50"></div>
            </CardContent>
          </Card>
          
          <Card className="border-spirit-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-10 px-6 text-center space-y-6 relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-earth-100 mx-auto flex items-center justify-center">
                <TrendingUp className="h-7 w-7 text-earth-600" />
              </div>
              <h3 className="text-xl font-medium">Experience Growth</h3>
              <p className="text-earth-600">
                Grow spiritually through consistent practice with your AI companion guiding your transformation.
              </p>
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-earth-50 rounded-full opacity-50"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
