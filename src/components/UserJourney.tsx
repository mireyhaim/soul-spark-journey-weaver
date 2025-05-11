import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2, ChevronLeft, Heart, Share, BookOpen, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import AIInteraction from './AIInteraction';
import { journeys } from '@/data/journeys';

const UserJourney: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [completed, setCompleted] = useState(false);
  
  // Find the selected journey
  const journey = journeys.find(j => j.id === id) || {
    id: '13',
    title: 'Abundance Meditation',
    description: 'Open yourself to receive abundance in all areas of your life through mindfulness and gratitude.',
    teacher: 'Sarah Jenkins',
    duration: 14,
    category: 'Abundance Manifestation',
    image: 'https://images.unsplash.com/photo-1502139214982-d0ad755818d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  };
  
  const currentDay = 5;
  const progressPercentage = Math.round((currentDay / journey.duration) * 100);
  
  const handleComplete = () => {
    setCompleted(true);
    toast({
      title: "Practice completed!",
      description: "Great job! You've completed today's practice.",
    });
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        {/* Back link and journey info */}
        <div>
          <Link to="/journeys" className="inline-flex items-center gap-1 text-spirit-600 hover:text-spirit-700 mb-6">
            <ChevronLeft size={16} />
            <span>Back to journeys</span>
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="bg-spirit-50 text-spirit-700 border-spirit-200">
                  {journey.category}
                </Badge>
                <Badge variant="outline">{journey.duration}-day journey</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-sans font-semibold mb-2">{journey.title}</h1>
              <div className="flex items-center gap-2 text-earth-600 mb-4">
                <span>Created by {journey.teacher}</span>
              </div>
              <p className="text-earth-700 max-w-3xl mb-4">
                {journey.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" size="sm" className="gap-2">
                  <Heart size={16} />
                  <span>Save</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share size={16} />
                  <span>Share</span>
                </Button>
              </div>
            </div>
            <div className="w-full md:w-auto bg-white p-4 rounded-lg border shadow-sm">
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-earth-600">Your progress</p>
                  <p className="font-medium">{currentDay} of {journey.duration}</p>
                </div>
                <Progress value={progressPercentage} className="w-full md:w-[200px] h-2" />
              </div>
              <div className="flex items-center gap-3 text-sm text-earth-600 mb-3">
                <div className="flex items-center gap-1">
                  <BookOpen size={14} />
                  <span>{journey.duration} days</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>~15 min/day</span>
                </div>
              </div>
              <Button className="w-full">{currentDay === 1 ? "Start Journey" : "Continue Journey"}</Button>
            </div>
          </div>
          
          <Card className="mb-8">
            <CardHeader className="pb-3">
              <CardTitle>Today's Practice: Gratitude Reflection</CardTitle>
              <CardDescription>Day {currentDay} • May 11, 2025</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Today we'll be focusing on cultivating gratitude as a pathway to abundance. When we appreciate what we have, we open ourselves to receiving more.</p>
              <div className="bg-earth-50 p-4 rounded-lg border border-earth-100">
                <h4 className="font-medium mb-2">Reflection Questions</h4>
                <ul className="list-disc list-inside space-y-1 text-earth-700">
                  <li>What three things are you most grateful for today?</li>
                  <li>How has gratitude helped you overcome challenges?</li>
                  <li>Where do you see abundance already present in your life?</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={handleComplete}
                disabled={completed}
              >
                {completed ? "Completed ✓" : "Complete Today's Practice"}
              </Button>
            </CardFooter>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-sans font-semibold mb-4">Your Journey Timeline</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Timeline items */}
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="rounded-full bg-green-500 text-white p-1">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div className="h-full w-px bg-earth-200 my-1"></div>
                      </div>
                      <div className="pt-1">
                        <h3 className="font-medium">Day 1: Setting Intentions</h3>
                        <p className="text-sm text-earth-600">Completed on May 7</p>
                      </div>
                    </div>
                    
                    {/* More timeline items - keep existing code */}
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="rounded-full bg-green-500 text-white p-1">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div className="h-full w-px bg-earth-200 my-1"></div>
                      </div>
                      <div className="pt-1">
                        <h3 className="font-medium">Day 2: Identifying Blocks</h3>
                        <p className="text-sm text-earth-600">Completed on May 8</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="rounded-full bg-green-500 text-white p-1">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div className="h-full w-px bg-earth-200 my-1"></div>
                      </div>
                      <div className="pt-1">
                        <h3 className="font-medium">Day 3: Releasing Limiting Beliefs</h3>
                        <p className="text-sm text-earth-600">Completed on May 9</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="rounded-full bg-green-500 text-white p-1">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div className="h-full w-px bg-earth-200 my-1"></div>
                      </div>
                      <div className="pt-1">
                        <h3 className="font-medium">Day 4: Abundance Meditation</h3>
                        <p className="text-sm text-earth-600">Completed on May 10</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="rounded-full bg-spirit-500 text-white p-1">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div className="h-full w-px bg-earth-200 my-1"></div>
                      </div>
                      <div className="pt-1">
                        <h3 className="font-medium">Day 5: Gratitude Reflection</h3>
                        <p className="text-sm text-earth-600">Today</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="rounded-full bg-earth-200 text-earth-500 p-1">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div className="h-full w-px bg-earth-200 my-1"></div>
                      </div>
                      <div className="pt-1 opacity-60">
                        <h3 className="font-medium">Day 6: Visualizing Success</h3>
                        <p className="text-sm text-earth-600">Tomorrow</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="rounded-full bg-earth-200 text-earth-500 p-1">
                          <Calendar className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="pt-1 opacity-60">
                        <h3 className="font-medium">And more...</h3>
                        <p className="text-sm text-earth-600">Upcoming practices</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <h2 className="text-2xl font-sans font-semibold mb-4">Your AI Companion</h2>
              <Tabs defaultValue="chat">
                <TabsList className="mb-4">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                </TabsList>
                <TabsContent value="chat">
                  <AIInteraction />
                </TabsContent>
                <TabsContent value="insights">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Journey Insights</CardTitle>
                      <CardDescription>Based on your interactions and progress</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-spirit-50 p-4 rounded-lg border border-spirit-100">
                        <h4 className="font-medium mb-1 text-spirit-700">Pattern Noticed</h4>
                        <p className="text-sm">You seem to connect deeply with gratitude practices but find visualization exercises challenging.</p>
                      </div>
                      <div className="bg-calm-50 p-4 rounded-lg border border-calm-100">
                        <h4 className="font-medium mb-1 text-calm-700">Recommendation</h4>
                        <p className="text-sm">Try combining gratitude and visualization by starting with what you're thankful for, then extending that into future projections.</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserJourney;
