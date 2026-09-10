import React, { useState, useRef, useEffect } from 'react';
import { Info, Sparkles, X } from 'lucide-react';

interface InfoTooltipProps {
  title?: string;
  text: string;
  importance?: string;
  className?: string;
  align?: 'right' | 'left' | 'center';
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({
  title,
  text,
  importance,
  className = '',
  align = 'right',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('pointerdown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleToggle = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  // Alignment classes for RTL (default right-aligned)
  const alignmentClass = 
    align === 'left' 
      ? 'left-0' 
      : align === 'center' 
      ? 'left-1/2 -translate-x-1/2' 
      : 'right-0 sm:right-auto sm:left-0';

  return (
    <div 
      ref={containerRef} 
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        aria-label={title ? `معلومات توضيحية حول ${title}` : 'معلومات توضيحية'}
        aria-expanded={isOpen}
        onClick={handleToggle}
        className="w-5 h-5 rounded-full bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-700 border border-slate-200 hover:border-red-200 transition-all flex items-center justify-center focus:outline-hidden focus:ring-2 focus:ring-red-700/30 p-0.5 shrink-0"
      >
        <Info className="w-3.5 h-3.5" />
      </button>

      {/* Tooltip Content Popup */}
      {isOpen && (
        <div
          role="tooltip"
          onClick={(e) => e.stopPropagation()}
          className={`absolute bottom-full mb-2.5 z-50 w-64 sm:w-72 max-w-[85vw] p-3.5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-700/80 shadow-2xl text-xs space-y-2.5 text-right font-normal leading-relaxed animate-in fade-in zoom-in-95 duration-150 ${alignmentClass}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-white text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
              <span>{title || 'تلميح توضيحي'}</span>
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="text-slate-400 hover:text-white p-0.5 rounded-md hover:bg-slate-800"
              aria-label="إغلاق التلميح"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Explanation Text */}
          <p className="text-slate-300 text-[11px] leading-relaxed">
            {text}
          </p>

          {/* Importance Section */}
          {importance && (
            <div className="pt-2 border-t border-slate-800/80 space-y-1">
              <div className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                <span>الأهمية لتطوير تاونات:</span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium leading-relaxed bg-slate-800/50 p-2 rounded-xl border border-slate-700/50">
                {importance}
              </p>
            </div>
          )}

          {/* Little downward arrow pointer */}
          <div className="absolute top-full right-2 sm:right-auto sm:left-2 -mt-[5px] border-4 border-transparent border-t-slate-900" />
        </div>
      )}
    </div>
  );
};
