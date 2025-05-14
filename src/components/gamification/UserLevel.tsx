
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface UserLevelProps {
  level: number;
  xp: number;
  xpToNextLevel: number;
}

const UserLevel: React.FC<UserLevelProps> = ({ level, xp, xpToNextLevel }) => {
  const progressPercentage = Math.min(Math.round((xp / xpToNextLevel) * 100), 100);
  
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-spirit-100 text-spirit-700 w-8 h-8 rounded-full flex items-center justify-center">
            <span className="font-bold">{level}</span>
          </div>
          <span className="font-medium">Level {level}</span>
        </div>
        <span className="text-sm text-earth-600">{xp}/{xpToNextLevel} XP</span>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
};

export default UserLevel;
