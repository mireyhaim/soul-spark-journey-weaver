
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpenCheck, Clock, Award } from 'lucide-react';

interface StatsSummaryProps {
  completedCount: number;
  inProgressCount: number;
  consecutiveDays: number;
}

export const StatsSummary: React.FC<StatsSummaryProps> = ({ 
  completedCount, 
  inProgressCount, 
  consecutiveDays 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="relative overflow-hidden group">
        <div className="absolute inset-0 bg-spirit-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <CardHeader className="pb-2 relative">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <BookOpenCheck className="text-spirit-500" size={18} />
            מסעות שהושלמו
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-3xl font-bold">{completedCount}</p>
          {completedCount > 0 && (
            <div className="text-xs text-earth-500 mt-1">
              +{completedCount * 50} XP מצטבר
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="relative overflow-hidden group">
        <div className="absolute inset-0 bg-spirit-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <CardHeader className="pb-2 relative">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Clock className="text-spirit-500" size={18} />
            מסעות בתהליך
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-3xl font-bold">{inProgressCount}</p>
          {inProgressCount > 0 && (
            <div className="text-xs text-earth-500 mt-1">
              +{inProgressCount * 5} XP יומי
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="relative overflow-hidden group">
        <div className="absolute inset-0 bg-spirit-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <CardHeader className="pb-2 relative">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Award className="text-spirit-500" size={18} />
            ימים רצופים
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-3xl font-bold">{consecutiveDays}</p>
          {consecutiveDays > 0 && (
            <div className="text-xs text-earth-500 mt-1">
              +{consecutiveDays * 10} XP בונוס
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
