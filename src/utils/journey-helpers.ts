
/**
 * Returns the appropriate guide title and description based on journey category
 */
export const getGuideText = (category?: string): { title: string; description: string } => {
  if (!category) {
    return {
      title: "Your Guide",
      description: "Your personal growth companion"
    };
  }
  
  const categoryLower = category.toLowerCase();
  
  // Determine title and description based on category
  if (categoryLower.includes('spiritual') || 
      categoryLower.includes('consciousness') || 
      categoryLower.includes('energy') ||
      categoryLower.includes('manifestation')) {
    return {
      title: "Your Spirit Guide",
      description: "Your personal growth companion"
    };
  } else if (categoryLower.includes('business') || 
             categoryLower.includes('career') || 
             categoryLower.includes('productivity')) {
    return {
      title: "Your Success Coach",
      description: "Your professional development partner"
    };
  } else if (categoryLower.includes('personal') || 
             categoryLower.includes('emotional') || 
             categoryLower.includes('relationships')) {
    return {
      title: "Your Growth Coach",
      description: "Your personal development companion"
    };
  }
  
  // Default fallback
  return {
    title: "Your Guide",
    description: "Your personal growth companion"
  };
};
