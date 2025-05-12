
import { ProcessCardProps } from '@/components/ProcessCard';

// Export the journey type for reuse
export type Journey = ProcessCardProps;

// Lesson topic type for lesson list display
export interface LessonTopic {
  day: number;
  title: string;
}

// Journey with lessons interface
export interface JourneyWithLessons extends Journey {
  lessons?: LessonTopic[];
}
