
import React from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export type QuestionnaireFormValues = {
  goal: 'personal-growth' | 'spiritual-connection' | 'consciousness' | 'manifestation' | 'abundance';
  timePeriod: 'short' | 'medium' | 'long';
  approach: 'practical' | 'meditative' | 'reflective';
};

interface QuestionnaireFormProps {
  onSubmit: (data: QuestionnaireFormValues) => void;
  onClose: () => void;
}

const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({ onSubmit, onClose }) => {
  const form = useForm<QuestionnaireFormValues>({
    defaultValues: {
      goal: 'personal-growth',
      timePeriod: 'medium',
      approach: 'practical',
    },
  });

  return (
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
  );
};

export default QuestionnaireForm;
