
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

interface JourneyNotFoundProps {
  error: string | null;
  onGoBack: () => void;
}

const JourneyNotFound: React.FC<JourneyNotFoundProps> = ({ error, onGoBack }) => {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <Alert variant="destructive" className="mb-6">
        <AlertTitle>Journey not found</AlertTitle>
        <AlertDescription>
          {error || "We couldn't find the journey you were looking for."}
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={onGoBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Journeys
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default JourneyNotFound;
