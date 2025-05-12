
// Journey experience content types
export interface JourneyExperienceContent {
  title: string;
  experiences: string[];
}

// Type for mapping journey IDs to experience content
export type JourneyExperienceMap = Record<string, JourneyExperienceContent>;
