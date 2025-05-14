
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from 'lucide-react';

interface Journey {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
}

interface RecommendedJourneysProps {
  journeys: Journey[];
}

export const RecommendedJourneys: React.FC<RecommendedJourneysProps> = ({ journeys }) => {
  return (
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
          {journeys.map(journey => (
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
          
          {journeys.length === 0 && (
            <p className="text-center col-span-3 py-4 text-earth-500">
              No recommendations available
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
