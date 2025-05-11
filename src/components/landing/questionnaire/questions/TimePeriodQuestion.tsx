
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { QuestionnaireFormValues } from '../QuestionnaireForm';

interface TimePeriodQuestionProps {
  form: UseFormReturn<QuestionnaireFormValues>;
}

const TimePeriodQuestion: React.FC<TimePeriodQuestionProps> = ({ form }) => {
  return (
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
                <FormLabel className="font-normal cursor-pointer">1-7 days (short journey) - <span className="text-spirit-700 font-medium">$11</span></FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="medium" />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer">8-14 days (medium journey) - <span className="text-spirit-700 font-medium">$15</span></FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="long" />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer">15+ days (deep journey) - <span className="text-spirit-700 font-medium">$27</span></FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default TimePeriodQuestion;
