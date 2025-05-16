
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from "@/components/ui/separator";
import { Image, Section, Columns3 } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-earth-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-spirit-100 to-spirit-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=1200')] bg-no-repeat bg-cover bg-center" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-serif font-bold mb-6 text-earth-900">
              About <span className="text-spirit-600">Flow 83</span>
            </h1>
            <p className="text-xl font-serif italic text-spirit-600 mb-4">
              Your inner journey, intelligently guided.
            </p>
            <div className="w-24 h-1 bg-spirit-300 mx-auto my-6"></div>
            <p className="text-lg text-earth-700">
              Flow 83 is a personal growth platform designed to help you reconnect with yourself, 
              expand your mindset, and transform your inner world — one intentional step at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-1/2">
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600" 
                  alt="Woman reflecting" 
                  className="w-full object-cover h-[400px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-spirit-900/40 to-transparent"></div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-serif font-semibold mb-6 text-earth-800">Our Mission</h2>
              <p className="text-lg text-earth-700 mb-6">
                We believe that deep transformation doesn't require hours of reading or endless courses. 
                It requires presence, awareness, and small, meaningful actions taken consistently.
              </p>
              <div className="bg-spirit-50 rounded-xl p-8 border border-spirit-100">
                <p className="text-earth-700 font-medium text-center text-lg mb-3">
                  That's why Flow 83 was created:
                </p>
                <p className="text-earth-700 text-center">
                  To offer a space where real human wisdom meets AI-powered guidance — so that expert-designed 
                  journeys can become truly personal, adaptive, and accessible to anyone, anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flow Guide Section */}
      <section className="py-16 bg-gradient-to-br from-spirit-50 to-spirit-100/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-10">
            <div className="lg:w-1/2">
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600" 
                  alt="Serene nature scene" 
                  className="w-full object-cover h-[400px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-calm-900/40 to-transparent"></div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-serif font-semibold mb-6 text-earth-800">Your AI Guide</h2>
              <p className="text-lg text-earth-700 mb-6">
                At the heart of the platform is Flow, your AI guide — a thoughtful, emotionally intelligent 
                companion that supports you throughout each journey.
              </p>
              <p className="text-lg text-earth-700 mb-6">
                Each process you'll experience was originally created by a real expert, coach, therapist, 
                or guide — and Flow now delivers it to you step by step, with gentle reflections and smart 
                feedback tailored to your pace and emotional state.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Flow 83 Section */}
      <section className="py-16 bg-gradient-to-br from-earth-100 to-earth-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-semibold mb-10 text-center text-earth-800">Why Flow 83?</h2>
            
            <div className="bg-white rounded-xl p-8 shadow-sm mb-10">
              <p className="text-lg text-earth-700 mb-6">
                We live in a world that glorifies doing, but healing and transformation happen in the still moments.
                Flow 83 was built to honor those moments — and to guide you through them with technology that feels 
                anything but robotic.
              </p>
              
              <p className="text-lg text-earth-700">
                Here, AI meets intention. Structure meets soul. Progress meets presence.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
              <div className="lg:col-span-2">
                <div className="relative rounded-xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600" 
                    alt="Light through trees" 
                    className="w-full object-cover h-[300px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-calm-900/40 to-transparent"></div>
                </div>
              </div>
              
              <div className="lg:col-span-3">
                <Card className="border-spirit-200 bg-earth-50/50">
                  <CardContent className="pt-6">
                    <p className="text-earth-700 font-medium text-xl mb-5">
                      This isn't a course.<br />
                      It's not a chatbot.<br />
                      It's a sacred space — powered by real human insight, enhanced by AI, and built for women and seekers ready to grow from within.
                    </p>
                    
                    <Separator className="my-6 bg-spirit-200" />
                    
                    <p className="text-lg text-earth-700 font-serif italic">
                      Whether you're starting over, seeking more meaning, or simply ready for a quiet, powerful shift…<br />
                      Flow 83 is here to walk with you.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
