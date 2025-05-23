
import React from 'react';

// Mentor profile image URLs categorized by gender
const mentorImages = {
  male: [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  ],
  female: [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  ]
};

// Helper function to detect gender based on common name patterns
export const detectGender = (name: string): 'male' | 'female' => {
  // Convert to lowercase for case-insensitive matching
  const lowerName = name.toLowerCase();
  
  // Common female name endings or names
  const femaleIndicators = ['a', 'ie', 'y', 'ah', 'sarah', 'mary', 'emily', 'jennifer', 'amanda', 'jessica', 'olivia'];
  
  // Check for specific female names or endings
  for (const indicator of femaleIndicators) {
    if (lowerName.endsWith(indicator) || lowerName.includes(indicator + ' ')) {
      return 'female';
    }
  }
  
  // Default to male if no female indicators are found
  return 'male';
};

// Get mentor image based on teacher name and journey ID
export const getMentorImage = (teacherName: string, journeyId: string): string => {
  // Detect gender based on teacher name
  const gender = detectGender(teacherName);
  
  // Select gender-appropriate images
  const genderImages = mentorImages[gender];
  
  // Generate a consistent profile image based on journey ID
  // Use modulo to ensure we stay within the array bounds
  const imageIndex = parseInt(journeyId) % genderImages.length;
  return genderImages[imageIndex >= 0 ? imageIndex : 0];
};
