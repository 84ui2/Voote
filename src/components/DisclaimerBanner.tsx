import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

interface DisclaimerBannerProps {
  compact?: boolean;
  className?: string;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ compact = false, className = '' }) => {
  if (compact) {
    return (
      <div 
        id="compact-disclaimer-banner"
        className={`bg-amber-500/10 border-b border-amber-500/20 text-amber-900 text-xs py-2 px-4 text-center flex items-center justify-center gap-2 ${className}`}
      >
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <span>
          <strong>تنبيه قانوني:</strong> منصة محاكاة تجريبية واستطلاع رأي غير رسمي، لا تمثل أي جهة انتخابية أو حزبية رسمية.
        </span>
      </div>
    );
  }

  return (
    <div 
      id="main-disclaimer-box"
      className={`rounded-2xl bg-gradient-to-r from-amber-50 via-amber-50/70 to-red-50 border-2 border-amber-300/80 p-5 shadow-sm ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-200 text-amber-900">
              إشعار تنبيهي هام
            </span>
            <span className="text-xs text-amber-800 font-medium">محاكاة رقمية وتجريبية</span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
            هذا الموقع <span className="text-red-700 underline decoration-red-400">مشروع تجريبي ومحاكاة لاستطلاع رأي فقط</span>، وليس موقعاً رسمياً لحزب الاستقلال، وليس تابعاً لوزارة الداخلية أو لأي جهة انتخابية مغربية، ولا يمثل نتائج الانتخابات الرسمية.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-normal flex items-center gap-1.5 pt-0.5">
            <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 inline" />
            جميع المعطيات والأسماء والنسب المعروضة مدرجة لأغراض المحاكاة ودراسة الأولويات التنموية التقديرية بإقليم تاونات.
          </p>
        </div>
      </div>
    </div>
  );
};
