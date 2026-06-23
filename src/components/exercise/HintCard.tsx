'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';

interface HintCardProps {
  hint: string;
  expectedSyntax: string;
  attempts: number;
  onClose: () => void;
}

export default function HintCard({
  hint,
  expectedSyntax,
  attempts,
  onClose,
}: HintCardProps) {
  const processedHint = hint
    .replace(/\[\^[^\]]+\]:.*\n?/g, '')
    .replace(/\[\^[^\]]+\]/g, '');

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div
          className="w-full max-w-lg bg-[#161B22] border border-[#F0A500]/30 rounded-xl shadow-2xl flex flex-col pointer-events-auto animate-slide-up"
          style={{ boxShadow: '0 0 40px rgba(240,165,0,0.08)' }}
        >
          {/* Header */}
          <div className="bg-[#1C1A0D] border-b border-[#F0A500]/20 flex items-center justify-between px-5 py-4 rounded-t-xl shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#F0A500] text-[22px] select-none">
                lightbulb
              </span>
              <h3 className="text-[#F0A500] font-bold font-sans text-base">
                Pista
              </h3>
            </div>
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-sm font-medium text-[#F0A500] hover:text-white transition-colors group px-3 py-1.5 rounded-lg hover:bg-[#1C2128]"
            >
              Volver al ejercicio
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>

          {/* Body */}
          <div className="p-5 space-y-4 overflow-y-auto custom-scrollbar max-h-[60vh]">
            {/* Hint text */}
            <div className="text-sm text-[#E6EDF3]/90 leading-relaxed prose prose-invert prose-sm max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeRaw]}
              >
                {processedHint}
              </ReactMarkdown>
            </div>

            {/* Syntax block */}
            {expectedSyntax && (
              <div>
                <p className="text-xs text-[#7D8590] font-sans mb-2 font-medium uppercase tracking-wide">
                  Sintaxis esperada
                </p>
                <div className="bg-[#0D1117] border border-[#30363D] rounded-lg p-3.5 font-mono text-sm text-[#E6EDF3] shadow-inner">
                  <pre className="m-0 whitespace-pre-wrap break-words">{expectedSyntax}</pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
