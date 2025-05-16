
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from "@/components/ui/separator";

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif font-bold mb-4 text-earth-900 text-gradient">
          About <span className="text-spirit-600">Flow 83</span>
        </h1>
        <h2 className="text-xl font-serif italic text-spirit-600 mb-8">
          Your inner journey, intelligently guided.
        </h2>

        <div className="prose prose-earth max-w-none">
          <p className="text-lg text-earth-700 mb-8">
            Flow 83 is a personal growth platform designed to help you reconnect with yourself, 
            expand your mindset, and transform your inner world — one intentional step at a time.
          </p>
          
          <p className="text-lg text-earth-700 mb-8">
            We believe that deep transformation doesn't require hours of reading or endless courses. 
            It requires presence, awareness, and small, meaningful actions taken consistently.
          </p>

          <div className="bg-spirit-50 rounded-xl p-8 border border-spirit-100 my-10">
            <p className="text-earth-700 font-medium text-center text-lg mb-3">
              That's why Flow 83 was created:
            </p>
            <p className="text-earth-700 text-center">
              To offer a space where real human wisdom meets AI-powered guidance — so that expert-designed journeys can become truly personal, adaptive, and accessible to anyone, anytime.
            </p>
          </div>

          <p className="text-lg text-earth-700 mb-4">
            At the heart of the platform is Flow, your AI guide — a thoughtful, emotionally intelligent companion that supports you throughout each journey.
          </p>
          <p className="text-lg text-earth-700 mb-8">
            Each process you'll experience was originally created by a real expert, coach, therapist, or guide — and Flow now delivers it to you step by step, with gentle reflections and smart feedback tailored to your pace and emotional state.
          </p>

          <h3 className="text-2xl font-serif font-semibold mb-4 text-spirit-700">What We Offer:</h3>
          <ul className="list-disc pl-6 space-y-2 text-earth-700 mb-8">
            <li>
              Guided journeys of 7, 14, or 21 days, created by real experts in personal growth, mindset, spirituality, and emotional healing
            </li>
            <li>
              Daily support from Flow, your AI guide, who listens, reflects, and gently nudges you forward
            </li>
            <li>
              A quiet space to process emotions, challenge limiting beliefs, and grow in your own rhythm
            </li>
            <li>
              A growing library of topics — from abundance and self-confidence to clarity, balance, and deep inner work
            </li>
          </ul>

          <h3 className="text-2xl font-serif font-semibold mb-4 text-spirit-700">Why Flow 83?</h3>
          <p className="text-lg text-earth-700 mb-4">
            We live in a world that glorifies doing, but healing and transformation happen in the still moments.
            Flow 83 was built to honor those moments — and to guide you through them with technology that feels anything but robotic.
            Here, AI meets intention. Structure meets soul. Progress meets presence.
          </p>

          <Card className="border-spirit-200 bg-earth-50/50 my-10">
            <CardContent className="pt-6">
              <p className="text-earth-700 font-medium text-xl mb-3">
                This isn't a course.<br />
                It's not a chatbot.<br />
                It's a sacred space — powered by real human insight, enhanced by AI, and built for women and seekers ready to grow from within.
              </p>
            </CardContent>
          </Card>

          <p className="text-lg text-earth-700 font-serif italic">
            Whether you're starting over, seeking more meaning, or simply ready for a quiet, powerful shift…<br />
            Flow 83 is here to walk with you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
