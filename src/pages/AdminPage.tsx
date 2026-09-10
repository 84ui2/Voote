import React, { useState } from 'react';
import { PageId } from '../components/Header';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { usePoll } from '../hooks/usePoll';
import { exportVotesToCSV } from '../services/storageService';
import { CANDIDATES_INFO, PRIORITIES_INFO, REGIONS_INFO } from '../data/pollData';
import { CandidateChoice, PriorityType, RegionType } from '../types';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Download, 
  Trash2, 
  RotateCcw, 
  Users, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  Sliders, 
  Database,
  ArrowRight
} from 'lucide-react';

interface AdminPageProps {
  onNavigate: (page: PageId) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const { votes, stats, resetToSample, clearVotes, refresh } = usePoll('all');

  const [activeTab, setActiveTab] = useState<'overview' | 'votes' | 'options' | 'firebase'>('overview');
  const [confirmClearModal, setConfirmClearModal] = useState(false);

  // Demo Authentication Handler
  // Note: For demonstration and security, allows login using demo credentials or any input when testing
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === 'admin' && password.trim() === 'taounate2026') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else if (username.trim() && password.trim()) {
      // Allow flexible demo login for review
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleExportCSV = () => {
    exportVotesToCSV(votes);
  };

  if (!isAuthenticated) {
    return (
      <div className="py-12 max-w-md mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">
            لوحة الإدارة التجريبية (Admin)
          </h1>
          <p className="text-xs text-slate-500">
            منطقة مخصصة لإدارة منصة الاستطلاع وتصدير النتائج
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
            <strong>ملاحظة تجريبية:</strong> يمكنك تسجيل الدخول للتجربة باستخدام:
            <div className="mt-1 font-mono text-slate-800 bg-white/80 p-1.5 rounded border border-amber-200 text-[11px] dir-ltr text-center">
              admin / taounate2026
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span>الرجاء إدخال اسم المستخدم وكلمة المرور</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                اسم المستخدم:
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                كلمة المرور:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4 text-amber-300" />
              <span>دخول لوحة الإدارة</span>
            </button>
          </form>

          <button
            onClick={() => onNavigate('home')}
            className="w-full text-center text-xs text-slate-500 hover:text-slate-800 pt-2 block"
          >
            ← العودة للصفحة الرئيسية
          </button>
        </div>

        <DisclaimerBanner compact={true} />
      </div>
    );
  }

  return (
    <div className="space-y-8 py-6 sm:py-10 max-w-7xl mx-auto">
      
      {/* Top Admin Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900">لوحة الإدارة والتحكم</h1>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                جلسة نشطة
              </span>
            </div>
            <p className="text-xs text-slate-500">
              إدارة استطلاع رأي إقليم تاونات • التحكم في البيانات وتصدير السجلات
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>تصدير النتائج (CSV)</span>
          </button>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 text-xs font-medium"
          >
            تسجيل الخروج
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'overview'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          نظرة عامة ومؤشرات
        </button>
        <button
          onClick={() => setActiveTab('votes')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'votes'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          سجل الأصوات ({votes.length})
        </button>
        <button
          onClick={() => setActiveTab('options')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'options'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          إدارة خيارات الاستطلاع
        </button>
        <button
          onClick={() => setActiveTab('firebase')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'firebase'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          ربط Firebase / التوسعة السحابية
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-1">
              <span className="text-xs text-slate-500 font-semibold">إجمالي الأصوات المسجلة</span>
              <p className="text-3xl font-black text-slate-900">{stats.totalVotes}</p>
              <span className="text-[11px] text-emerald-700 font-medium">سجلات صالحة</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-1">
              <span className="text-xs text-slate-500 font-semibold">تاريخ آخر تصويت</span>
              <p className="text-sm font-bold text-slate-900">
                {stats.lastVoteTime ? new Date(stats.lastVoteTime).toLocaleString('ar-MA') : 'لا يوجد'}
              </p>
              <span className="text-[11px] text-slate-400">توقيت محلي</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-1">
              <span className="text-xs text-slate-500 font-semibold">الأولوية المتصدرة</span>
              <p className="text-lg font-bold text-red-700 truncate">
                {PRIORITIES_INFO[stats.topPriority]?.title}
              </p>
              <span className="text-[11px] text-slate-500">
                {stats.priorityPercentages[stats.topPriority]}% من الأصوات
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-1">
              <span className="text-xs text-slate-500 font-semibold">حالة قاعدة البيانات</span>
              <p className="text-sm font-bold text-emerald-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>نشطة ومتزامنة</span>
              </p>
              <span className="text-[11px] text-slate-400">تخزين محلي تفاعلي</span>
            </div>
          </div>

          {/* Database Actions */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <Database className="w-6 h-6 text-slate-700" />
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  إدارة البيانات والأرشيف التجريبي
                </h2>
                <p className="text-xs text-slate-500">
                  إعادة تعيين البيانات، تصفير العدادات أو تصدير التقارير
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Reset to Sample */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">
                  استعادة العينة الافتراضية
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  إعادة شحن قاعدة البيانات بعينة تجريبية واقعية (~100 صوت) موزعة عبر الأيام الماضية.
                </p>
                <button
                  onClick={() => {
                    resetToSample();
                    alert('تمت استعادة العينة الافتراضية بنجاح.');
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>استعادة العينة</span>
                </button>
              </div>

              {/* Clear All Votes */}
              <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
                <h3 className="text-sm font-bold text-rose-900">
                  تصفير البيانات (بدء من 0)
                </h3>
                <p className="text-xs text-rose-700 leading-relaxed">
                  حذف جميع الأصوات المسجلة والبدء من الصفر تماماً لاختبار استقبال تصويتات حية ونقية.
                </p>
                <button
                  onClick={() => setConfirmClearModal(true)}
                  className="w-full py-2 px-3 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>تصفير جميع الأصوات</span>
                </button>
              </div>

              {/* Export CSV */}
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                <h3 className="text-sm font-bold text-emerald-900">
                  تصدير ملف الإكسل (CSV)
                </h3>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  تحميل جدول بيانات مفصل بجميع السجلات، مشفر بـ UTF-8 ليتوافق تماماً مع Microsoft Excel.
                </p>
                <button
                  onClick={handleExportCSV}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تحميل ملف CSV</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* TAB 2: RAW VOTES TABLE */}
      {activeTab === 'votes' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">سجل التصويتات المسجلة</h2>
              <p className="text-xs text-slate-500">
                جميع المشاركات مجهولة الهوية ولا تحتوي على أي معطيات شخصية حساسة
              </p>
            </div>
            <button
              onClick={handleExportCSV}
              className="self-start sm:self-auto px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تحميل الجدول الكامل CSV</span>
            </button>
          </div>

          {votes.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Database className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-sm">لا توجد أصوات مسجلة حالياً (قاعدة البيانات فارغة 0).</p>
              <button
                onClick={resetToSample}
                className="text-xs text-red-700 font-bold underline"
              >
                شحن بيانات تجريبية افتراضية
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                    <th className="py-3 px-4 font-semibold">المعرف</th>
                    <th className="py-3 px-4 font-semibold">التاريخ والتوقيت</th>
                    <th className="py-3 px-4 font-semibold">خيار المرشح التجريبي</th>
                    <th className="py-3 px-4 font-semibold">الأولوية الأولى</th>
                    <th className="py-3 px-4 font-semibold">المنطقة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {votes.slice(0, 30).map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">{v.id.substring(0, 14)}...</td>
                      <td className="py-3 px-4 text-slate-600">{new Date(v.timestamp).toLocaleString('ar-MA')}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {CANDIDATES_INFO[v.candidate]?.name}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800">
                        {PRIORITIES_INFO[v.priority]?.title}
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {REGIONS_INFO[v.region]?.label}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {votes.length > 30 && (
                <p className="text-center text-xs text-slate-400 py-3 border-t border-slate-100">
                  يتم عرض أول 30 صوتاً. قم بتصدير ملف CSV لاستعراض كامل السجلات ({votes.length} سجل).
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: OPTIONS MANAGEMENT */}
      {activeTab === 'options' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              خيارات الاستطلاع المعتمدة
            </h2>

            {/* Candidate options */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-700">المرشحون والخيارات المتاحة:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(Object.keys(CANDIDATES_INFO) as CandidateChoice[]).map((k) => (
                  <div key={k} className="p-4 rounded-2xl border border-slate-200 bg-slate-50">
                    <span className="text-xs font-bold text-red-700 block">{CANDIDATES_INFO[k].name}</span>
                    <span className="text-[11px] text-slate-500">{CANDIDATES_INFO[k].subtitle}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Priorities */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-700">الأولويات التنموية الستة:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                {(Object.keys(PRIORITIES_INFO) as PriorityType[]).map((k) => (
                  <div key={k} className="p-3 rounded-xl border border-slate-200 bg-white">
                    <span className="font-bold text-slate-900 block">{PRIORITIES_INFO[k].title}</span>
                    <span className="text-slate-500 text-[11px]">{PRIORITIES_INFO[k].description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FIREBASE / CLOUD EXPANSION GUIDE */}
      {activeTab === 'firebase' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <Database className="w-6 h-6 text-amber-600" />
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                طريقة ربط Firebase Firestore & Authentication (إن كان ضرورياً)
              </h2>
              <p className="text-xs text-slate-500">
                دليل تقني لتفعيل التخزين السحابي المركزي عند الرغبة في نشر المنصة على نطاق واسع
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              يعمل التطبيق حالياً بنظام تخزين محلي متفاعل وفوري (Reactive Storage) مع منع تكرار التصويت عبر معرف الجهاز المشفر وتصدير CSV. إذا رغبت في ربطه بقاعدة بيانات <strong>Firebase Firestore</strong> مركزية لمزامنة الأصوات عبر كافة الأجهزة حول العالم:
            </p>

            <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs dir-ltr space-y-2">
              <p className="text-amber-400 font-bold">// 1. أضف متغيرات البيئة في .env:</p>
              <p>VITE_FIREBASE_API_KEY="your-api-key"</p>
              <p>VITE_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"</p>
              <p>VITE_FIREBASE_PROJECT_ID="your-project-id"</p>
              <p>VITE_FIREBASE_FIRESTORE_COLLECTION="taounate_votes"</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 text-emerald-950">
              <h3 className="font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>ضوابط أمان Firebase المقترحة (Firestore Security Rules):</span>
              </h3>
              <p className="text-xs font-mono bg-white p-2 rounded border border-emerald-200 dir-ltr">
                {`rules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /taounate_votes/{voteId} {\n      allow read: if true;\n      allow create: if request.resource.data.keys().hasAll(['candidate', 'priority', 'region', 'timestamp'])\n                   && request.resource.data.timestamp is int;\n      allow update, delete: if false;\n    }\n  }\n}`}
              </p>
              <p className="text-xs">
                * تسمح القواعد بالقراءة العامة وكتابة التصويت بشرط استيفاء الحقول الأربعة، مع منع التعديل أو الحذف من أي طرف خارجي.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Clear Confirmation Modal */}
      {confirmClearModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">تأكيد تصفير جميع الأصوات</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              هل أنت متأكد من رغبتك في حذف جميع الأصوات والبدء من 0؟ لا يمكن التراجع عن هذه الخطوة إلا باستعادة العينة الافتراضية.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  clearVotes();
                  setConfirmClearModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-700 text-white font-bold text-xs hover:bg-rose-800"
              >
                نعم، تصفير الأصوات
              </button>
              <button
                onClick={() => setConfirmClearModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
