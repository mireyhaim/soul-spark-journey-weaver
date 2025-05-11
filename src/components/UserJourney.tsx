
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIInteraction from './AIInteraction';

const UserJourney: React.FC = () => {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        <div>
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-serif font-semibold mb-2">Abundance Meditation Journey</h1>
              <div className="flex items-center gap-2 text-earth-600">
                <span>Created by Sarah Jenkins</span>
                <span>•</span>
                <Badge variant="outline">14-day journey</Badge>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-earth-600">Your progress</p>
                <p className="font-medium">Day 5 of 14</p>
              </div>
              <Progress value={36} className="w-[100px]" />
            </div>
          </div>
          
          <Card className="mb-8">
            <CardHeader className="pb-3">
              <CardTitle>Today's Practice: Gratitude Reflection</CardTitle>
              <CardDescription>Day 5 • May 11, 2025</CardDescription>
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
              <Button className="w-full">Complete Today's Practice</Button>
            </CardFooter>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-serif font-semibold mb-4">Your Journey Timeline</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
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
              <h2 className="text-2xl font-serif font-semibold mb-4">Your AI Companion</h2>
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
