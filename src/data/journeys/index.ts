
import { ProcessCardProps } from '@/components/ProcessCard';
import { personalDevelopmentJourneys } from './personalDevelopment';
import { spiritualityJourneys } from './spirituality';
import { consciousnessJourneys } from './consciousness';
import { realityManifestationJourneys } from './realityManifestation';
import { abundanceManifestationJourneys } from './abundanceManifestation';
import { relationshipsJourneys } from './relationships';
import { careerDevelopmentJourneys } from './careerDevelopment';
import { emotionalHealingJourneys } from './emotionalHealing';
import { femininePowerJourneys } from './femininePower';
import { energyHealingJourneys } from './energyHealing';
import { productivityJourneys } from './productivity';

// Consolidate all journeys
export const journeys: ProcessCardProps[] = [
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
  ...productivityJourneys
];
