
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface PracticeQuestion {
  question: string;
  fieldKey: string;
}

interface PracticeQuestionsProps {
  currentDay: number;
  questions: PracticeQuestion[];
  userReflections: { [key: string]: string };
  onReflectionChange: (key: string, value: string) => void;
  onComplete: () => void;
  isComplete: boolean;
}

const PracticeQuestions: React.FC<PracticeQuestionsProps> = ({
  currentDay,
  questions,
  userReflections,
  onReflectionChange,
  onComplete,
  isComplete,
}) => {
  const isFormComplete = () => {
    return questions.every(q => userReflections[q.fieldKey]?.trim().length > 0);
  };

  return (
    <Card className="mb-4 border-spirit-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Day {currentDay} Practice Questions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {questions.map((q, index) => (
          <div key={q.fieldKey} className="space-y-2">
            <p className="text-sm font-medium text-earth-700">{q.question}</p>
            <Textarea
              placeholder="Write your reflection here..."
              value={userReflections[q.fieldKey] || ''}
              onChange={(e) => onReflectionChange(q.fieldKey, e.target.value)}
              className="min-h-[80px] text-sm"
              disabled={isComplete}
            />
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={onComplete}
          disabled={isComplete || !isFormComplete()}
        >
          {isComplete ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Completed
            </>
          ) : (
            "Complete Practice"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PracticeQuestions;
