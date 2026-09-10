import React from 'react';
import { PageId } from './Header';
import { AlertCircle, MapPin, Compass, ShieldAlert } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 relative overflow-hidden">
      {/* Subtle Moroccan motif top highlight */}
      <div className="h-1 w-full bg-gradient-to-r from-red-700 via-emerald-600 to-amber-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Main Info Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-700 flex items-center justify-center text-white font-bold text-lg border border-amber-400/40">
                ت
              </div>
              <div>
                <h3 className="text-xl font-black text-white">تاونات تستحق الأفضل</h3>
                <p className="text-xs text-amber-400 font-medium">صوتك من أجل تاونات أفضل</p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              مشروع تجريبي مستقل لمحاكاة استطلاع رأي. يهدف إلى إتاحة منصة تفاعلية رقمية للتعرف على تطلعات الساكنة والأولويات التنموية لإقليم تاونات.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>إقليم تاونات — جهة فاس مكناس، المملكة المغربية</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-red-500" />
              أقسام الموقع
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="hover:text-amber-400 transition-colors text-slate-400"
                >
                  الصفحة الرئيسية
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('priorities')} 
                  className="hover:text-amber-400 transition-colors text-slate-400"
                >
                  أولويات الإقليم (6 محاور)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('vote')} 
                  className="hover:text-amber-400 transition-colors text-slate-400 font-semibold text-red-400"
                >
                  المشاركة في الاستطلاع
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('results')} 
                  className="hover:text-amber-400 transition-colors text-slate-400"
                >
                  نتائج الاستطلاع المباشرة
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('statistics')} 
                  className="hover:text-amber-400 transition-colors text-slate-400"
                >
                  لوحة الإحصائيات والمؤشرات
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="hover:text-amber-400 transition-colors text-slate-400"
                >
                  حول هذا الاستطلاع التجريبي
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('admin')} 
                  className="hover:text-slate-200 transition-colors text-slate-500 text-xs flex items-center gap-1 mt-2"
                >
                  لوحة الإدارة (Admin)
                </button>
              </li>
            </ul>
          </div>

          {/* Strict Mandatory Disclaimers */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              تنبيه قانوني وإخلاء مسؤولية
            </h4>
            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80 space-y-2 text-xs text-slate-300 leading-relaxed">
              <p className="font-semibold text-amber-300 flex items-start gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                <span>مشروع تجريبي مستقل لمحاكاة استطلاع رأي.</span>
              </p>
              <p>
                هذا الموقع غير رسمي ولا يمثل حزب الاستقلال أو وزارة الداخلية أو أي جهة انتخابية مغربية.
              </p>
              <p className="text-slate-400 border-t border-slate-700/60 pt-2 font-medium">
                النتائج المعروضة ليست نتائج انتخابات رسمية، وتقتصر على التعبير التقديري ضمن سيناريو الاستطلاع التجريبي.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            جميع الحقوق محفوظة © {new Date().getFullYear()} — منصة "تاونات تستحق الأفضل" (نسخة محاكاة تجريبية).
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>مبادرة رقمية مواطنة</span>
            <span>•</span>
            <span>إقليم تاونات، المغرب</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
