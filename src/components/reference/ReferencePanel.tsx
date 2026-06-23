'use client';

import React, { useState, useMemo } from 'react';
import { useReference } from '../../hooks/useReference';
import { referenceData } from '../../data/reference-content';

export default function ReferencePanel() {
  const {
    isOpen,
    activeTab,
    searchQuery,
    closePanel,
    setActiveTab,
    setSearchQuery,
  } = useReference();

  // Guardar el estado de qué secciones están expandidas
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'Encabezados': true,
    'Negrita y Cursiva': true,
    'Tablas': true,
  });

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Filtrar el contenido de referencia según la pestaña activa y la búsqueda
  const filteredSections = useMemo(() => {
    const sections = referenceData[activeTab];
    if (!searchQuery.trim()) return sections;

    const query = searchQuery.toLowerCase();
    return sections
      .map((section) => {
        const filteredItems = section.items.filter(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            item.syntax.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
        );

        return {
          ...section,
          items: filteredItems,
        };
      })
      .filter((section) => section.items.length > 0);
  }, [activeTab, searchQuery]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 animate-fade-in"
        onClick={closePanel}
      />

      {/* Side Panel */}
      <div
        className="fixed top-0 right-0 h-full w-full sm:w-[680px] bg-[#161B22] border-l border-[#30363D] shadow-2xl z-50 flex flex-col transition-transform duration-300 animate-slide-in"
        style={{
          boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header */}
        <div className="bg-[#0D1117] border-b border-[#30363D] flex flex-col pt-4 px-6 pb-2 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#4A90D9]">tag</span>
              <h2 className="text-white font-bold font-mono text-lg">
                Guía Rápida de Markdown
              </h2>
            </div>
            <button
              onClick={closePanel}
              aria-label="Cerrar guía"
              className="text-[#7D8590] hover:text-white transition-colors p-1.5 rounded-md hover:bg-[#1C2128]"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
          
        </div>

        {/* Tab Bar */}
        <div className="bg-[#0D1117] border-b border-[#30363D] px-6 flex gap-6 shrink-0">
          <button
            onClick={() => setActiveTab('commonmark')}
            className={`py-3 text-sm font-medium border-b-2 transition-all font-sans ${
              activeTab === 'commonmark'
                ? 'text-[#4A90D9] border-[#4A90D9]'
                : 'text-[#7D8590] border-transparent hover:text-[#E6EDF3]'
            }`}
          >
            CommonMark
          </button>
          <button
            onClick={() => setActiveTab('gfm')}
            className={`py-3 text-sm font-medium border-b-2 transition-all font-sans ${
              activeTab === 'gfm'
                ? 'text-[#7C5CBF] border-[#7C5CBF]'
                : 'text-[#7D8590] border-transparent hover:text-[#E6EDF3]'
            }`}
          >
            GFM
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {filteredSections.length === 0 ? (
            <div className="text-center py-10 text-[#7D8590]">
              <span className="material-symbols-outlined text-4xl mb-2">search_off</span>
              <p>No se encontraron resultados para tu búsqueda.</p>
            </div>
          ) : (
            filteredSections.map((section) => {
              const isExpanded = !!expandedSections[section.title];
              return (
                <div
                  key={section.title}
                  className="bg-[#1C2128] border border-[#30363D] rounded-lg overflow-hidden"
                >
                  {/* Section Title */}
                  <div
                    onClick={() => toggleSection(section.title)}
                    className="px-4 py-3 flex items-center justify-between cursor-pointer bg-[#1C2128] hover:bg-[#1C2128]/80 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#4A90D9] text-[18px]">
                        {section.title === 'Encabezados' ? 'title' : 'menu_book'}
                      </span>
                      <h3 className="text-sm font-semibold font-mono text-[#4A90D9]">
                        {section.title}
                      </h3>
                    </div>
                    <span className="material-symbols-outlined text-[#7D8590] text-[20px] transition-transform duration-200">
                      {isExpanded ? 'expand_more' : 'chevron_right'}
                    </span>
                  </div>

                  {/* Section Items */}
                  {isExpanded && (
                    <div className="border-t border-[#30363D] p-4 bg-[#0D1117]/40 space-y-4">
                      {section.items.map((item) => (
                        <div key={item.name} className="space-y-2 pb-3 last:pb-0 border-b border-[#30363D]/50 last:border-b-0">
                          <h4 className="text-xs font-semibold text-[#E6EDF3] font-sans">
                            {item.name}
                          </h4>
                          <p className="text-xs text-[#7D8590] leading-relaxed">
                            {item.description}
                          </p>
                          <div className="grid grid-cols-2 gap-4 text-xs mt-2">
                            <div className="bg-[#0D1117] border border-[#30363D] rounded p-2.5 font-mono text-[#E6EDF3] whitespace-pre-wrap">
                              {item.syntax}
                            </div>
                            <div className="bg-[#1C2128] border border-[#30363D] rounded p-2.5 flex items-center overflow-x-auto text-[#E6EDF3]">
                              {/* Simple HTML Preview simulation */}
                              <div
                                dangerouslySetInnerHTML={{ __html: item.preview }}
                                className="w-full prose prose-invert prose-xs"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#0D1117] border-t border-[#30363D] h-[68px] px-6 flex items-center justify-between shrink-0">
          <div className="text-xs font-sans text-[#7D8590] flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">location_on</span>
            <span>Guía Activa</span>
          </div>
          <button
            onClick={closePanel}
            className="flex items-center gap-2 text-sm font-medium text-[#4A90D9] hover:text-white transition-colors group px-3 py-2 rounded-lg hover:bg-[#1C2128]"
          >
            Volver al ejercicio
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
