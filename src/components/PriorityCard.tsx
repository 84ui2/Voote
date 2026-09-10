import React from 'react';
import { Route, Droplets, GraduationCap, HeartPulse, Briefcase, Trees, ArrowLeft } from 'lucide-react';
import { PriorityType } from '../types';
import { PRIORITIES_INFO } from '../data/pollData';

interface PriorityCardProps {
  priorityKey: PriorityType;
  votePercentage?: number;
  voteCount?: number;
  onSelectForVote?: (priority: PriorityType) => void;
  showVoteAction?: boolean;
}

export const PriorityCard: React.FC<PriorityCardProps> = ({
  priorityKey,
  votePercentage,
  voteCount,
  onSelectForVote,
  showVoteAction = false,
}) => {
  const info = PRIORITIES_INFO[priorityKey];

  const getIcon = () => {
    switch (priorityKey) {
      case 'roads':
        return <Route className="w-6 h-6 text-red-700" />;
      case 'water':
        return <Droplets className="w-6 h-6 text-sky-600" />;
      case 'education':
        return <GraduationCap className="w-6 h-6 text-amber-600" />;
      case 'health':
        return <HeartPulse className="w-6 h-6 text-rose-600" />;
      case 'employment':
        return <Briefcase className="w-6 h-6 text-emerald-700" />;
      case 'agriculture':
        return <Trees className="w-6 h-6 text-green-700" />;
    }
  };

  const getAccentBorder = () => {
    switch (priorityKey) {
      case 'roads':
        return 'hover:border-red-600';
      case 'water':
        return 'hover:border-sky-500';
      case 'education':
        return 'hover:border-amber-500';
      case 'health':
        return 'hover:border-rose-500';
      case 'employment':
        return 'hover:border-emerald-600';
      case 'agriculture':
        return 'hover:border-green-600';
    }
  };

  const getBadgeStyle = () => {
    switch (priorityKey) {
      case 'roads':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'water':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'education':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'health':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'employment':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'agriculture':
        return 'bg-green-50 text-green-800 border-green-200';
    }
  };

  return (
    <div
      id={`priority-card-${priorityKey}`}
      className={`group relative bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${getAccentBorder()} transform hover:-translate-y-1`}
    >
      <div>
        {/* Header with Icon and Label */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
            {getIcon()}
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getBadgeStyle()}`}>
            {info.shortLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5 group-hover:text-red-700 transition-colors">
          {info.title}
        </h3>

        {/* Text */}
        <p className="text-sm text-slate-600 leading-relaxed">
          {info.description}
        </p>
      </div>

      {/* Footer / Stats or Action */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        {votePercentage !== undefined ? (
          <div className="w-full">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-500 font-medium">نسبة التأييد كأولوية:</span>
              <span className="font-bold text-slate-900">{votePercentage}% {voteCount !== undefined && `(${voteCount} صوت)`}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-red-700 transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(2, votePercentage))}%` }}
              />
            </div>
          </div>
        ) : showVoteAction && onSelectForVote ? (
          <button
            onClick={() => onSelectForVote(priorityKey)}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-700 hover:text-white transition-colors"
          >
            <span>اختر كأولوية وصوت</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span>محور استراتيجي أساسي</span>
          </div>
        )}
      </div>
    </div>
  );
};
