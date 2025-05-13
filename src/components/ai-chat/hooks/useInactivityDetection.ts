
import { useState, useRef, useEffect } from 'react';

interface UseInactivityDetectionProps {
  waitingForResponse: boolean;
  sendFollowUpMessage: () => void;
}

export const useInactivityDetection = ({ 
  waitingForResponse, 
  sendFollowUpMessage 
}: UseInactivityDetectionProps) => {
  const [lastActivityTime, setLastActivityTime] = useState<number>(Date.now());
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Update last activity time
  const updateLastActivity = () => {
    setLastActivityTime(Date.now());
  };

  // Start or reset the inactivity timer
  const startInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    
    inactivityTimerRef.current = setTimeout(checkUserInactivity, 30000); // Check every 30 seconds
  };
  
  // Check if user has been inactive and is expected to respond
  const checkUserInactivity = () => {
    const currentTime = Date.now();
    const inactiveTime = currentTime - lastActivityTime;
    
    // If waiting for response and inactive for more than 45 seconds, send a follow-up message
    if (waitingForResponse && inactiveTime > 45000) {
      sendFollowUpMessage();
    }
    
    // Restart the timer
    startInactivityTimer();
  };

  // Effect to handle setup and cleanup of inactivity timer
  useEffect(() => {
    startInactivityTimer();
    
    // Cleanup timer when component unmounts
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [lastActivityTime, waitingForResponse]);

  // Effect to update last activity when input changes
  useEffect(() => {
    const handleUserActivity = () => {
      updateLastActivity();
    };

    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('click', handleUserActivity);

    return () => {
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
    };
  }, []);

  return {
    updateLastActivity
  };
};
