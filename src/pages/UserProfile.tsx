
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { StatsSummary } from '@/components/profile/StatsSummary';
import { CurrentJourneys } from '@/components/profile/CurrentJourneys';
import { RecommendedJourneys } from '@/components/profile/RecommendedJourneys';
import { AccountSettings } from '@/components/profile/AccountSettings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { journeys } from '@/data/journeys';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GamificationCard from '@/components/gamification/GamificationCard';
import { achievements, getUserAchievements } from '@/data/achievements';
import AchievementBadge from '@/components/gamification/AchievementBadge';
import { Trophy } from 'lucide-react';

// Dummy data for the profile
const profileName = "Ilana Cohen";
const profileEmail = "ilana@example.com";
const joinDate = "2023-05-12"; // Format: YYYY-MM-DD

// Convert to display format
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Dummy data for current journeys
const currentJourneysData = [
  {...journeys[0], currentDay: 3, totalDays: 14},
  {...journeys[1], currentDay: 7, totalDays: 21},
];

// Dummy recommended journeys
const recommendedJourneysData = [
  journeys[2],
  journeys[3],
  journeys[4],
];

// Dummy gamification data
const userLevel = 3;
const userXp = 230;
const xpToNextLevel = 500;
const userStreak = 7;
const lastActiveDate = new Date().toISOString();
const unlockedAchievementIds = ['first-login', 'first-journey', 'three-day-streak', 'feedback-giver'];
const userAchievements = getUserAchievements(unlockedAchievementIds);
const recentAchievements = userAchievements.filter(a => a.unlocked).slice(0, 3);

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Stats data
  const statsData = {
    completedCount: 2,
    inProgressCount: currentJourneysData.length,
    consecutiveDays: userStreak,
  };
  
  return (
    <main className="container mx-auto p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <ProfileHeader 
          name={profileName}
          email={profileEmail}
          joinedDate={formatDate(joinDate)}
          level={userLevel}
        />
        
        <GamificationCard
          userName={profileName}
          level={userLevel}
          xp={userXp}
          xpToNextLevel={xpToNextLevel}
          streak={userStreak}
          lastActiveDate={lastActiveDate}
          recentAchievements={recentAchievements}
        />
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <StatsSummary {...statsData} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-3">
                <CurrentJourneys journeys={currentJourneysData} />
              </div>
              <div className="lg:col-span-3 mt-6">
                <RecommendedJourneys journeys={recommendedJourneysData} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy size={20} className="text-spirit-500" />
                  My Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pt-2">
                  {userAchievements.map(achievement => (
                    <div key={achievement.id} className="flex flex-col items-center gap-2 p-2 rounded-md">
                      <AchievementBadge achievement={achievement} size="lg" />
                      <div className="text-center mt-1">
                        <p className="font-medium">{achievement.name}</p>
                        <p className="text-sm text-earth-600">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <AccountSettings />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default UserProfile;
