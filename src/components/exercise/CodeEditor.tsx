'use client';

import React, { useRef, useEffect } from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  status: 'idle' | 'success' | 'error';
  errorMessage?: string;
  isGfm?: boolean;
}

export default function CodeEditor({
  code,
  onChange,
  status,
  errorMessage,
  isGfm = false,
}: CodeEditorProps) {
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Generar números de línea
  const lines = code.split('\n');
  const totalLines = lines.length === 0 ? 1 : lines.length;

  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Mantener los line numbers sincronizados al cambiar de código
  useEffect(() => {
    handleScroll();
  }, [code]);

  return (
    <div
      className={`w-full md:w-1/2 flex flex-col bg-[#0D1117] border rounded-lg overflow-hidden flex-shrink-0 shadow-sm relative transition-all duration-200 ${
        status === 'error'
          ? 'border-[#E85555]'
          : status === 'success'
          ? 'border-[#3FB950]'
          : 'border-[#30363D]'
      }`}
    >
      {/* Editor Header */}
      <div
        className={`h-10 border-b flex items-center px-4 justify-between shrink-0 transition-colors ${
          status === 'error'
            ? 'bg-[#2B0D0D] border-[#E85555]/30'
            : status === 'success'
            ? 'bg-[#0D2B1A] border-[#3FB950]/30'
            : 'bg-[#161B22] border-[#30363D]'
        }`}
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-[#7D8590] uppercase tracking-wider font-mono">
          <span>✏️</span>
          <span className="text-[#E6EDF3]">Editor</span>
        </div>
        <span className="text-[10px] text-[#7D8590] font-mono">
          {isGfm ? 'Sabor GFM' : 'Sabor CommonMark'}
        </span>
      </div>

      {/* Editor Main Area */}
      <div className="flex-grow flex bg-[#0D1117] font-mono text-[14px] leading-6 overflow-hidden relative">
        {/* Line Numbers Gutter */}
        <div
          ref={lineNumbersRef}
          className="w-12 bg-[#161B22] border-r border-[#30363D] flex flex-col items-end py-4 pr-3 text-[#7D8590] select-none shrink-0 overflow-hidden font-mono"
        >
          {Array.from({ length: totalLines }).map((_, i) => (
            <div key={i} className="h-6">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          spellCheck={false}
          className="flex-grow py-4 px-4 bg-transparent text-[#E6EDF3] resize-none focus:outline-none focus:ring-0 overflow-auto font-mono text-[14px] leading-6 placeholder-[#30363D]"
          placeholder="Escribe tu código markdown aquí..."
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            minHeight: '200px',
          }}
        />

        {/* Floating warning indicator in case of error */}
        {status === 'error' && errorMessage && (
          <div className="absolute bottom-4 left-4 right-4 bg-[#2B0D0D] border border-[#E85555]/40 px-3 py-2 rounded text-xs text-[#E85555] flex items-center gap-2 shadow-lg z-10 animate-fade-in">
            <span className="material-symbols-outlined text-[16px] shrink-0">warning</span>
            <span className="leading-tight">{errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
