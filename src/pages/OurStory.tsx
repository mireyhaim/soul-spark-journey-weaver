
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const OurStory: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif font-bold mb-8 text-earth-900 text-center">
          Our <span className="text-spirit-600">Story</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="rounded-xl overflow-hidden shadow-md bg-earth-50/50 border border-earth-200 h-full">
            <div className="h-80 relative bg-spirit-100">
              <img
                src="/placeholder.svg"
                alt="Mirey, Founder of Flow 83"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-earth-900/70 to-transparent p-4">
                <p className="text-white font-medium">Mirey, Founder</p>
              </div>
            </div>
          </div>

          <Card className="border-spirit-200 bg-earth-50/50 h-full flex flex-col justify-center">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-serif font-semibold mb-4 text-spirit-700">
                A Note from the Founder
              </h2>
              <p className="text-earth-800 mb-4">
                I'm Mirey, the founder of Flow 83.
              </p>
              <p className="text-earth-700 mb-4">
                After years of exploring the world of personal development — from mindset coaching and healing work to spiritual practices and inner child therapy — I found myself overwhelmed.
                Too many courses. Too many voices. And not enough personal connection.
              </p>
              <p className="text-earth-700 mb-4">
                I created Flow 83 because I wanted to bring all of that wisdom together into one place — but in a way that feels gentle, guided, and truly yours.
                Not another course. Not another video to watch.
                Just one intentional step at a time, supported by real expert content — and delivered through smart, emotionally aware AI.
              </p>
              <p className="text-earth-700 mb-6">
                This platform was born from my personal need for depth without burnout, and now it's here to walk with you, too.
              </p>
              <div className="text-spirit-600 font-serif italic">
                <p>With love,</p>
                <p>Mirey</p>
                <p className="text-sm text-earth-600 mt-1">Founder of Flow 83</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-spirit-50 rounded-xl p-8 border border-spirit-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-serif font-semibold mb-6 text-spirit-700">Our Mission</h2>
            <p className="text-earth-700 text-lg mb-4">
              At Flow 83, we believe that personal growth should feel like a journey with a trusted friend, 
              not an overwhelming list of tasks.
            </p>
            <p className="text-earth-700 text-lg">
              Our mission is to provide a space where wisdom meets technology, 
              where expert knowledge is delivered with emotional intelligence, 
              and where you can grow at your own pace, one meaningful step at a time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
