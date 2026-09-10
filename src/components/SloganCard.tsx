import React from 'react';
import { Quote, Sparkles } from 'lucide-react';

interface SloganCardProps {
  text: string;
  category: string;
  highlight: string;
  index: number;
}

export const SloganCard: React.FC<SloganCardProps> = ({ text, category, highlight, index }) => {
  // Rotate color schemes for variety
  const colorAccents = [
    'from-red-700/10 via-amber-50 to-white border-red-200/80 text-red-900',
    'from-emerald-700/10 via-emerald-50/50 to-white border-emerald-200/80 text-emerald-950',
    'from-amber-600/10 via-amber-50/50 to-white border-amber-200/80 text-amber-950',
    'from-sky-600/10 via-sky-50/50 to-white border-sky-200/80 text-sky-950',
    'from-red-800/10 via-red-50/50 to-white border-red-200/80 text-red-950',
    'from-emerald-800/10 via-emerald-50/50 to-white border-emerald-200/80 text-emerald-950',
  ];

  const currentTheme = colorAccents[index % colorAccents.length];

  return (
    <div
      id={`slogan-card-${index}`}
      className={`relative overflow-hidden rounded-2xl border p-6 bg-gradient-to-br ${currentTheme} shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`}
    >
      {/* Subtle Quote watermark */}
      <Quote className="absolute -left-2 -bottom-2 w-16 h-16 text-slate-900/5 rotate-180 pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/80 border border-slate-200 text-slate-700 shadow-xs">
            {category}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-amber-600 opacity-80" />
        </div>

        <blockquote className="text-lg sm:text-xl font-black tracking-tight leading-snug">
          « {text} »
        </blockquote>

        <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
          <span className="font-medium text-slate-600">{highlight}</span>
          <span className="text-[10px] text-amber-700 font-semibold bg-amber-100/70 px-1.5 py-0.5 rounded">
            شعار مقترح
          </span>
        </div>
      </div>
    </div>
  );
};
