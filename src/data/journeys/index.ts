
import { Journey } from './types';
import { personalDevelopmentJourneys } from './personal-development';
import { spiritualityJourneys } from './spirituality';
import { consciousnessJourneys } from './consciousness';
import { realityManifestationJourneys } from './reality-manifestation';
import { abundanceManifestationJourneys } from './abundance-manifestation';
import { relationshipsJourneys } from './relationships';
import { careerDevelopmentJourneys } from './career-development';
import { emotionalHealingJourneys } from './emotional-healing';
import { femininePowerJourneys } from './feminine-power';
import { energyHealingJourneys } from './energy-healing';
import { productivityJourneys } from './productivity';
import { businessDevelopmentJourneys } from './business-development';

// Export individual category journey arrays for direct use
export {
  personalDevelopmentJourneys,
  spiritualityJourneys,
  consciousnessJourneys,
  realityManifestationJourneys,
  abundanceManifestationJourneys,
  relationshipsJourneys,
  careerDevelopmentJourneys,
  emotionalHealingJourneys,
  femininePowerJourneys,
  energyHealingJourneys,
  productivityJourneys,
  businessDevelopmentJourneys
};

// Combine all journeys into a single array for compatibility with existing code
export const journeys: Journey[] = [
  ...personalDevelopmentJourneys,
  ...spiritualityJourneys,
  ...consciousnessJourneys,
  ...realityManifestationJourneys,
  ...abundanceManifestationJourneys,
  ...relationshipsJourneys,
  ...careerDevelopmentJourneys,
  ...emotionalHealingJourneys,
  ...femininePowerJourneys,
  ...energyHealingJourneys,
  ...productivityJourneys,
  ...businessDevelopmentJourneys
];

// Function to get journeys by category
export const getJourneysByCategory = (category: string): Journey[] => {
  return journeys.filter(journey => journey.category === category);
};

// Function to get a journey by ID
export const getJourneyById = (id: string): Journey | undefined => {
  return journeys.find(journey => journey.id === id);
};
