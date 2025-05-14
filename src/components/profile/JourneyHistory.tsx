
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Clock } from 'lucide-react';

interface CompletedJourney {
  id: string;
  title: string;
  category: string;
  duration: number;
  teacher: string;
}

interface InProgressJourney {
  id: string;
  title: string;
  category: string;
  totalDays: number;
  currentDay: number;
  teacher: string;
}

interface JourneyHistoryProps {
  completedJourneys: CompletedJourney[];
  inProgressJourneys: InProgressJourney[];
}

export const JourneyHistory: React.FC<JourneyHistoryProps> = ({ 
  completedJourneys, 
  inProgressJourneys 
}) => {
  return (
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
            {completedJourneys.map(journey => (
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
            
            {inProgressJourneys.map((journey) => (
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
  );
};
