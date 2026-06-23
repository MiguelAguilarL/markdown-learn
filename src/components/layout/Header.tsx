'use client';

import React from 'react';

interface HeaderProps {
  sectionTitle: string;
  exerciseTitle: string;
  currentIndex: number;
  totalIndex: number;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export default function Header({
  sectionTitle,
  exerciseTitle,
  currentIndex,
  totalIndex,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: HeaderProps) {
  return (
    <header className="h-14 bg-[#161B22] border-b border-[#30363D] flex items-center px-6 justify-between shrink-0 font-sans z-10">
      {/* Left: Breadcrumb */}
      <div className="flex items-center text-xs sm:text-sm text-[#7D8590] font-mono">
        <span>Sintaxis</span>
        <span className="material-symbols-outlined text-[16px] mx-1 select-none">chevron_right</span>
        <span className="text-[#7D8590]">{sectionTitle}</span>
        <span className="material-symbols-outlined text-[16px] mx-1 select-none">chevron_right</span>
        <span className="text-[#E6EDF3] font-semibold truncate max-w-[120px] sm:max-w-none">
          {exerciseTitle}
        </span>
      </div>

      {/* Right: Pagination */}
      <div className="flex items-center gap-4">
        <span className="text-xs sm:text-sm text-[#7D8590] font-mono shrink-0">
          Ejercicio {currentIndex} de {totalIndex}
        </span>
        <div className="flex items-center border border-[#30363D] rounded overflow-hidden">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className="p-1 hover:bg-[#1C2128] text-[#7D8590] hover:text-[#E6EDF3] transition-colors disabled:opacity-30 disabled:pointer-events-none"
            title="Ejercicio anterior"
          >
            <span className="material-symbols-outlined text-[20px] block">chevron_left</span>
          </button>
          <div className="w-px h-6 bg-[#30363D]"></div>
          <button
            onClick={onNext}
            disabled={!hasNext}
            className="p-1 hover:bg-[#1C2128] text-[#7D8590] hover:text-[#E6EDF3] transition-colors disabled:opacity-30 disabled:pointer-events-none"
            title="Siguiente ejercicio"
          >
            <span className="material-symbols-outlined text-[20px] block">chevron_right</span>
          </button>
        </div>
      </div>
    </header>
  );
}
