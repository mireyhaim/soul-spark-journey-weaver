
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { QuestionnaireFormValues } from '../QuestionnaireForm';

interface ApproachQuestionProps {
  form: UseFormReturn<QuestionnaireFormValues>;
}

const ApproachQuestion: React.FC<ApproachQuestionProps> = ({ form }) => {
  return (
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
  );
};

export default ApproachQuestion;
