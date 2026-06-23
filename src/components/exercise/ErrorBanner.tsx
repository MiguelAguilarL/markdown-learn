'use client';

import React from 'react';

interface ErrorBannerProps {
  feedback: string;
  detailedError?: string;
  userCode: string;
}

export default function ErrorBanner({
  feedback,
  detailedError,
  userCode,
}: ErrorBannerProps) {
  // Tomar la primera línea que no esté vacía del usuario para mostrarla tachada como referencia rápida
  const sampleLine = userCode.split('\n').find((l) => l.trim() !== '') || 'Respuesta vacía';

  return (
    <div className="bg-[#2B0D0D] border border-[#E85555] rounded-lg p-5 flex items-start gap-4 shadow-md font-sans">
      {/* Error Cancel Icon */}
      <span className="material-symbols-outlined text-[#E85555] text-2xl shrink-0 select-none">
        cancel
      </span>

      {/* Error Details */}
      <div className="space-y-2 flex-1">
        <h3 className="text-[#E85555] font-bold text-sm">
          Respuesta incorrecta
        </h3>
        <p className="text-sm text-[#E6EDF3]/90 leading-relaxed">
          {feedback}
        </p>

        {detailedError && (
          <p className="text-xs text-[#7D8590] font-mono leading-relaxed mt-1">
            Detalles técnicos: {detailedError}
          </p>
        )}

        <div className="pt-2">
          <div className="inline-flex items-center bg-[#0D1117]/60 px-3 py-1.5 rounded border border-[#E85555]/30 text-xs font-mono">
            <span className="line-through text-[#E85555]/70 decoration-[#E85555] select-all">
              {sampleLine}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
