
// Define LessonTopic interface
export interface LessonTopic {
  day: number;
  title: string;
  description?: string;
  guidanceText?: string; // Added field for detailed guidance instructions
  videoUrl?: string;
}

// Define lesson topic mapping type
export type JourneyLessonTopicsMap = Record<string, LessonTopic[]>;
