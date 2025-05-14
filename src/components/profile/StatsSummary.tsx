
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
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <BookOpenCheck className="text-spirit-500" size={18} />
            Completed Journeys
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{completedCount}</p>
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
          <p className="text-3xl font-bold">{inProgressCount}</p>
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
          <p className="text-3xl font-bold">{consecutiveDays}</p>
        </CardContent>
      </Card>
    </div>
  );
};
