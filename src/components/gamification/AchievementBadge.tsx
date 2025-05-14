
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ 
  achievement, 
  size = 'md' 
}) => {
  const { name, icon, unlocked } = achievement;
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base'
  };
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className={cn(
          "rounded-full flex items-center justify-center relative mb-1",
          sizeClasses[size],
          unlocked 
            ? "bg-spirit-100 text-spirit-700" 
            : "bg-earth-100 text-earth-400 opacity-60"
        )}
      >
        <span className="text-xl">{icon}</span>
        {!unlocked && (
          <div className="absolute inset-0 bg-earth-200/50 rounded-full flex items-center justify-center">
            <span className="text-earth-600 text-xs">🔒</span>
          </div>
        )}
      </div>
      <Badge 
        variant={unlocked ? "default" : "outline"}
        className={cn(
          "font-normal whitespace-nowrap",
          unlocked ? "bg-spirit-100 text-spirit-700 hover:bg-spirit-200" : "text-earth-400"
        )}
      >
        {name}
      </Badge>
    </div>
  );
};

export default AchievementBadge;
