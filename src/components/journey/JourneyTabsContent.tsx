
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Check, UserRound } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import JourneyExperienceList from './JourneyExperienceList';
import { JourneyExperienceContent } from '@/data/journeys/journey-experiences/types';
import { LessonTopic } from '@/data/journeys/lesson-topics/types';

interface JourneyOverviewContentProps {
  experienceContent: JourneyExperienceContent;
}

export const JourneyOverviewContent: React.FC<JourneyOverviewContentProps> = ({ experienceContent }) => {
  return (
    <TabsContent value="overview" className="mt-0 space-y-6">
      <div>
        <h2 className="text-xl font-medium mb-4">What You'll Experience</h2>
        <JourneyExperienceList experienceContent={experienceContent} />
      </div>
      
      <div>
        <h2 className="text-xl font-medium mb-4">Is This Journey Right For You?</h2>
        <Card className="border-spirit-100">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-medium">This journey is perfect for you if:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Check size={18} className="text-spirit-600 mt-1 flex-shrink-0" />
                <span>You want to connect more deeply with your spiritual nature</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={18} className="text-spirit-600 mt-1 flex-shrink-0" />
                <span>You're seeking practical tools for inner guidance</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={18} className="text-spirit-600 mt-1 flex-shrink-0" />
                <span>You're looking to bring spiritual practices into your daily life</span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={18} className="text-spirit-600 mt-1 flex-shrink-0" />
                <span>You're ready to develop a consistent spiritual practice</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
};

interface JourneyPlanContentProps {
  lessonTopics: LessonTopic[];
}

export const JourneyPlanContent: React.FC<JourneyPlanContentProps> = ({ lessonTopics }) => {
  return (
    <TabsContent value="journey-plan" className="mt-0 space-y-6">
      <div>
        <h2 className="text-xl font-medium mb-4">Your {lessonTopics.length}-Day Journey</h2>
        <div className="space-y-4">
          {lessonTopics.map((lesson) => (
            <Card key={lesson.day} className="border-spirit-100/60 hover:border-spirit-200 transition-colors">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="bg-spirit-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 text-spirit-700 font-medium">
                    <span>{lesson.day}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">{lesson.title}</h3>
                    {lesson.description && (
                      <p className="text-earth-600">{lesson.description}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </TabsContent>
  );
};

interface JourneyTeacherContentProps {
  teacher: string;
  duration: number;
  mentorImage: string;
}

export const JourneyTeacherContent: React.FC<JourneyTeacherContentProps> = ({ 
  teacher, 
  duration, 
  mentorImage 
}) => {
  return (
    <TabsContent value="about-teacher" className="mt-0 space-y-6">
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0">
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-spirit-100 shadow-md bg-white">
            <Avatar className="w-full h-full">
              <AvatarImage src={mentorImage} alt={teacher} className="object-cover" />
              <AvatarFallback className="bg-spirit-100 text-spirit-700 text-2xl">
                <UserRound className="h-12 w-12 text-spirit-600" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-medium text-earth-900 mb-2">{teacher}</h3>
          <p className="text-earth-600 mb-4 text-lg">Spiritual Guide & Mentor</p>
          <p className="text-earth-700">
            {teacher} is a dedicated spiritual guide with years of experience helping people
            connect with their inner wisdom. With a background in mindfulness practices and holistic wellness,
            they have guided hundreds of individuals through transformative journeys.
          </p>
          <p className="text-earth-700 mt-4">
            Through this carefully crafted {duration}-day journey, they will share powerful practices
            and insights designed to deepen your spiritual connection and help you discover new dimensions
            of self-awareness and personal growth.
          </p>
        </div>
      </div>
    </TabsContent>
  );
};
