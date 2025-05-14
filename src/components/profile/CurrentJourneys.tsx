
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen } from 'lucide-react';

interface Journey {
  id: string;
  title: string;
  currentDay: number;
  totalDays: number;
}

interface CurrentJourneysProps {
  journeys: Journey[];
}

export const CurrentJourneys: React.FC<CurrentJourneysProps> = ({ journeys }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen size={20} />
          Current Journeys
        </CardTitle>
        <CardDescription>Journeys you are currently working on</CardDescription>
      </CardHeader>
      <CardContent>
        {journeys.length > 0 ? (
          <div className="space-y-4">
            {journeys.map((journey) => (
              <div key={journey.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{journey.title}</h3>
                    <p className="text-earth-600 text-sm">
                      Day {journey.currentDay} of {journey.totalDays}
                    </p>
                  </div>
                  <Link to={`/journey/${journey.id}`}>
                    <Button size="sm" variant="outline">Continue</Button>
                  </Link>
                </div>
                <Progress 
                  value={(journey.currentDay / journey.totalDays) * 100} 
                  className="h-2" 
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-4 text-earth-500">
            You don't have any active journeys
          </p>
        )}
      </CardContent>
    </Card>
  );
};
