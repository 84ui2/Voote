import React from 'react';
import { Landmark, Shield, CheckCircle2, UserCheck, Sparkles, AlertCircle } from 'lucide-react';
import { PARTY_INFO } from '../data/pollData';

interface PartySectionProps {
  onGoToVote?: () => void;
}

export const PartySection: React.FC<PartySectionProps> = ({ onGoToVote }) => {
  const pillars = [
    { title: 'إصلاح الطريق', color: 'border-red-500 text-red-700 bg-red-50' },
    { title: 'الماء الصالح للشرب', color: 'border-sky-500 text-sky-700 bg-sky-50' },
    { title: 'التعليم', color: 'border-amber-500 text-amber-700 bg-amber-50' },
    { title: 'الصحة', color: 'border-rose-500 text-rose-700 bg-rose-50' },
    { title: 'التشغيل', color: 'border-emerald-500 text-emerald-700 bg-emerald-50' },
    { title: 'التنمية القروية', color: 'border-green-600 text-green-800 bg-green-50' },
  ];

  return (
    <section id="party-info-section" className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 shadow-lg p-6 sm:p-10">
      {/* Subtle Moroccan background geometry */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-600/5 to-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-8">
        
        {/* Top Header Card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-700 to-red-800 text-white flex items-center justify-center shrink-0 shadow-md border border-amber-400/40">
              <Landmark className="w-8 h-8 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {PARTY_INFO.name}
                </h2>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300/60">
                  تأسس {PARTY_INFO.foundingYear}
                </span>
              </div>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                {PARTY_INFO.description}
              </p>
            </div>
          </div>

          <div className="shrink-0 bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-3">
            <Shield className="w-5 h-5 text-emerald-700 shrink-0" />
            <div className="text-xs">
              <p className="font-bold text-slate-800">بيانات تعريفية موثقة ومحايدة</p>
              <p className="text-slate-500">حضور تاريخي في المشهد السياسي المغربي</p>
            </div>
          </div>
        </div>

        {/* Local poll figure context card (عبد الدايم الحدوشي) strictly adhering to instructions */}
        <div className="bg-gradient-to-r from-red-50/70 via-slate-50 to-emerald-50/50 rounded-2xl border border-red-200/80 p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-700 text-white">
                  <UserCheck className="w-3.5 h-3.5" />
                  محور استطلاع الرأي التجريبي
                </span>
                <span className="text-xs text-slate-500">إقليم تاونات</span>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                عبد الدايم الحدوشي – ضمن سيناريو الاستطلاع التجريبي
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                شخصية محلية مرتبطة بإقليم تاونات، يقود حولها هذا الاستطلاع التجريبي لقياس تفاعل الساكنة ورؤيتهم للتمثيلية المحلية ضمن سيناريو محاكاة محايد، وبالموازاة مع خيارات أخرى بديلة متاحة للمشاركين بحرية كاملة.
              </p>

              <div className="flex items-center gap-2 pt-1 text-xs text-amber-800 font-medium">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>المشاركة والاستطلاع مخصصة لأغراض محاكاة الرأي العام المحلي فقط.</span>
              </div>
            </div>

            {onGoToVote && (
              <button
                onClick={onGoToVote}
                className="shrink-0 px-6 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>عبر عن رأيك في الاستطلاع</span>
              </button>
            )}
          </div>
        </div>

        {/* Priorities Pillars ("من أجل تاونات") */}
        <div className="space-y-4 pt-2">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-black text-slate-900 flex items-center justify-center gap-2">
              <span className="w-8 h-0.5 bg-red-700 rounded-full" />
              <span>من أجل تاونات</span>
              <span className="w-8 h-0.5 bg-red-700 rounded-full" />
            </h3>
            <p className="text-xs text-slate-500">
              المحاور الأساسية للترافع التنموي بالإقليم
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {pillars.map((p, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-transform hover:scale-105 ${p.color}`}
              >
                <CheckCircle2 className="w-4 h-4 mb-1.5 opacity-80" />
                <span className="text-xs sm:text-sm font-bold">{p.title}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-slate-400 font-medium pt-1">
            {PARTY_INFO.prioritiesPillars}
          </p>
        </div>

      </div>
    </section>
  );
};
