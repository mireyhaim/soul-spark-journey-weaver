
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { journeys } from '@/data/journeys';
import { ProcessCardProps } from '@/components/ProcessCard';
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
  const [result, setResult] = useState<ProcessCardProps | null>(null);
  const [showResults, setShowResults] = useState(false);

  const form = useForm<QuestionnaireFormValues>({
    defaultValues: {
      goal: 'personal-growth',
      timePeriod: 'medium',
      approach: 'practical',
    },
  });

  const findMatchingJourney = (data: QuestionnaireFormValues) => {
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
    const matchingJourneys = journeys.filter(journey => 
      journey.category === targetCategory && 
      journey.duration >= minDuration && 
      journey.duration <= maxDuration
    );

    // Return first match or a default journey if no match
    return matchingJourneys.length > 0 
      ? matchingJourneys[0] 
      : journeys.find(j => j.category === targetCategory) || journeys[0];
  };

  const onSubmit = (data: QuestionnaireFormValues) => {
    const matchingJourney = findMatchingJourney(data);
    setResult(matchingJourney);
    setShowResults(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto animate-fade-in">
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
          <h3 className="text-xl font-medium text-center">Your Recommended Journey</h3>
          
          {result && (
            <div className="bg-earth-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold">{result.title}</h4>
              <p className="text-earth-600 mt-2">{result.description}</p>
              <div className="mt-3 text-sm text-earth-500">
                <span className="font-medium">Teacher:</span> {result.teacher}
              </div>
              <div className="mt-1 text-sm text-earth-500">
                <span className="font-medium">Duration:</span> {result.duration} days
              </div>
              <div className="mt-4 flex justify-center">
                <Button asChild className="bg-spirit-600 hover:bg-spirit-700">
                  <Link to={`/journey/${result.id}`}>Begin This Journey</Link>
                </Button>
              </div>
            </div>
          )}
          
          <div className="flex justify-between">
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
