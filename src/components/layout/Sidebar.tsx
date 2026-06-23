'use client';

import React from 'react';
import Link from 'next/link';
import { useReference } from '../../hooks/useReference';
import { useParams } from 'next/navigation';
import { sections } from '../../data/exercises';
import { useProgress } from '../../hooks/useProgress';


export default function Sidebar() {
  const params = useParams();
  const activeSectionId = params?.sectionId as string;
  const activeExerciseId = params?.exerciseId as string;

  const { completedExercises } = useProgress();
  const { openPanel } = useReference();
  

  // Calcular el progreso total
  const totalExercises = sections.reduce((acc, sec) => acc + sec.exercises.length, 0);
  const completedCount = completedExercises.length;
  const progressPercent = totalExercises > 0 ? (completedCount / totalExercises) * 100 : 0;

  // Filtrar secciones por especificación
  const commonMarkSections = sections.filter((s) => s.spec === 'commonmark');
  const gfmSections = sections.filter((s) => s.spec === 'gfm');

  return (
    <aside className="w-[260px] bg-[#0D1117] border-r border-[#30363D] flex flex-col h-full shrink-0 z-20 relative font-sans">
      {/* Top: Logo & Progress */}
      <div className="p-5 border-b border-[#30363D]">
        <div className="flex items-center gap-3 mb-5">
          {/* Custom SVG Logo based on the Stitch specs */}
          <div className="w-8 h-8 rounded-lg bg-[#1C2128] border border-[#30363D] flex items-center justify-center text-[#4A90D9]">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4z" />
              <path d="M12 11v4" />
              <path d="M10 13h4" />
            </svg>
          </div>
          <div>
            <h1 className="font-mono font-bold text-[#4A90D9] tracking-tight leading-none text-base">
              MarkdownLearn
            </h1>
            <p className="text-[10px] text-[#7D8590] mt-1 font-mono">
              Ejercicios Interactivos
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs text-[#7D8590] font-mono">
            <span>Progreso</span>
            <span>{completedCount} / {totalExercises} ej.</span>
          </div>
          <div className="h-2 w-full bg-[#1C2128] rounded-full overflow-hidden border border-[#30363D]/50">
            <div
              className="h-full bg-[#4A90D9] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Navigation Tree */}
      <div className="flex-grow overflow-y-auto py-4 px-3 space-y-5 custom-scrollbar">
        {/* GROUP 1: CommonMark */}
        <div>
          <div className="px-3 mb-2 flex items-center gap-2">
            <span className="bg-[#1C2128] text-[#4A90D9] text-[9px] font-mono px-1.5 py-0.5 rounded border border-[#4A90D9]/20 font-bold shrink-0">
              CM
            </span>
            <h2 className="text-[11px] font-bold text-[#7D8590] uppercase tracking-wider">
              CommonMark
            </h2>
          </div>
          <ul className="space-y-1">
            {commonMarkSections.map((section) => {
              const isSectionActive = activeSectionId === section.id;
              return (
                <li key={section.id} className="space-y-0.5">
                  <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold select-none ${
                      isSectionActive ? 'text-[#4A90D9]' : 'text-[#7D8590]'
                    }`}
                  >
                    <span>{section.icon}</span>
                    <span className="truncate">{section.title}</span>
                  </div>
                  
                  {/* Indented Sub-Exercises */}
                  <ul className="pl-4 border-l border-[#30363D]/60 ml-3.5 space-y-0.5">
                    {section.exercises.map((exercise) => {
                      const isExerciseActive = activeExerciseId === exercise.id;
                      const isCompleted = completedExercises.includes(exercise.id);

                      let statusColor = 'bg-[#30363D]';
                      let statusShadow = '';
                      if (isCompleted) {
                        statusColor = 'bg-[#3FB950]';
                        statusShadow = 'shadow-[0_0_4px_rgba(63,185,80,0.5)]';
                      } else if (isExerciseActive) {
                        statusColor = 'bg-[#4A90D9]';
                        statusShadow = 'shadow-[0_0_6px_rgba(74,144,217,0.6)]';
                      }

                      return (
                        <li key={exercise.id}>
                          <Link
                            href={`/exercise/${section.id}/${exercise.id}`}
                            className={`flex items-center gap-2.5 px-3 py-1 rounded transition-colors text-xs leading-5 ${
                              isExerciseActive
                                ? 'bg-[#1C2128] text-[#4A90D9] font-medium'
                                : 'text-[#E6EDF3] hover:bg-[#1C2128]/50 hover:text-white'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusColor} ${statusShadow}`}></span>
                            <span className="truncate">{exercise.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>

        {/* GROUP 2: GFM */}
        <div>
          <div className="px-3 mb-2 flex items-center gap-2">
            <span className="bg-[#1C2128] text-[#7C5CBF] text-[9px] font-mono px-1.5 py-0.5 rounded border border-[#7C5CBF]/20 font-bold shrink-0">
              GFM
            </span>
            <h2 className="text-[11px] font-bold text-[#7D8590] uppercase tracking-wider">
              GitHub Flavored
            </h2>
          </div>
          <ul className="space-y-1">
            {gfmSections.map((section) => {
              const isSectionActive = activeSectionId === section.id;
              return (
                <li key={section.id} className="space-y-0.5">
                  <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold select-none ${
                      isSectionActive ? 'text-[#7C5CBF]' : 'text-[#7D8590]'
                    }`}
                  >
                    <span>{section.icon}</span>
                    <span className="truncate">{section.title}</span>
                  </div>
                  
                  {/* Indented Sub-Exercises */}
                  <ul className="pl-4 border-l border-[#30363D]/60 ml-3.5 space-y-0.5">
                    {section.exercises.map((exercise) => {
                      const isExerciseActive = activeExerciseId === exercise.id;
                      const isCompleted = completedExercises.includes(exercise.id);

                      let statusColor = 'bg-[#30363D]';
                      let statusShadow = '';
                      if (isCompleted) {
                        statusColor = 'bg-[#3FB950]';
                        statusShadow = 'shadow-[0_0_4px_rgba(63,185,80,0.5)]';
                      } else if (isExerciseActive) {
                        statusColor = 'bg-[#7C5CBF]';
                        statusShadow = 'shadow-[0_0_6px_rgba(124,92,191,0.6)]';
                      }

                      return (
                        <li key={exercise.id}>
                          <Link
                            href={`/exercise/${section.id}/${exercise.id}`}
                            className={`flex items-center gap-2.5 px-3 py-1 rounded transition-colors text-xs leading-5 ${
                              isExerciseActive
                                ? 'bg-[#1C2128] text-[#7C5CBF] font-medium'
                                : 'text-[#E6EDF3] hover:bg-[#1C2128]/50 hover:text-white'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusColor} ${statusShadow}`}></span>
                            <span className="truncate">{exercise.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="p-4 border-t border-[#30363D] shrink-0">
          <button
            onClick={() => openPanel()}
            className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-md text-sm text-[#7D8590] hover:text-[#E6EDF3] hover:bg-[#1C2128] transition-colors border border-transparent hover:border-[#30363D] font-medium font-mono"
          >
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
            <span>Guía de Referencia</span>
          </button>
        </div>
      
    </aside>
  );
}
