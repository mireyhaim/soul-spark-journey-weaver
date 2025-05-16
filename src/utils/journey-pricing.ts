
/**
 * Utility for calculating journey pricing based on duration
 */

/**
 * Calculate price based on journey duration
 */
export const getJourneyPrice = (duration: number): number => {
  if (duration <= 7) return 11;
  if (duration <= 14) return 15;
  return 27;
};
