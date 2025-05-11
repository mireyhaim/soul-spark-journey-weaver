
import React from 'react';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import GoalQuestion from './questions/GoalQuestion';
import TimePeriodQuestion from './questions/TimePeriodQuestion';
import ApproachQuestion from './questions/ApproachQuestion';

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
        <GoalQuestion form={form} />
        <TimePeriodQuestion form={form} />
        <ApproachQuestion form={form} />
        
        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Close</Button>
          <Button type="submit" className="bg-spirit-600 hover:bg-spirit-700">Find My Journey</Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionnaireForm;
