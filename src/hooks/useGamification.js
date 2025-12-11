import { useState, useEffect } from 'react';

const LEVEL_THRESHOLDS = [
  0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5500, 7000, 9000, 12000
];

const RANKS = [
  'Initiate',
  'Script Kiddie',
  'Glitch Hunter',
  'Netrunner',
  'Cyber-Samurai',
  'System Operator',
  'Grid Walker',
  'Data Shadow',
  'Neon Ghost',
  'Construct',
  'AI Architect',
  'Cyber-Deity'
];

export function useGamification() {
  const [xp, setXP] = useState(() => {
    try {
      return parseInt(localStorage.getItem('focusflow_xp') || '0');
    } catch { return 0; }
  });

  useEffect(() => {
    localStorage.setItem('focusflow_xp', xp.toString());
  }, [xp]);

  // Derived State (No need for separate state variables that cause re-renders)
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
      if (xp >= LEVEL_THRESHOLDS[i]) {
          level = i + 1;
      } else {
          break;
      }
  }

  const rankIndex = Math.min(Math.floor((level - 1) / 2), RANKS.length - 1);
  const rank = RANKS[rankIndex];

  const currentLevelBase = LEVEL_THRESHOLDS[level - 1] || 0;
  const nextLevel = LEVEL_THRESHOLDS[level] || currentLevelBase * 1.5;
  const nextLevelXP = nextLevel;
  
  const xpInLevel = xp - currentLevelBase;
  const xpRequired = nextLevel - currentLevelBase;
  const progress = Math.min(100, Math.max(0, (xpInLevel / xpRequired) * 100));

  const addXP = (amount) => {
    setXP(prev => prev + amount);
  };

  return { xp, level, rank, nextLevelXP, progress, addXP };
}
