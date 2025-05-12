
import React from 'react';
import { ListChecks } from 'lucide-react';
import { JourneyExperienceContent } from '@/data/journeys/journey-experiences';

interface JourneyExperienceListProps {
  experienceContent: JourneyExperienceContent;
}

const JourneyExperienceList: React.FC<JourneyExperienceListProps> = ({
  experienceContent
}) => {
  return (
    <div className="bg-spirit-50 p-4 rounded-md mb-6">
      <h3 className="font-medium text-spirit-700 flex items-center gap-2 mb-3">
        <ListChecks size={18} />
        <span>{experienceContent.title}:</span>
      </h3>
      <ul className="text-earth-700 space-y-2 ml-2">
        {experienceContent.experiences.map((experience, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-spirit-600 font-bold mt-1">•</span>
            <span>{experience}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JourneyExperienceList;
