'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProgressContextType {
  completedExercises: string[];
  streak: number;
  xp: number;
  completeExercise: (exerciseId: string, xpGain: number) => void;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [streak, setStreak] = useState<number>(0);
  const [xp, setXp] = useState<number>(0);

  const completeExercise = (exerciseId: string, xpGain: number) => {
    setCompletedExercises((prev) => {
      if (prev.includes(exerciseId)) return prev;
      
      // Aumentar la racha si completamos uno nuevo
      setStreak((s) => s + 1);
      setXp((x) => x + xpGain);
      return [...prev, exerciseId];
    });
  };

  const resetProgress = () => {
    setCompletedExercises([]);
    setStreak(0);
    setXp(0);
  };

  return (
    <ProgressContext.Provider
      value={{
        completedExercises,
        streak,
        xp,
        completeExercise,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgressContext = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgressContext must be used within a ProgressProvider');
  }
  return context;
};
