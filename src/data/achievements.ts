
import { Achievement } from "@/components/gamification/AchievementBadge";

export const achievements: Achievement[] = [
  {
    id: 'first-login',
    name: 'First Steps',
    description: 'First login to the system',
    icon: '👣',
    unlocked: true
  },
  {
    id: 'first-journey',
    name: 'Journey Begins',
    description: 'Started your first journey',
    icon: '🗺️',
    unlocked: true
  },
  {
    id: 'three-day-streak',
    name: 'Consistency',
    description: 'Three consecutive days of activity',
    icon: '🔥',
    unlocked: true
  },
  {
    id: 'first-completed',
    name: 'Completer',
    description: 'Finished your first journey',
    icon: '🏆',
    unlocked: false
  },
  {
    id: 'meditation-master',
    name: 'Meditation Master',
    description: 'Completed 10 days of meditation',
    icon: '🧘',
    unlocked: false
  },
  {
    id: 'feedback-giver',
    name: 'Feedback Provider',
    description: 'Shared feedback about your experience',
    icon: '💬',
    unlocked: true
  },
  {
    id: 'profile-complete',
    name: 'Complete Identity',
    description: 'Completed your user profile',
    icon: '👤',
    unlocked: false
  },
  {
    id: 'social-butterfly',
    name: 'Social Butterfly',
    description: 'Shared a journey with a friend',
    icon: '🦋',
    unlocked: false
  }
];

export const getAchievementById = (id: string): Achievement | undefined => {
  return achievements.find(achievement => achievement.id === id);
};

export const getUserAchievements = (unlockedIds: string[]): Achievement[] => {
  return achievements.map(achievement => ({
    ...achievement,
    unlocked: unlockedIds.includes(achievement.id)
  }));
};
