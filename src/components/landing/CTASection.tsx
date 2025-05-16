
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-24 px-4 md:px-6 bg-gradient-to-r from-spirit-600 to-spirit-800 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(circle at 25px 25px, white 2%, transparent 0%)', 
                   backgroundSize: '50px 50px' }}>
      </div>
      
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-serif font-semibold mb-6">
          Begin Your Transformative Journey Today
        </h2>
        <p className="text-xl text-spirit-100 mb-10 max-w-2xl mx-auto">
          Join thousands of seekers who have discovered deeper meaning, emotional healing, and spiritual growth.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <Button size="lg" variant="secondary" className="rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all" asChild>
            <Link to="/signup" className="flex items-center gap-2">
              Start Your Journey <ArrowRight size={16} className="ml-1" />
            </Link>
          </Button>
          <Button 
            size="lg" 
            className="bg-purple-600 hover:bg-purple-700 text-white border-2 border-white/30 hover:border-white/40 rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all" 
            asChild
          >
            <Link to="/for-teachers" className="flex items-center gap-2">
              For Mentors <ArrowRight size={16} className="ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
