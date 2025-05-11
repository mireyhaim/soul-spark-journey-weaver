
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { journeys } from '@/data/journeys';
import ProcessCard, { ProcessCardProps } from '@/components/ProcessCard';
import { Link } from 'react-router-dom';

type QuestionnaireFormValues = {
  goal: 'personal-growth' | 'spiritual-connection' | 'consciousness' | 'manifestation' | 'abundance';
  timePeriod: 'short' | 'medium' | 'long';
  approach: 'practical' | 'meditative' | 'reflective';
};

interface JourneyQuestionnaireProps {
  onClose: () => void;
}

const JourneyQuestionnaire: React.FC<JourneyQuestionnaireProps> = ({ onClose }) => {
  const [results, setResults] = useState<ProcessCardProps[]>([]);
  const [showResults, setShowResults] = useState(false);

  const form = useForm<QuestionnaireFormValues>({
    defaultValues: {
      goal: 'personal-growth',
      timePeriod: 'medium',
      approach: 'practical',
    },
  });

  const findMatchingJourneys = (data: QuestionnaireFormValues): ProcessCardProps[] => {
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

  const onSubmit = (data: QuestionnaireFormValues) => {
    const matchingJourneys = findMatchingJourneys(data);
    setResults(matchingJourneys);
    setShowResults(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-3xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-serif font-semibold mb-6 text-center text-spirit-800">Find Your Perfect Journey</h2>
      
      {!showResults ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-lg font-medium">What is your primary goal?</FormLabel>
                  <FormControl>
                    <RadioGroup 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      className="space-y-2"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="personal-growth" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Personal growth and development</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="spiritual-connection" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Deeper spiritual connection</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="consciousness" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Expanding consciousness</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="manifestation" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Creating life outcomes through manifestation</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="abundance" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Attracting abundance</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timePeriod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-lg font-medium">How much time can you commit?</FormLabel>
                  <FormControl>
                    <RadioGroup 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      className="space-y-2"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="short" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">1-7 days (short journey)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="medium" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">8-14 days (medium journey)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="long" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">15+ days (deep journey)</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="approach"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-lg font-medium">What approach resonates with you?</FormLabel>
                  <FormControl>
                    <RadioGroup 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      className="space-y-2"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="practical" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Practical exercises and actions</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="meditative" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Meditation and mindfulness</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="reflective" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Reflection and journaling</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={onClose}>Close</Button>
              <Button type="submit" className="bg-spirit-600 hover:bg-spirit-700">Find My Journey</Button>
            </div>
          </form>
        </Form>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-xl font-medium text-center mb-6">Your Recommended Journeys</h3>
          
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {results.map((journey) => (
                <ProcessCard key={journey.id} {...journey} />
              ))}
            </div>
          ) : (
            <p className="text-center text-earth-600">No matching journeys found. Please try different preferences.</p>
          )}
          
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowResults(false);
                form.reset();
              }}
            >
              Take Again
            </Button>
            <Button 
              variant="ghost" 
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JourneyQuestionnaire;
