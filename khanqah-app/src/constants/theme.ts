import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    primary: '#122B48',
    emeraldDeep: '#064E3B',
    emeraldVibrant: '#059669',
    gold: '#D97706',
    background: '#FAF7F2',
    card: '#FFFFFF',
    text: '#1C1917',
    textMuted: '#78716C',
    cardBorder: '#E5E0D8',
  },
  dark: {
    primary: '#1A365D',
    emeraldDeep: '#022C22',
    emeraldVibrant: '#10B981',
    gold: '#FBBF24',
    background: '#0C100E',
    card: '#131A17',
    text: '#F5F5F4',
    textMuted: '#A8A29E',
    cardBorder: '#1F2D28',
  },
} as const;

export const Fonts = Platform.select({
  ios: {
    urdu: 'System',
    sans: 'System',
  },
  android: {
    urdu: 'sans-serif',
    sans: 'sans-serif',
  },
  default: {
    urdu: 'sans-serif',
    sans: 'sans-serif',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
