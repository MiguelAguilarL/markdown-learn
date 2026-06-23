'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface InstructionCardProps {
  title: string;
  instructions: string;
  hasHint: boolean;
  onToggleHint: () => void;
  showHint: boolean;
}

export default function InstructionCard({
  title,
  instructions,
  hasHint,
  onToggleHint,
  showHint,
}: InstructionCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-[#1C2128] border border-[#30363D] rounded-lg shadow-sm transition-all duration-300 font-sans">
      {/* Top bar (Clickable to collapse/expand instructions) */}
      <div
        className="p-4 flex items-center justify-between cursor-pointer select-none hover:bg-[#1C2128]/80 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#0D1117] flex items-center justify-center text-[#4A90D9]">
            <span className="material-symbols-outlined text-[20px]">description</span>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">
              Instrucciones: {title}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {hasHint && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // Evitar colapsar la tarjeta al hacer clic en pista
                onToggleHint();
              }}
              className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md transition-all border ${
                showHint
                  ? 'bg-[#F0A500]/20 text-[#F0A500] border-[#F0A500]'
                  : 'text-[#F0A500] hover:bg-[#F0A500]/10 border-[#F0A500]/20'
              } font-medium`}
            >
              <span className="material-symbols-outlined text-[16px] block">lightbulb</span>
              <span>{showHint ? 'Ocultar Pista' : 'Ver Pista'}</span>
            </button>
          )}
          <span className="material-symbols-outlined text-[#7D8590] text-[20px]">
            {isExpanded ? 'expand_less' : 'expand_more'}
          </span>
        </div>
      </div>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="px-6 pb-5 pt-1 border-t border-[#30363D]/50 bg-[#1C2128]">
          <div className="text-sm text-[#E6EDF3] leading-relaxed max-w-none prose prose-invert prose-sm mt-3">
            <ReactMarkdown>{instructions}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
