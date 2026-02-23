'use client';

import React, { useState, useRef, useEffect } from 'react';

interface HelpTooltipProps {
  trigger: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  isInline?: boolean;
}

export const HelpTooltip: React.FC<HelpTooltipProps> = ({
  trigger,
  content,
  position = 'top',
  isInline = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!isVisible || !triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const gap = 8;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - gap;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + gap;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'left':
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.left - tooltipRect.width - gap;
        break;
      case 'right':
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.right + gap;
        break;
    }

    setTooltipPos({ top, left });
  }, [isVisible, position]);

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={() => !isInline && setIsVisible(true)}
      onMouseLeave={() => !isInline && setIsVisible(false)}
      onClick={() => isInline && setIsVisible(!isVisible)}
    >
      {trigger}

      {isVisible && (
        <div
          ref={tooltipRef}
          className="fixed z-40 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg font-medium whitespace-nowrap shadow-lg  pointer-events-none max-w-xs"
          style={{
            top: `${tooltipPos.top}px`,
            left: `${tooltipPos.left}px`,
            whiteSpace: 'normal',
          }}
        >
          {content}
          <div
            className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${
              position === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2' :
              position === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2' :
              position === 'left' ? 'right-[-4px] top-1/2 -translate-y-1/2' :
              'left-[-4px] top-1/2 -translate-y-1/2'
            }`}
          />
        </div>
      )}
    </div>
  );
};

interface InlineHelpProps {
  title: string;
  content: string;
  icon?: React.ReactNode;
}

export const InlineHelp: React.FC<InlineHelpProps> = ({
  title,
  content,
  icon = '❓',
}) => {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-lg p-4 my-4">
      <div className="flex gap-3">
        <div className="text-2xl flex-shrink-0">{icon}</div>
        <div>
          <p className="font-bold text-blue-900 text-sm mb-1">{title}</p>
          <p className="text-xs text-blue-800">{content}</p>
        </div>
      </div>
    </div>
  );
};

export const HelpHint: React.FC<{ content: string }> = ({ content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="inline-block">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#9969ff] text-white text-xs font-black hover:bg-[#8651ff] transition-all"
      >
        ?
      </button>
      {isVisible && (
        <div className="absolute z-40 mt-2 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg max-w-xs pointer-events-none">
          {content}
        </div>
      )}
    </div>
  );
};
