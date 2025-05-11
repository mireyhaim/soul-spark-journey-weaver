
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const CTASection: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-6 bg-gradient-to-r from-spirit-600 to-spirit-800 text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
          Begin Your Transformative Journey Today
        </h2>
        <p className="text-xl text-spirit-100 mb-8 max-w-2xl mx-auto">
          Join thousands of seekers who have discovered deeper meaning, emotional healing, and spiritual growth.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="secondary" asChild>
            <Link to="/signup">Start Your Journey</Link>
          </Button>
          <Button 
            size="lg" 
            className="bg-purple-600 hover:bg-purple-700 text-white border-2 border-white/30 hover:border-white/40" 
            asChild
          >
            <Link to="/mentor">For Mentors</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
