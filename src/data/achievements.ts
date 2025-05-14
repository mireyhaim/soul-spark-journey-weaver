
import { Achievement } from "@/components/gamification/AchievementBadge";

export const achievements: Achievement[] = [
  {
    id: 'first-login',
    name: 'הצעד הראשון',
    description: 'התחברות ראשונה למערכת',
    icon: '👣',
    unlocked: true
  },
  {
    id: 'first-journey',
    name: 'המסע מתחיל',
    description: 'התחלת את המסע הראשון שלך',
    icon: '🗺️',
    unlocked: true
  },
  {
    id: 'three-day-streak',
    name: 'התמדה',
    description: 'שלושה ימים רצופים של פעילות במערכת',
    icon: '🔥',
    unlocked: true
  },
  {
    id: 'first-completed',
    name: 'מסיים',
    description: 'סיימת את המסע הראשון שלך',
    icon: '🏆',
    unlocked: false
  },
  {
    id: 'meditation-master',
    name: 'אמן המדיטציה',
    description: 'השלמת 10 ימי מדיטציה',
    icon: '🧘',
    unlocked: false
  },
  {
    id: 'feedback-giver',
    name: 'משוב בונה',
    description: 'שיתפת משוב על החוויה שלך',
    icon: '💬',
    unlocked: true
  },
  {
    id: 'profile-complete',
    name: 'זהות מלאה',
    description: 'השלמת את פרופיל המשתמש שלך',
    icon: '👤',
    unlocked: false
  },
  {
    id: 'social-butterfly',
    name: 'פרפר חברתי',
    description: 'שיתפת מסע עם חבר',
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
