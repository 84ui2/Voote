import React from 'react';
import { 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';
import { PageId } from '../components/Header';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { usePoll } from '../hooks/usePoll';
import { CANDIDATES_INFO, PRIORITIES_INFO, REGIONS_INFO } from '../data/pollData';
import { CandidateChoice, PriorityType, RegionType } from '../types';
import { 
  PieChart as PieIcon, 
  Users, 
  Award, 
  MapPin, 
  Clock, 
  RefreshCw, 
  AlertCircle, 
  Vote,
  Sparkles
} from 'lucide-react';

interface ResultsPageProps {
  onNavigate: (page: PageId) => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ onNavigate }) => {
  const { stats, refresh, userVoted } = usePoll('all');

  // Prepare Candidates Data for Donut Chart
  const candidateChartData = [
    {
      name: CANDIDATES_INFO.abdeldayem.name,
      value: stats.candidateCounts.abdeldayem,
      percentage: stats.candidatePercentages.abdeldayem,
      color: '#b91c1c', // Moroccan Red
    },
    {
      name: CANDIDATES_INFO.other.name,
      value: stats.candidateCounts.other,
      percentage: stats.candidatePercentages.other,
      color: '#15803d', // Moroccan Green
    },
    {
      name: CANDIDATES_INFO.undecided.name,
      value: stats.candidateCounts.undecided,
      percentage: stats.candidatePercentages.undecided,
      color: '#64748b', // Slate
    },
  ];

  // Prepare Priorities Data for Bar Chart
  const priorityChartData = (Object.keys(PRIORITIES_INFO) as PriorityType[]).map((key) => ({
    name: PRIORITIES_INFO[key].shortLabel,
    count: stats.priorityCounts[key],
    percentage: stats.priorityPercentages[key],
    color: PRIORITIES_INFO[key].color,
  }));

  // Prepare Regions Data
  const regionChartData = (Object.keys(REGIONS_INFO) as RegionType[]).map((key) => ({
    name: REGIONS_INFO[key].label,
    count: stats.regionCounts[key],
    percentage: stats.regionPercentages[key],
  }));

  const candidateKeys: CandidateChoice[] = ['abdeldayem', 'other', 'undecided'];
  const priorityKeys: PriorityType[] = ['roads', 'water', 'education', 'health', 'employment', 'agriculture'];
  const regionKeys: RegionType[] = ['taounate_city', 'village_douar', 'commune_center', 'other_provincial', 'prefer_not_to_say'];

  return (
    <div className="space-y-12 py-6 sm:py-10 max-w-7xl mx-auto">
      
      {/* Header & Quick Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>تحديث آني مباشر</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            نتائج الاستطلاع
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            بيانات محينة تعكس إجمالي المشاركات المسجلة في استطلاع رأي إقليم تاونات
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refresh()}
            className="p-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            title="تحديث البيانات"
          >
            <RefreshCw className="w-4 h-4 text-slate-500" />
            <span>تحديث النتائج</span>
          </button>

          {!userVoted && (
            <button
              onClick={() => onNavigate('vote')}
              className="px-5 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              <Vote className="w-4 h-4" />
              <span>صوت الآن</span>
            </button>
          )}
        </div>
      </div>

      {/* Mandatory Official Disclaimer Callout */}
      <div 
        id="results-disclaimer-banner"
        className="rounded-2xl bg-amber-500/10 border-2 border-amber-400 p-4 flex items-center gap-3 text-amber-950 font-bold text-sm sm:text-base shadow-xs"
      >
        <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
        <span>الأرقام المعروضة استطلاعية وتجريبية وليست نتائج انتخابية رسمية.</span>
      </div>

      {/* 4 Statistical Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-700 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold block">عدد المشاركين</span>
            <span className="text-2xl font-black text-slate-900">
              {stats.totalVotes.toLocaleString('ar-MA')} <span className="text-xs font-normal text-slate-500">صوت</span>
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div className="truncate">
            <span className="text-xs text-slate-500 font-semibold block">الأولوية الأولى للإقليم</span>
            <span className="text-lg font-black text-slate-900 truncate block">
              {PRIORITIES_INFO[stats.topPriority]?.title}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <PieIcon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold block">خيار عبد الدايم الحدوشي</span>
            <span className="text-2xl font-black text-slate-900">
              {stats.candidatePercentages.abdeldayem}%
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold block">تاريخ آخر تصويت</span>
            <span className="text-xs font-bold text-slate-900">
              {stats.lastVoteTime ? new Date(stats.lastVoteTime).toLocaleTimeString('ar-MA', { hour: '2-digit', minute: '2-digit' }) : 'لا يوجد بعد'}
            </span>
            <span className="text-[10px] text-slate-400 block">
              {stats.lastVoteTime ? new Date(stats.lastVoteTime).toLocaleDateString('ar-MA') : '-'}
            </span>
          </div>
        </div>

      </div>

      {/* Row 1: Candidate Choices (Donut Chart + Progress Bars) */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-700" />
              <span>نتائج اختيار ممثل تاونات (سيناريو استطلاع تجريبي)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              نسبة كل اختيار بين المشاركين في الاستطلاع
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 self-start sm:self-auto">
            مجموع الخيارات: 100%
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Donut Chart */}
          <div className="lg:col-span-5 h-64 sm:h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={candidateChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={105}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {candidateChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any, name: any, props: any) => [
                    `${value} صوت (${props.payload.percentage}%)`,
                    name,
                  ]}
                  contentStyle={{ direction: 'rtl', borderRadius: '12px', textAlign: 'right' }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>

          {/* Cards & Progress Bars for each candidate */}
          <div className="lg:col-span-7 space-y-4">
            {candidateKeys.map((key) => {
              const info = CANDIDATES_INFO[key];
              const count = stats.candidateCounts[key];
              const pct = stats.candidatePercentages[key];

              return (
                <div
                  key={key}
                  className="rounded-2xl border border-slate-200/90 p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full shrink-0"
                        style={{ backgroundColor: info.color }}
                      />
                      <div>
                        <span className="font-bold text-slate-900 text-sm sm:text-base block">
                          {info.name}
                        </span>
                        <span className="text-[11px] text-slate-500 block">
                          {info.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="text-left shrink-0">
                      <span className="text-lg font-black text-slate-900 block">
                        {pct}%
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {count} أصوات
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-3 rounded-full bg-slate-200/80 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${Math.min(100, Math.max(1, pct))}%`,
                        backgroundColor: info.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Row 2: Priorities Percentages (Bar Chart + Progress Bars) */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-sky-600" />
            <span>نسبة الأولويات التنموية بتاونات</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            ترتيب القضايا حسب نسبة اختيار المشاركين كأولوية أولى
          </p>
        </div>

        {/* Bar Chart */}
        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priorityChartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#475569' }} />
              <YAxis tick={{ fontSize: 11, fill: '#475569' }} unit="%" />
              <Tooltip
                formatter={(value: any, name: any, props: any) => [
                  `${props.payload.count} صوت (${value}%)`,
                  'نسبة التأييد',
                ]}
                contentStyle={{ direction: 'rtl', borderRadius: '12px', textAlign: 'right' }}
              />
              <Bar dataKey="percentage" fill="#b91c1c" radius={[6, 6, 0, 0]}>
                {priorityChartData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Progress Grid for 6 Priorities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          {priorityKeys.map((pKey) => {
            const info = PRIORITIES_INFO[pKey];
            const count = stats.priorityCounts[pKey];
            const pct = stats.priorityPercentages[pKey];

            return (
              <div key={pKey} className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/40 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800">{info.title}</span>
                  <span className="text-slate-900">{pct}% ({count} صوت)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, Math.max(1, pct))}%`,
                      backgroundColor: info.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Row 3: Regional Distribution */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-700" />
            <span>توزيع المشاركين حسب المنطقة داخل الإقليم</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            نسبة المشاركات الواردة من مدينة تاونات والقرى والمراكز القروية
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {regionKeys.map((rKey) => {
            const info = REGIONS_INFO[rKey];
            const count = stats.regionCounts[rKey];
            const pct = stats.regionPercentages[rKey];

            return (
              <div
                key={rKey}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-4 text-center space-y-2"
              >
                <span className="text-xs font-bold text-slate-700 block truncate">
                  {info.label}
                </span>
                <span className="text-2xl font-black text-slate-900 block">
                  {pct}%
                </span>
                <span className="text-[11px] text-slate-500 block">
                  {count} مشارك
                </span>
                <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden mt-1">
                  <div
                    className="h-full rounded-full bg-emerald-700"
                    style={{ width: `${Math.min(100, Math.max(2, pct))}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer Navigation CTA */}
      <div className="text-center pt-4">
        <button
          onClick={() => onNavigate('statistics')}
          className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm inline-flex items-center gap-2 transition-all"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>الانتقال إلى لوحة الإحصائيات المتقدمة والفلترة الزمنية</span>
        </button>
      </div>

    </div>
  );
};
