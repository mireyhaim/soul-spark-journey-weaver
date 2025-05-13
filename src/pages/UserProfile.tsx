
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Clock, Award, BookOpen, BookOpenCheck, Star } from 'lucide-react';
import { journeys } from '@/data/journeys';
import { Link } from 'react-router-dom';

// Mock user data - to be replaced with actual user data from Supabase
const mockUser = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah@example.com',
  joinedDate: 'April 10, 2024',
  completedJourneys: ['1', '7', '13'],
  inProgressJourneys: [
    { id: '4', currentDay: 3, totalDays: 14 },
    { id: '9', currentDay: 1, totalDays: 7 }
  ]
};

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id || mockUser.id; // Use param if available, otherwise use mock
  
  // Get completed journeys
  const completedJourneyData = mockUser.completedJourneys.map(
    id => journeys.find(journey => journey.id === id)
  ).filter(Boolean);
  
  // Get in-progress journeys
  const inProgressJourneyData = mockUser.inProgressJourneys.map(progress => {
    const journey = journeys.find(j => j.id === progress.id);
    return journey ? { ...journey, ...progress } : null;
  }).filter(Boolean);
  
  // Generate recommendations based on completed journeys
  // This is a simple algorithm that recommends journeys in the same categories
  const getRecommendations = () => {
    const completedCategories = completedJourneyData
      .map(journey => journey?.category)
      .filter(Boolean);
    
    const recommendations = journeys
      .filter(journey => 
        // Include journeys from completed categories but not already completed or in progress
        completedCategories.includes(journey.category) && 
        !mockUser.completedJourneys.includes(journey.id) &&
        !mockUser.inProgressJourneys.some(j => j.id === journey.id)
      )
      .slice(0, 3); // Limit to 3 recommendations
      
    return recommendations;
  };
  
  const recommendedJourneys = getRecommendations();

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        {/* User Profile Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-spirit-100 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold text-spirit-600">
            {mockUser.name.charAt(0)}
          </div>
          <div className="flex-grow">
            <h1 className="text-2xl md:text-3xl font-bold mb-1 font-sans">{mockUser.name}</h1>
            <p className="text-earth-600">{mockUser.email}</p>
            <p className="text-earth-500 text-sm mt-1">Member since {mockUser.joinedDate}</p>
          </div>
          <div>
            <Button variant="outline">Edit Profile</Button>
          </div>
        </div>
        
        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="journeys">My Journeys</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <BookOpenCheck className="text-spirit-500" size={18} />
                    Completed Journeys
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{completedJourneyData.length}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Clock className="text-spirit-500" size={18} />
                    Journeys in Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{inProgressJourneyData.length}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Award className="text-spirit-500" size={18} />
                    Consecutive Days
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">8</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Current Journeys */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen size={20} />
                  Current Journeys
                </CardTitle>
                <CardDescription>Journeys you are currently working on</CardDescription>
              </CardHeader>
              <CardContent>
                {inProgressJourneyData.length > 0 ? (
                  <div className="space-y-4">
                    {inProgressJourneyData.map((journey: any) => (
                      <div key={journey.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{journey.title}</h3>
                            <p className="text-earth-600 text-sm">Day {journey.currentDay} of {journey.totalDays}</p>
                          </div>
                          <Link to={`/journey/${journey.id}`}>
                            <Button size="sm" variant="outline">Continue</Button>
                          </Link>
                        </div>
                        <Progress value={(journey.currentDay / journey.totalDays) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-4 text-earth-500">You don't have any active journeys</p>
                )}
              </CardContent>
            </Card>
            
            {/* Recommended Journeys */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star size={20} />
                  Recommended Journeys
                </CardTitle>
                <CardDescription>Based on your previous completed journeys</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendedJourneys.map(journey => (
                    <Card key={journey.id} className="border">
                      <CardHeader className="p-4">
                        <div className="aspect-[16/9] rounded-md mb-3 bg-earth-100 overflow-hidden">
                          <img 
                            src={journey.image} 
                            alt={journey.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardTitle className="text-lg">{journey.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{journey.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex justify-between items-center">
                          <Badge variant="outline">{journey.category}</Badge>
                          <Link to={`/journey/${journey.id}`}>
                            <Button variant="outline" size="sm">Details</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {recommendedJourneys.length === 0 && (
                    <p className="text-center col-span-3 py-4 text-earth-500">No recommendations available</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Journeys Tab */}
          <TabsContent value="journeys">
            <Card>
              <CardHeader>
                <CardTitle>Journey History</CardTitle>
                <CardDescription>All journeys you have completed</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Journey Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Teacher</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {completedJourneyData.map(journey => journey && (
                      <TableRow key={journey.id}>
                        <TableCell className="font-medium">{journey.title}</TableCell>
                        <TableCell>{journey.category}</TableCell>
                        <TableCell>{journey.duration} days</TableCell>
                        <TableCell>{journey.teacher}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Check size={16} className="text-green-600" />
                            <span className="text-green-600">Completed</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Link to={`/journey/${journey.id}`}>
                            <Button variant="ghost" size="sm">View</Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                    
                    {inProgressJourneyData.map((journey: any) => journey && (
                      <TableRow key={journey.id}>
                        <TableCell className="font-medium">{journey.title}</TableCell>
                        <TableCell>{journey.category}</TableCell>
                        <TableCell>{journey.totalDays} days</TableCell>
                        <TableCell>{journey.teacher}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock size={16} className="text-amber-600" />
                            <span className="text-amber-600">
                              In Progress ({journey.currentDay}/{journey.totalDays})
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Link to={`/journey/${journey.id}`}>
                            <Button variant="ghost" size="sm">Continue</Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Update your account settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Notification Preferences</h3>
                  <p className="text-sm text-earth-500">
                    Coming soon - Options to manage email and website notifications
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Account Details</h3>
                  <p className="text-sm text-earth-500">
                    Coming soon - Options to update account details
                  </p>
                </div>
                
                <div>
                  <Button variant="destructive">Logout</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
