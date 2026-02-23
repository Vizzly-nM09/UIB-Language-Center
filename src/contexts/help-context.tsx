'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface HelpStep {
  id: string;
  title: string;
  description: string;
  element?: string; // CSS selector for tour highlight
}

export interface PageHelp {
  pageKey: string;
  title: string;
  description: string;
  steps: HelpStep[];
  tooltips?: Record<string, string>; // Tooltip texts for specific elements
}

interface HelpContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  
  // Modal/Popover Help
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  
  // Guided Tour
  tourActive: boolean;
  currentStep: number;
  startTour: () => void;
  endTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  
  // Help Sidebar
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  
  // Tooltip
  activeTooltip: string | null;
  showTooltip: (key: string) => void;
  hideTooltip: () => void;
}

const HelpContext = createContext<HelpContextType | undefined>(undefined);

export const HelpProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tourActive, setTourActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);
  
  const startTour = useCallback(() => {
    setTourActive(true);
    setCurrentStep(0);
  }, []);
  
  const endTour = useCallback(() => {
    setTourActive(false);
    setCurrentStep(0);
  }, []);
  
  const nextStep = useCallback(() => {
    setCurrentStep(prev => prev + 1);
  }, []);
  
  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  }, []);
  
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);
  
  const showTooltip = useCallback((key: string) => {
    setActiveTooltip(key);
  }, []);
  
  const hideTooltip = useCallback(() => {
    setActiveTooltip(null);
  }, []);

  const value: HelpContextType = {
    currentPage,
    setCurrentPage,
    isModalOpen,
    openModal,
    closeModal,
    tourActive,
    currentStep,
    startTour,
    endTour,
    nextStep,
    prevStep,
    sidebarOpen,
    toggleSidebar,
    activeTooltip,
    showTooltip,
    hideTooltip,
  };

  return (
    <HelpContext.Provider value={value}>
      {children}
    </HelpContext.Provider>
  );
};

export const useHelp = () => {
  const context = useContext(HelpContext);
  if (!context) {
    throw new Error('useHelp must be used within HelpProvider');
  }
  return context;
};
