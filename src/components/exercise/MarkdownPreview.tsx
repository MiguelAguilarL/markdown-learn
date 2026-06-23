'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';

interface MarkdownPreviewProps {
  code: string;
  status: 'idle' | 'success' | 'error';
  isGfm?: boolean;
}

export default function MarkdownPreview({
  code,
  status,
  isGfm = false,
}: MarkdownPreviewProps) {


  const processedCode = code.replace(/\[\^[^\]]+\]:.*\n?/g, '').replace(/\[\^[^\]]+\]/g, '');
  return (
    <div
      className={`w-full md:w-1/2 flex flex-col bg-[#0D1117] border rounded-lg overflow-hidden flex-shrink-0 shadow-sm relative transition-all duration-200 ${
        status === 'error'
          ? 'border-[#E85555]/40'
          : status === 'success'
          ? 'border-[#3FB950]/40'
          : 'border-[#30363D]'
      }`}
    >
      {/* Alert styles moved to globals.css */}
      <div className="h-10 bg-[#161B22] border-b border-[#30363D] flex items-center px-4 justify-between shrink-0">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#7D8590] uppercase tracking-wider font-mono">
          <span>👁️</span>
          <span className="text-[#E6EDF3]">Vista previa</span>
        </div>
        {status === 'error' && (
          <span className="bg-[#E85555]/10 text-[#E85555] border border-[#E85555]/20 text-[10px] px-2 py-0.5 rounded font-medium">
            Error detectado
          </span>
        )}
      </div>

      {/* Rendered Output Area */}
      <div
        id="user-preview"
        className="flex-grow bg-[#0D1117] p-6 overflow-auto text-sm text-[#E6EDF3] select-text prose prose-invert prose-blue max-w-none prose-p:my-2 prose-headings:font-mono prose-headings:text-[#4A90D9] prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-hr:border-[#30363D] prose-a:text-[#4A90D9] prose-a:underline prose-code:text-[#4A90D9] prose-code:bg-[#161B22] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:border prose-code:border-[#30363D] prose-pre:bg-[#161B22] prose-pre:border prose-pre:border-[#30363D] prose-blockquote:border-l-4 prose-blockquote:border-[#30363D] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-[#7D8590] prose-table:border prose-table:border-[#30363D] prose-th:bg-[#161B22] prose-th:p-2 prose-th:border prose-th:border-[#30363D] prose-td:p-2 prose-td:border prose-td:border-[#30363D]"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          rehypePlugins={[rehypeRaw]}
        >
          {processedCode || ' '}
        </ReactMarkdown>
      </div>

      {/* Warning Chip Overlay in case of validation error */}
      {status === 'error' && (
        <div className="absolute bottom-4 left-4 bg-[#2B0D0D] border border-[#E85555]/30 px-3 py-1.5 rounded-full text-xs text-[#E85555] font-medium shadow-md">
          Resultado incorrecto — Revisa el formato
        </div>
      )}
    </div>
  );
}
