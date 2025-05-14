
import { ProcessCardProps } from '@/components/ProcessCard';

// Export the journey type for reuse - but make sure it's compatible with ProcessCardProps
// The only difference is that we're not requiring the image property
export type Journey = Omit<ProcessCardProps, 'image'> & {
  image?: string;
};

// Lesson topic type for lesson list display
export interface LessonTopic {
  day: number;
  title: string;
}

// Journey with lessons interface
export interface JourneyWithLessons extends Journey {
  lessons?: LessonTopic[];
}
