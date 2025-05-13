
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface JourneyTimelineProps {
  currentDay: number;
  savedProgress?: number[];
}

const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ currentDay, savedProgress = [] }) => {
  // Empty implementation as requested - removing the timeline list of days
  return null;
};

export default JourneyTimeline;
