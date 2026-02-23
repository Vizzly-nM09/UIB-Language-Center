'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useHelp } from '@/contexts/help-context';
import { getPageHelp } from '@/constants/help-content';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';

export const GuidedTour: React.FC = () => {
  const { tourActive, currentStep, nextStep, prevStep, endTour, currentPage } = useHelp();
  const [highlightPos, setHighlightPos] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const [showOverlay, setShowOverlay] = useState(false);
  const pageHelp = getPageHelp(currentPage);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tourActive || !pageHelp) return;

    setShowOverlay(false); // Hide overlay first
    
    const overlayTimer = setTimeout(() => setShowOverlay(true), 100); // Fade in overlay after short delay

    const step = pageHelp.steps[currentStep];
    if (!step?.element) return;

    const targetElement = document.querySelector(step.element);
    if (!targetElement) return;

    const rect = targetElement.getBoundingClientRect();
    const padding = 16;
    
    setHighlightPos({
      top: rect.top + window.scrollY - padding,
      left: rect.left + window.scrollX - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2,
    });

    // Calculate tooltip position - prefer below, fallback to top
    let tooltipTop = rect.bottom + window.scrollY + 30;
    let tooltipLeft = rect.left + window.scrollX + rect.width / 2;
    
    // Keep tooltip in viewport
    if (tooltipRef.current) {
      const tooltipWidth = tooltipRef.current.offsetWidth;
      tooltipLeft = tooltipLeft - tooltipWidth / 2;
      
      // Boundary check
      if (tooltipLeft + tooltipWidth > window.innerWidth - 20) {
        tooltipLeft = window.innerWidth - tooltipWidth - 20;
      }
      if (tooltipLeft < 20) {
        tooltipLeft = 20;
      }
      
      // If too close to bottom, move above
      if (tooltipTop + 300 > window.innerHeight + window.scrollY) {
        tooltipTop = rect.top + window.scrollY - 30 - 300;
      }
    }
    
    setTooltipPos({ top: tooltipTop, left: tooltipLeft });

    // Scroll into view with offset for header
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

    return () => {
      clearTimeout(overlayTimer);
    };
  }, [tourActive, currentStep, pageHelp]);

  if (!tourActive || !pageHelp || currentStep >= pageHelp.steps.length) return null;

  const step = pageHelp.steps[currentStep];
  const progress = ((currentStep + 1) / pageHelp.steps.length) * 100;

  return (
    <>
      {/* Dark Overlay - Light dim effect */}
      <div 
        className="fixed inset-0 z-[9998] pointer-events-none transition-opacity duration-700"
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          opacity: showOverlay ? 1 : 0,
        }} 
      />

      {/* Highlighted Element - Spotlight/Cutout area with glow */}
      <div
        className="fixed z-[9999] pointer-events-none transition-all duration-500 rounded-2xl"
        style={{
          top: `${highlightPos.top}px`,
          left: `${highlightPos.left}px`,
          width: `${highlightPos.width}px`,
          height: `${highlightPos.height}px`,
          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5), 0 0 40px rgba(153, 105, 255, 1), inset 0 0 20px rgba(153, 105, 255, 0.3)',
          border: '3px solid rgba(153, 105, 255, 0.8)',
          backdropFilter: 'brightness(1.1)',
        }}
      />

      {/* Tooltip with gaming-style positioning */}
      <div
        ref={tooltipRef}
        className="fixed z-[10000] bg-white rounded-2xl shadow-2xl p-6 max-w-sm pointer-events-auto transition-all duration-500"
        style={{
          top: `${tooltipPos.top}px`,
          left: `${tooltipPos.left}px`,
          opacity: tourActive ? 1 : 0,
        }}
      >
        {/* Step Number & Progress */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-black text-[#9969ff] uppercase tracking-wider">
            Step {currentStep + 1} of {pageHelp.steps.length}
          </span>
          <button
            onClick={endTour}
            className="p-1 hover:bg-gray-100 rounded-lg transition-all"
          >
            <X size={16} className="text-gray-400" />
          </button>
        </div>

        {/* Progress Bar - Gaming style */}
        <div className="w-full h-2.5 bg-gray-200 rounded-full mb-4 overflow-hidden border border-gray-300">
          <div
            className="h-full bg-gradient-to-r from-[#9969ff] via-[#c084fc] to-[#7c4dff] transition-all duration-500 rounded-full shadow-lg"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent mb-4" />

        {/* Title & Description */}
        <h3 className="font-black text-gray-900 mb-2 text-lg">{step.title}</h3>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">{step.description}</p>

        {/* Navigation - Gaming style buttons */}
        <div className="flex gap-3 justify-between mb-4">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-700 font-bold text-sm transition-all active:scale-95"
          >
            <ChevronLeft size={16} /> Prev
          </button>

          {currentStep === pageHelp.steps.length - 1 ? (
            <button
              onClick={endTour}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-[#9969ff] to-[#7c4dff] hover:from-[#8651ff] hover:to-[#6c3ddd] text-white font-bold text-sm transition-all active:scale-95 shadow-lg"
            >
              Done ✓
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-[#9969ff] to-[#7c4dff] hover:from-[#8651ff] hover:to-[#6c3ddd] text-white font-bold text-sm transition-all active:scale-95 shadow-lg"
            >
              Next <ChevronRight size={16} />
            </button>
          )}
        </div>

        {/* Keyboard hint */}
        <div className="text-xs text-gray-400 pt-3 border-t border-gray-100 text-center">
          Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">ESC</kbd> to exit
        </div>
      </div>

      {/* Close on ESC */}
      <div
        onClick={endTour}
        className="fixed inset-0 z-[9997] cursor-pointer"
        onKeyDown={(e) => {
          if (e.key === 'Escape') endTour();
        }}
      />
    </>
  );
};
