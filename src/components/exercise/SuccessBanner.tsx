'use client';

import React from 'react';

interface SuccessBannerProps {
  exerciseTitle: string;
  xp: number;
  completedCount: number;
  totalCount: number;
  streak: number;
  userCode: string;
  explanation: string;
}

export default function SuccessBanner({
  exerciseTitle,
  xp,
  completedCount,
  totalCount,
  streak,
  userCode,
  explanation,
}: SuccessBannerProps) {
  const lines = userCode.split('\n');

  return (
    <div className="space-y-6 font-sans">
      {/* Success alert box */}
      <div className="bg-[#0D2B1A] border-2 border-[#3FB950] rounded-xl p-8 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left shadow-lg shadow-[#3FB950]/10 relative overflow-hidden">
        {/* Decorative background blur glows */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#3FB950]/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#4A90D9]/5 rounded-full blur-2xl pointer-events-none"></div>

        {/* Check Circle Icon */}
        <div className="w-16 h-16 bg-[#3FB950] rounded-full flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[#0D1117] text-4xl font-bold select-none">
            check
          </span>
        </div>

        {/* Text and stats */}
        <div className="space-y-4 relative z-10 flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-headline">
            ¡Ejercicio completado!
          </h2>
          <p className="text-[#E6EDF3]/80 text-base md:text-lg">
            ¡Excelente trabajo! Dominaste la sección de <span className="font-semibold text-[#3FB950]">{exerciseTitle}</span>.
          </p>

          {/* Stats Chips */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#3FB950]/10 text-[#3FB950] border border-[#3FB950]/30 rounded-full font-mono text-xs font-semibold">
              <span className="material-symbols-outlined text-[16px] block">checklist</span>
              <span>{completedCount} / {totalCount} completados</span>
            </span>
          </div>
        </div>
      </div>

      {/* Review details grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Answer Card */}
        <div className="bg-[#1C2128] border border-[#30363D] rounded-lg flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-[#30363D] bg-[#1C2128] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7D8590] text-[18px]">assignment</span>
            <h3 className="font-mono text-xs font-bold text-[#E6EDF3] uppercase tracking-wider">
              Tu respuesta
            </h3>
          </div>
          <div className="p-4 font-mono text-xs sm:text-sm bg-[#161B22] flex-1 relative group overflow-auto">
            {lines.map((line, index) => (
              <div
                key={index}
                className={`py-0.5 px-2 -mx-2 flex items-center justify-between ${line.trim() !== '' ? 'bg-[#3FB950]/5 border-l-2 border-[#3FB950] text-white pl-2.5' : 'text-[#7D8590]'
                  }`}
              >
                <span>
                  <span className="text-[#7D8590] inline-block w-4 mr-2 text-right select-none">{index + 1}</span>
                  {line}
                </span>
                {line.trim() !== '' && (
                  <span className="material-symbols-outlined text-[#3FB950] text-[14px]">check</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Explanation Card */}
        <div className="bg-[#1C2128] border border-[#30363D] rounded-lg flex flex-col overflow-hidden relative">
          {/* Accent top border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#F0A500]"></div>
          <div className="px-4 py-3 border-b border-[#30363D] bg-[#1C2128] flex items-center gap-2 mt-1">
            <span className="material-symbols-outlined text-[#F0A500] text-[18px]">lightbulb</span>
            <h3 className="font-mono text-xs font-bold text-[#F0A500] uppercase tracking-wider">
              ¿Por qué funciona?
            </h3>
          </div>
          <div className="p-5 text-sm text-[#E6EDF3]/90 leading-relaxed flex-1 prose prose-invert prose-sm">
            <p>{explanation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
