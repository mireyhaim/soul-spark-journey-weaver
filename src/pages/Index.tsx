
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProcessCard, { ProcessCardProps } from '@/components/ProcessCard';
import AIInteraction from '@/components/AIInteraction';

const featuredProcesses: ProcessCardProps[] = [
  {
    id: '1',
    title: 'Journey to Forgiveness',
    description: 'Learn to release resentment and cultivate inner peace through guided forgiveness practices.',
    teacher: 'Michael Thompson',
    duration: 7,
    category: 'Forgiveness'
  },
  {
    id: '2',
    title: 'Abundance Meditation',
    description: 'Open yourself to receive abundance in all areas of your life through mindfulness and gratitude.',
    teacher: 'Sarah Jenkins',
    duration: 14,
    category: 'Abundance'
  },
  {
    id: '3',
    title: 'Healing Inner Child',
    description: 'Connect with and heal your inner child through compassionate awareness and guided visualizations.',
    teacher: 'Elena Rodriguez',
    duration: 21,
    category: 'Healing'
  },
  {
    id: '4',
    title: 'Conscious Relationships',
    description: 'Develop deeper connections through emotional intelligence and mindful communication.',
    teacher: 'David Chen',
    duration: 14,
    category: 'Relationships'
  }
];

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-earth-50 to-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-tight text-gradient">
                  Spiritual Growth Through AI Guidance
                </h1>
                <p className="text-xl text-earth-700">
                  Personalized spiritual journeys guided by AI, designed by exceptional teachers and therapists.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-spirit-600 hover:bg-spirit-700" asChild>
                    <Link to="/signup">Begin Your Journey</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/teachers">Join As Teacher</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="relative z-10 bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-float">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-spirit-100 rounded-full -z-10 -translate-y-1/3 translate-x-1/3 blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-calm-100 rounded-full -z-10 translate-y-1/3 -translate-x-1/3 blur-3xl"></div>
                  <AIInteraction />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
                How SoulPath Works
              </h2>
              <p className="text-lg text-earth-600 max-w-3xl mx-auto">
                Our platform connects spiritual teachers with seekers through AI-guided personal journeys.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-spirit-100">
                <CardContent className="pt-8 px-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full spirit-gradient mx-auto flex items-center justify-center">
                    <span className="text-white font-serif text-2xl">1</span>
                  </div>
                  <h3 className="text-xl font-medium">Teachers Create Content</h3>
                  <p className="text-earth-600">
                    Spiritual teachers upload their guidance, exercises, meditations, and wisdom.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-spirit-100">
                <CardContent className="pt-8 px-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full spirit-gradient mx-auto flex items-center justify-center">
                    <span className="text-white font-serif text-2xl">2</span>
                  </div>
                  <h3 className="text-xl font-medium">AI Creates Journeys</h3>
                  <p className="text-earth-600">
                    Our system transforms their content into personalized multi-day spiritual journeys.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-spirit-100">
                <CardContent className="pt-8 px-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full spirit-gradient mx-auto flex items-center justify-center">
                    <span className="text-white font-serif text-2xl">3</span>
                  </div>
                  <h3 className="text-xl font-medium">Users Experience Growth</h3>
                  <p className="text-earth-600">
                    You engage with the AI companion that guides you through a transformative process.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Featured Journeys Section */}
        <section className="py-16 px-4 md:px-6 bg-earth-50">
          <div className="container mx-auto max-w-6xl">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-2">
                  Featured Journeys
                </h2>
                <p className="text-earth-600">
                  Explore our most popular spiritual journeys.
                </p>
              </div>
              <Button variant="ghost" className="hidden md:flex" asChild>
                <Link to="/journeys">View All Journeys</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProcesses.map((process) => (
                <ProcessCard key={process.id} {...process} />
              ))}
            </div>
            
            <div className="mt-8 text-center md:hidden">
              <Button variant="outline" asChild>
                <Link to="/journeys">View All Journeys</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
                Transformative Experiences
              </h2>
              <p className="text-lg text-earth-600 max-w-3xl mx-auto">
                Hear from people whose lives have been changed by SoulPath journeys.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-spirit-50 border-spirit-100">
                <CardContent className="pt-8 pb-8 px-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <svg className="h-8 w-8 text-spirit-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    <p className="text-earth-700 flex-grow">
                      "The Forgiveness Journey helped me release decades of resentment I was carrying. The AI companion seemed to understand exactly what I needed each day."
                    </p>
                    <div className="mt-6 pt-6 border-t border-spirit-200">
                      <p className="font-medium">Jamie Lewis</p>
                      <p className="text-sm text-earth-500">14-day Forgiveness Journey</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-calm-50 border-calm-100">
                <CardContent className="pt-8 pb-8 px-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <svg className="h-8 w-8 text-calm-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    <p className="text-earth-700 flex-grow">
                      "Since completing the Abundance Meditation journey, I've noticed a complete shift in my mindset about money and opportunities. They seem to flow more easily now."
                    </p>
                    <div className="mt-6 pt-6 border-t border-calm-200">
                      <p className="font-medium">Alex Chen</p>
                      <p className="text-sm text-earth-500">21-day Abundance Journey</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-earth-50 border-earth-100">
                <CardContent className="pt-8 pb-8 px-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <svg className="h-8 w-8 text-earth-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    <p className="text-earth-700 flex-grow">
                      "As a therapist myself, I was skeptical about AI guidance, but the Inner Child journey was profound. The exercises were thoughtful and the guidance felt genuinely supportive."
                    </p>
                    <div className="mt-6 pt-6 border-t border-earth-200">
                      <p className="font-medium">Dr. Sophia Patel</p>
                      <p className="text-sm text-earth-500">7-day Inner Child Journey</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
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
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                <Link to="/teachers">Join as Teacher</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
