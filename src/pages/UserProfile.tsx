
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from '@supabase/auth-helpers-react';
import { toast } from 'sonner';
import { journeys } from '@/data/journeys';
import { Journey } from '@/data/journeys/types';

// Import our new components
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { StatsSummary } from '@/components/profile/StatsSummary';
import { CurrentJourneys } from '@/components/profile/CurrentJourneys';
import { RecommendedJourneys } from '@/components/profile/RecommendedJourneys';
import { JourneyHistory } from '@/components/profile/JourneyHistory';
import { AccountSettings } from '@/components/profile/AccountSettings';

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
  const navigate = useNavigate();
  const session = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    if (!session) {
      toast("You need to login to access your profile.");
      // Redirect to login page
      navigate('/login');
    } else {
      setIsLoading(false);
    }
  }, [session, navigate]);

  // If loading or no session, show a loading message
  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4 md:px-6 text-center">
        <p>Loading profile...</p>
      </div>
    );
  }
  
  // If no session after loading, don't render the profile content
  if (!session) {
    return null;
  }
  
  // Get completed journeys
  const completedJourneyData = mockUser.completedJourneys.map(
    id => journeys.find(journey => journey.id === id)
  ).filter(Boolean) as Journey[];
  
  // Get in-progress journeys
  const inProgressJourneyData = mockUser.inProgressJourneys.map(progress => {
    const journey = journeys.find(j => j.id === progress.id);
    return journey ? { ...journey, ...progress } : null;
  }).filter(Boolean) as (Journey & { currentDay: number, totalDays: number })[];
  
  // Generate recommendations based on completed journeys
  const getRecommendations = () => {
    const completedCategories = completedJourneyData
      .map(journey => journey?.category)
      .filter(Boolean);
    
    const recommendations = journeys
      .filter(journey => 
        completedCategories.includes(journey.category) && 
        !mockUser.completedJourneys.includes(journey.id) &&
        !mockUser.inProgressJourneys.some(j => j.id === journey.id)
      )
      .slice(0, 3); // Limit to 3 recommendations
      
    return recommendations as Journey[];
  };
  
  const recommendedJourneys = getRecommendations();

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="flex flex-col gap-8">
        {/* User Profile Header */}
        <ProfileHeader 
          name={mockUser.name} 
          email={mockUser.email} 
          joinedDate={mockUser.joinedDate} 
        />
        
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
            <StatsSummary 
              completedCount={completedJourneyData.length} 
              inProgressCount={inProgressJourneyData.length} 
              consecutiveDays={8} 
            />
            
            {/* Current Journeys */}
            <CurrentJourneys journeys={inProgressJourneyData} />
            
            {/* Recommended Journeys */}
            <RecommendedJourneys journeys={recommendedJourneys} />
          </TabsContent>
          
          {/* Journeys Tab */}
          <TabsContent value="journeys">
            <JourneyHistory 
              completedJourneys={completedJourneyData} 
              inProgressJourneys={inProgressJourneyData} 
            />
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings">
            <AccountSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
