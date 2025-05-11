
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { QuestionnaireFormValues } from '../QuestionnaireForm';

interface GoalQuestionProps {
  form: UseFormReturn<QuestionnaireFormValues>;
}

const GoalQuestion: React.FC<GoalQuestionProps> = ({ form }) => {
  return (
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
  );
};

export default GoalQuestion;
