
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

// Overcoming Impostor Syndrome experiences
const impostorSyndromeExperiences: JourneyExperienceContent = {
  title: "What you'll experience",
  experiences: [
    "Identify and transform your specific impostor syndrome patterns",
    "Release the inner critic voice that undermines your confidence",
    "Develop practices for owning your accomplishments without self-doubt",
    "Create evidence-based confidence in your expertise and abilities",
    "Learn to separate facts from feelings when evaluating your work",
    "Build a sustainable foundation of authentic self-trust"
  ]
};

// Flow Over Hustle experiences
const flowOverHustleExperiences: JourneyExperienceContent = {
  title: "What you'll experience",
  experiences: [
    "Identify your personal burnout and hustle patterns in business",
    "Release the belief that struggle equals success",
    "Develop practices for entering flow state while working",
    "Create a business rhythm that honors your energy cycles",
    "Learn intuitive decision-making instead of forced action",
    "Establish sustainable systems that support ease and results"
  ]
};

// Morning Focus Rituals experiences
const morningRitualsExperiences: JourneyExperienceContent = {
  title: "What you'll experience",
  experiences: [
    "Create a personalized morning ritual that sets you up for daily success",
    "Develop mindset practices that prime you for clarity and confidence",
    "Learn energy alignment techniques for focused productivity",
    "Establish intention-setting habits that keep you on purpose",
    "Build visualization practices for manifesting business outcomes",
    "Transform your relationship with mornings and workday beginnings"
  ]
};

// Map journey IDs to experience content
export const businessDevelopmentExperiences: JourneyExperienceMap = {
  '30': innerCEOExperiences,
  '31': abundanceBusinessExperiences,
  '32': visibilityJourneyExperiences,
  '33': impostorSyndromeExperiences,
  '34': flowOverHustleExperiences,
  '35': morningRitualsExperiences
};
