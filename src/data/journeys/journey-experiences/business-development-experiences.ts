
import { JourneyExperienceMap, JourneyExperienceContent } from './types';

// Inner CEO Activation experiences
const innerCEOExperiences: JourneyExperienceContent = {
  title: "What you'll experience",
  experiences: [
    "Identify and release limiting beliefs about your leadership abilities",
    "Develop confident decision-making skills based on inner wisdom",
    "Create clear boundaries that honor your time, energy and vision",
    "Cultivate an empowered CEO mindset that supports your business growth",
    "Learn practical tools for leading from alignment instead of fear",
    "Establish systems that support your leadership vision"
  ]
};

// Abundance & Business Flow experiences
const abundanceBusinessExperiences: JourneyExperienceContent = {
  title: "What you'll experience",
  experiences: [
    "Identify and release deep scarcity patterns blocking your business growth",
    "Develop a wealth consciousness that attracts more opportunities",
    "Learn energy alignment practices for business expansion",
    "Create daily rituals that open you to receiving more abundance",
    "Shift your relationship with money, pricing, and receiving payment",
    "Develop the mindset of an abundant, successful business owner"
  ]
};

// Confident Visibility Journey experiences
const visibilityJourneyExperiences: JourneyExperienceContent = {
  title: "What you'll experience",
  experiences: [
    "Overcome fear of judgment when sharing your message online",
    "Develop confidence in communicating your authentic voice",
    "Create content that feels aligned with your values and vision",
    "Build practices for showing up consistently with confidence",
    "Release perfectionism and embrace your unique expression",
    "Connect meaningfully with your audience through authentic visibility"
  ]
};

// Map journey IDs to experience content
export const businessDevelopmentExperiences: JourneyExperienceMap = {
  '30': innerCEOExperiences,
  '31': abundanceBusinessExperiences,
  '32': visibilityJourneyExperiences
};
