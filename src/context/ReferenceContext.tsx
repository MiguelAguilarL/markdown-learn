'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ReferenceContextType {
  isOpen: boolean;
  activeTab: 'commonmark' | 'gfm';
  searchQuery: string;
  openPanel: (tab?: 'commonmark' | 'gfm') => void;
  closePanel: () => void;
  setActiveTab: (tab: 'commonmark' | 'gfm') => void;
  setSearchQuery: (query: string) => void;
}

const ReferenceContext = createContext<ReferenceContextType | undefined>(undefined);

export const ReferenceProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'commonmark' | 'gfm'>('commonmark');
  const [searchQuery, setSearchQuery] = useState('');

  const openPanel = (tab?: 'commonmark' | 'gfm') => {
    if (tab) {
      setActiveTab(tab);
    }
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <ReferenceContext.Provider
      value={{
        isOpen,
        activeTab,
        searchQuery,
        openPanel,
        closePanel,
        setActiveTab,
        setSearchQuery,
      }}
    >
      {children}
    </ReferenceContext.Provider>
  );
};

export const useReferenceContext = () => {
  const context = useContext(ReferenceContext);
  if (!context) {
    throw new Error('useReferenceContext must be used within a ReferenceProvider');
  }
  return context;
};
