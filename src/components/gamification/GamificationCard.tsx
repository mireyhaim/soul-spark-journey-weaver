
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserLevel from './UserLevel';
import StreakCounter from './StreakCounter';
import AchievementBadge, { Achievement } from './AchievementBadge';
import { Sparkles } from 'lucide-react';

interface GamificationCardProps {
  userName: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  lastActiveDate: string;
  recentAchievements: Achievement[];
}

const GamificationCard: React.FC<GamificationCardProps> = ({ 
  userName,
  level,
  xp,
  xpToNextLevel,
  streak,
  lastActiveDate,
  recentAchievements
}) => {
  return (
    <Card className="border-spirit-100">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles size={18} className="text-spirit-500" />
          <span>Your Progress</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <UserLevel level={level} xp={xp} xpToNextLevel={xpToNextLevel} />
        
        <div className="flex justify-between items-center">
          <StreakCounter streak={streak} lastActiveDate={lastActiveDate} />
          <div className="bg-earth-50 px-2 py-1 rounded-md text-xs text-earth-600">
            +{level * 10} XP daily bonus
          </div>
        </div>
        
        {recentAchievements.length > 0 && (
          <div className="pt-2 border-t">
            <h4 className="font-medium text-sm mb-3">Recent Achievements</h4>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {recentAchievements.map(achievement => (
                <AchievementBadge 
                  key={achievement.id} 
                  achievement={achievement} 
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GamificationCard;
