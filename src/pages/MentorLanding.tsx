
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';

const MentorLanding: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-spirit-50 to-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-tight text-gradient">
                  Share Your Wisdom Through InFlow
                </h1>
                <p className="text-xl text-earth-700">
                  Join our platform as a mentor and help guide others on their spiritual journey with your expertise and wisdom.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-spirit-600 hover:bg-spirit-700" asChild>
                    <Link to="/teacher">Enter Mentor Portal</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/signup">Join As Mentor</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="relative z-10 bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-float">
                  <h2 className="text-2xl font-serif font-semibold mb-4">Why Become an InFlow Mentor?</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full spirit-gradient flex items-center justify-center mt-1 mr-3">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <p>Share your spiritual practices with a wider audience</p>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full spirit-gradient flex items-center justify-center mt-1 mr-3">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <p>Create AI-powered journeys for personalized guidance</p>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full spirit-gradient flex items-center justify-center mt-1 mr-3">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <p>Earn income while making a positive impact</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
                How InFlow Works For Mentors
              </h2>
              <p className="text-lg text-earth-600 max-w-3xl mx-auto">
                Our platform makes it easy for you to share your wisdom and guide seekers through their spiritual journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-spirit-100">
                <CardContent className="pt-8 px-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full spirit-gradient mx-auto flex items-center justify-center">
                    <span className="text-white font-serif text-2xl">1</span>
                  </div>
                  <h3 className="text-xl font-medium">Upload Your Content</h3>
                  <p className="text-earth-600">
                    Share your guidance, exercises, meditations, and spiritual wisdom with our platform.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-spirit-100">
                <CardContent className="pt-8 px-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full spirit-gradient mx-auto flex items-center justify-center">
                    <span className="text-white font-serif text-2xl">2</span>
                  </div>
                  <h3 className="text-xl font-medium">Train Our AI System</h3>
                  <p className="text-earth-600">
                    Collaborate with our technology to create personalized multi-day spiritual journeys.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-spirit-100">
                <CardContent className="pt-8 px-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full spirit-gradient mx-auto flex items-center justify-center">
                    <span className="text-white font-serif text-2xl">3</span>
                  </div>
                  <h3 className="text-xl font-medium">Reach More People</h3>
                  <p className="text-earth-600">
                    Connect with seekers from around the world and help them grow spiritually with your guidance.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 md:px-6 bg-gradient-to-r from-spirit-600 to-spirit-800 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
              Ready to Share Your Wisdom?
            </h2>
            <p className="text-xl text-spirit-100 mb-8 max-w-2xl mx-auto">
              Join our growing community of spiritual mentors and help guide others on their path to growth and transformation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/teacher">Enter Mentor Portal</Link>
              </Button>
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white border-2 border-white/30 hover:border-white/40" asChild>
                <Link to="/signup">Join as Mentor</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MentorLanding;
