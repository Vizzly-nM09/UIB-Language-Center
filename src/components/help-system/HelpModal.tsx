'use client';

import React from 'react';
import { useHelp } from '@/contexts/help-context';
import { getPageHelp } from '@/constants/help-content';
import { X } from 'lucide-react';

export const HelpModal: React.FC = () => {
  const { isModalOpen, closeModal, currentPage, startTour } = useHelp();
  const pageHelp = getPageHelp(currentPage);

  if (!isModalOpen || !pageHelp) return null;

  const handleStartTour = () => {
    closeModal();
    // Small delay to ensure modal closes smoothly before tour starts
    setTimeout(() => {
      startTour();
    }, 200);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#9969ff] to-[#7c4dff] text-white p-6 flex justify-between items-start rounded-t-3xl z-10">
          <div className="flex-1">
            <h2 className="text-2xl font-black mb-2">{pageHelp.title}</h2>
            <p className="text-sm opacity-90">{pageHelp.description}</p>
          </div>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-white/20 rounded-xl transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {pageHelp.steps.map((step, idx) => (
            <div
              key={step.id}
              className="border-l-4 border-[#9969ff] pl-4 py-2 hover:bg-purple-50/50 rounded-r-xl transition-all"
            >
              <div className="flex items-start gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#9969ff] text-white flex items-center justify-center font-black text-sm">
                  {idx + 1}
                </div>
                <h3 className="font-black text-gray-900">{step.title}</h3>
              </div>
              <p className="text-sm text-gray-600 ml-11">{step.description}</p>
            </div>
          ))}

          {/* Tooltips Section */}
          {pageHelp.tooltips && Object.keys(pageHelp.tooltips).length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-[#9969ff]">💡</span> Tips & Tooltip
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(pageHelp.tooltips).map(([key, text]) => (
                  <div
                    key={key}
                    className="bg-amber-50 border border-amber-100 rounded-xl p-3"
                  >
                    <p className="text-xs font-bold text-amber-900 mb-1 uppercase tracking-wide">
                      {key}
                    </p>
                    <p className="text-xs text-amber-800">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 rounded-b-3xl flex justify-end gap-3 border-t border-gray-100">
          <button
            onClick={handleStartTour}
            className="px-6 py-2.5 bg-[#9969ff] hover:bg-[#8651ff] text-white font-bold rounded-xl transition-all text-sm"
          >
            🎯 Mulai Tour
          </button>
          <button
            onClick={closeModal}
            className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl transition-all text-sm"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
