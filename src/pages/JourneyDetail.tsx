import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { journeys } from '@/data/journeys';
import { getJourneyLessonTopics } from '@/data/journeys/lesson-topics';
import { getJourneyExperienceContent } from '@/data/journeys/journey-experiences';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, User, Check, UserRound } from 'lucide-react';
import JourneyExperienceList from '@/components/journey/JourneyExperienceList';
import { getJourneyPrice } from '@/utils/journey-pricing';

// Mentor profile image URLs categorized by gender
const mentorImages = {
  male: [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  ],
  female: [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  ]
};

// Helper function to detect gender based on common name patterns
// This is a simple implementation and not comprehensive
const detectGender = (name: string): 'male' | 'female' => {
  // Convert to lowercase for case-insensitive matching
  const lowerName = name.toLowerCase();
  
  // Common female name endings or names
  const femaleIndicators = ['a', 'ie', 'y', 'ah', 'sarah', 'mary', 'emily', 'jennifer', 'amanda', 'jessica', 'olivia'];
  
  // Check for specific female names or endings
  for (const indicator of femaleIndicators) {
    if (lowerName.endsWith(indicator) || lowerName.includes(indicator + ' ')) {
      return 'female';
    }
  }
  
  // Default to male if no female indicators are found
  return 'male';
};

const JourneyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [mentorImage, setMentorImage] = useState<string>('');
  
  // Find the journey by ID
  const journey = journeys.find(j => j.id === id);
  
  if (!journey) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-medium mb-4">Journey not found</h2>
        <Button onClick={() => navigate('/journeys')}>Back to Journeys</Button>
      </div>
    );
  }
  
  // Get lesson topics and experience content for this journey
  const lessonTopics = getJourneyLessonTopics(journey.id, journey.category, journey.duration);
  const experienceContent = getJourneyExperienceContent(journey.id, journey.category);
  
  // Calculate price based on journey duration
  const price = getJourneyPrice(journey.duration);
  
  // Set mentor image when journey changes
  useEffect(() => {
    // Detect gender based on teacher name
    const gender = detectGender(journey.teacher);
    
    // Select gender-appropriate images
    const genderImages = mentorImages[gender];
    
    // Generate a consistent profile image based on journey ID
    // Use modulo to ensure we stay within the array bounds
    const imageIndex = parseInt(journey.id) % genderImages.length;
    setMentorImage(genderImages[imageIndex >= 0 ? imageIndex : 0]);
  }, [journey.id, journey.teacher]);
  
  return (
    <main className="bg-gradient-to-b from-earth-50/30 to-spirit-50/30 min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Back button */}
        <Button 
          variant="ghost" 
          className="mb-6 group flex items-center gap-2 hover:bg-white/80"
          onClick={() => navigate('/journeys')}
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          <span>Back to Journeys</span>
        </Button>
        
        {/* Hero section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          {journey.image && (
            <div className="w-full h-64 md:h-80 bg-spirit-100 overflow-hidden">
              <img 
                src={journey.image} 
                alt={journey.title} 
                className="w-full h-full object-cover object-center"
              />
            </div>
          )}
          
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-semibold text-earth-900 mb-2">
                  {journey.title}
                </h1>
                
                <div className="flex items-center gap-2 text-earth-600 mb-4">
                  <User size={16} />
                  <span>{journey.teacher}</span>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 border-spirit-200 bg-spirit-50 text-spirit-700">
                    <Calendar size={14} />
                    <span>{journey.duration} Days</span>
                  </Badge>
                  
                  <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 border-earth-200 bg-earth-50 text-earth-700">
                    <Clock size={14} />
                    <span>15-20 min/day</span>
                  </Badge>
                  
                  {journey.category && (
                    <Badge variant="outline" className="px-3 py-1 border-calm-200 bg-calm-50 text-calm-700">
                      {journey.category}
                    </Badge>
                  )}
                </div>
                
                <p className="text-lg text-earth-700">
                  {journey.description}
                </p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Card className="w-full md:w-[260px] shadow-sm border-spirit-200">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <p className="text-2xl font-medium text-earth-900 mb-2">${price}</p>
                      <p className="text-sm text-earth-600">One-time payment</p>
                    </div>
                    
                    <Button className="w-full bg-green-600 hover:bg-green-700 mb-4">
                      Purchase Journey
                    </Button>
                    
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center gap-2 text-earth-700">
                        <Check size={16} className="text-green-600" />
                        <span>Full {journey.duration}-day journey</span>
                      </li>
                      <li className="flex items-center gap-2 text-earth-700">
                        <Check size={16} className="text-green-600" />
                        <span>AI spiritual guide chat</span>
                      </li>
                      <li className="flex items-center gap-2 text-earth-700">
                        <Check size={16} className="text-green-600" />
                        <span>Daily practices & reflections</span>
                      </li>
                      <li className="flex items-center gap-2 text-earth-700">
                        <Check size={16} className="text-green-600" />
                        <span>Progress tracking</span>
                      </li>
                      <li className="flex items-center gap-2 text-earth-700">
                        <Check size={16} className="text-green-600" />
                        <span>Lifetime access</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Tabs */}
        <Tabs 
          defaultValue="overview" 
          onValueChange={setActiveTab}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="border-b border-spirit-100">
            <TabsList className="h-14 w-full bg-transparent rounded-none">
              <TabsTrigger 
                value="overview"
                className={`text-base h-14 data-[state=active]:border-b-2 border-spirit-600 rounded-none ${
                  activeTab === 'overview' ? 'text-spirit-700 font-medium' : 'text-earth-600'
                }`}
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="journey-plan"
                className={`text-base h-14 data-[state=active]:border-b-2 border-spirit-600 rounded-none ${
                  activeTab === 'journey-plan' ? 'text-spirit-700 font-medium' : 'text-earth-600'
                }`}
              >
                Journey Plan
              </TabsTrigger>
              <TabsTrigger 
                value="about-teacher"
                className={`text-base h-14 data-[state=active]:border-b-2 border-spirit-600 rounded-none ${
                  activeTab === 'about-teacher' ? 'text-spirit-700 font-medium' : 'text-earth-600'
                }`}
              >
                About Mentor
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="p-6 md:p-8">
            <TabsContent value="overview" className="mt-0 space-y-6">
              <div>
                <h2 className="text-xl font-medium mb-4">What You'll Experience</h2>
                <JourneyExperienceList experienceContent={experienceContent} />
              </div>
              
              <div>
                <h2 className="text-xl font-medium mb-4">Is This Journey Right For You?</h2>
                <Card className="border-spirit-100">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-medium">This journey is perfect for you if:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <Check size={18} className="text-spirit-600 mt-1 flex-shrink-0" />
                        <span>You want to connect more deeply with your spiritual nature</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={18} className="text-spirit-600 mt-1 flex-shrink-0" />
                        <span>You're seeking practical tools for inner guidance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={18} className="text-spirit-600 mt-1 flex-shrink-0" />
                        <span>You're looking to bring spiritual practices into your daily life</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={18} className="text-spirit-600 mt-1 flex-shrink-0" />
                        <span>You're ready to develop a consistent spiritual practice</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="journey-plan" className="mt-0 space-y-6">
              <div>
                <h2 className="text-xl font-medium mb-4">Your {journey.duration}-Day Journey</h2>
                <div className="space-y-4">
                  {lessonTopics.map((lesson) => (
                    <Card key={lesson.day} className="border-spirit-100/60 hover:border-spirit-200 transition-colors">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="bg-spirit-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 text-spirit-700 font-medium">
                            <span>{lesson.day}</span>
                          </div>
                          <div>
                            <h3 className="font-medium text-lg mb-1">{lesson.title}</h3>
                            {lesson.description && (
                              <p className="text-earth-600">{lesson.description}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="about-teacher" className="mt-0 space-y-6">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-spirit-100 shadow-md bg-white">
                    <Avatar className="w-full h-full">
                      <AvatarImage src={mentorImage} alt={journey.teacher} className="object-cover" />
                      <AvatarFallback className="bg-spirit-100 text-spirit-700 text-2xl">
                        <UserRound className="h-12 w-12 text-spirit-600" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-medium text-earth-900 mb-2">{journey.teacher}</h3>
                  <p className="text-earth-600 mb-4 text-lg">Spiritual Guide & Mentor</p>
                  <p className="text-earth-700">
                    {journey.teacher} is a dedicated spiritual guide with years of experience helping people
                    connect with their inner wisdom. With a background in mindfulness practices and holistic wellness,
                    they have guided hundreds of individuals through transformative journeys.
                  </p>
                  <p className="text-earth-700 mt-4">
                    Through this carefully crafted {journey.duration}-day journey, they will share powerful practices
                    and insights designed to deepen your spiritual connection and help you discover new dimensions
                    of self-awareness and personal growth.
                  </p>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
        
        {/* Mobile purchase button (fixed to bottom on mobile) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-spirit-100 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl font-medium">${price}</span>
            <span className="text-earth-600">{journey.duration} days</span>
          </div>
          <Button className="w-full bg-green-600 hover:bg-green-700">
            Purchase Journey
          </Button>
        </div>
      </div>
    </main>
  );
};

export default JourneyDetail;
