'use client';

import React from 'react';


interface BottomBarProps {
  status: 'idle' | 'success' | 'error';
  onVerify: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  nextExerciseTitle?: string;
  hasPrev: boolean;
  hasNext: boolean;
}

export default function BottomBar({
  status,
  onVerify,
  onNext,
  onPrev,
  onReset,
  nextExerciseTitle,
  hasPrev,
  hasNext,
}: BottomBarProps) {
  

  if (status === 'success') {
    return (
      <div className="h-16 fixed bottom-0 right-0 w-full md:w-[calc(100%-260px)] bg-[#161B22] border-t border-[#30363D] flex items-center justify-between px-6 z-30 font-sans">
        {/* Left: Prev Exercise */}
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          className="flex items-center gap-2 text-sm text-[#7D8590] hover:text-[#E6EDF3] transition-colors disabled:opacity-30 disabled:pointer-events-none"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Ejercicio anterior</span>
        </button>

        {/* Right: Next Exercise */}
        {hasNext ? (
          <button
            onClick={onNext}
            className="bg-[#4A90D9] hover:bg-[#3b7ac0] text-white font-bold py-2 px-4 rounded-md transition-all flex items-center gap-2 text-sm shadow-md active:scale-95 shadow-[#4A90D9]/20"
          >
            <span>Siguiente: {nextExerciseTitle || 'Siguiente Ejercicio'}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        ) : (
          <div className="text-sm text-[#3FB950] font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
            <span>¡Has completado todos los ejercicios!</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="h-16 fixed bottom-0 right-0 w-full md:w-[calc(100%-260px)] bg-[#161B22] border-t border-[#30363D] flex items-center justify-end px-6 z-30 font-sans">
      {/* Right: Reset & Verify */}
      <div className="flex items-center gap-3">
        {status === 'error' && (
          <button
            onClick={onReset}
            className="bg-transparent border border-[#30363D] hover:border-[#E85555]/50 text-[#E6EDF3] hover:text-[#E85555] font-medium py-2 px-4 rounded-md transition-colors text-xs sm:text-sm active:scale-95"
          >
            Reintentar
          </button>
        )}
        <button
          onClick={onVerify}
          className="bg-[#4A90D9] hover:bg-[#3b7ac0] text-white font-medium py-2 px-4 rounded-md transition-all flex items-center gap-2 text-xs sm:text-sm shadow-md active:scale-95"
        >
          <span>Verificar respuesta</span>
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
        </button>
      </div>
    </div>
  );
}
