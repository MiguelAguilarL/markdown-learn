import { useState, useEffect } from 'react';
import { Exercise } from '../types';
import { validateExercise, ValidationResult } from '../lib/validator';
import { useProgress } from './useProgress';

export const useExercise = (exercise: Exercise) => {
  const [currentCode, setCurrentCode] = useState(exercise.initialCode);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [detailedError, setDetailedError] = useState<string | undefined>(undefined);
  
  const { completeExercise } = useProgress();

  // Resetear el estado cuando cambie el ejercicio
  useEffect(() => {
    setCurrentCode(exercise.initialCode);
    setStatus('idle');
    setAttempts(0);
    setShowHint(false);
    setFeedback('');
    setDetailedError(undefined);
  }, [exercise]);

  const verify = (userHtml: string, expectedHtml: string) => {
    const result = validateExercise(
      currentCode,
      userHtml,
      expectedHtml,
      exercise.acceptedPatterns,
      exercise.forbiddenPatterns
    );

    if (result.isCorrect) {
      setStatus('success');
      setFeedback(result.feedback);
      completeExercise(exercise.id, exercise.xp);
    } else {
      setStatus('error');
      setAttempts((a) => a + 1);
      setFeedback(result.feedback);
      setDetailedError(result.detailedError);
    }

    return result.isCorrect;
  };

  const resetExercise = () => {
    setCurrentCode(exercise.initialCode);
    setStatus('idle');
    setFeedback('');
    setDetailedError(undefined);
  };

  return {
    currentCode,
    setCurrentCode,
    status,
    setStatus,
    attempts,
    showHint,
    setShowHint,
    feedback,
    detailedError,
    verify,
    resetExercise,
  };
};
