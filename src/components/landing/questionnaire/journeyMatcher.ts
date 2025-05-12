
import { journeys } from '@/data/journeys';
import { ProcessCardProps } from '@/components/ProcessCard';
import { QuestionnaireFormValues } from './QuestionnaireForm';

export const findMatchingJourneys = (data: QuestionnaireFormValues): ProcessCardProps[] => {
  // Simple mapping of goals to categories
  const categoryMap: Record<string, string> = {
    'personal-growth': 'Personal Development',
    'spiritual-connection': 'Spirituality',
    'consciousness': 'Consciousness',
    'manifestation': 'Reality Manifestation',
    'abundance': 'Abundance Manifestation'
  };
  
  // Map time periods to durations
  const durationMap: Record<string, number[]> = {
    'short': [1, 7],
    'medium': [8, 14],
    'long': [15, 30]
  };

  const targetCategory = categoryMap[data.goal];
  const [minDuration, maxDuration] = durationMap[data.timePeriod];
  
  // Find journeys in the target category with matching duration
  let matchingJourneys = journeys.filter(journey => 
    journey.category === targetCategory && 
    journey.duration >= minDuration && 
    journey.duration <= maxDuration
  );

  // If we don't have enough matches, add some from the same category regardless of duration
  if (matchingJourneys.length < 2) {
    const additionalJourneys = journeys.filter(journey => 
      journey.category === targetCategory && 
      !matchingJourneys.some(match => match.id === journey.id)
    );
    matchingJourneys = [...matchingJourneys, ...additionalJourneys].slice(0, 3);
  }

  // If we still don't have enough matches, add some from other categories
  if (matchingJourneys.length < 3) {
    const otherJourneys = journeys.filter(journey => 
      !matchingJourneys.some(match => match.id === journey.id)
    );
    matchingJourneys = [...matchingJourneys, ...otherJourneys].slice(0, 3);
  }

  return matchingJourneys.slice(0, 3); // Return up to 3 journeys
};
