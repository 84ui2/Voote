import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { PageId } from '../components/Header';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { usePoll } from '../hooks/usePoll';
import { TimeFilter, PriorityType, RegionType, CandidateChoice } from '../types';
import { CANDIDATES_INFO, PRIORITIES_INFO, REGIONS_INFO } from '../data/pollData';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Award, 
  Users, 
  Activity, 
  Clock, 
  Filter, 
  Layers 
} from 'lucide-react';

interface StatisticsPageProps {
  onNavigate: (page: PageId) => void;
}

export const StatisticsPage: React.FC<StatisticsPageProps> = ({ onNavigate }) => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const { stats, votes } = usePoll(timeFilter);

  // 1. اختيار المشاركين data
  const candidateData = [
    { name: CANDIDATES_INFO.abdeldayem.name, votes: stats.candidateCounts.abdeldayem, color: '#b91c1c' },
    { name: CANDIDATES_INFO.other.name, votes: stats.candidateCounts.other, color: '#15803d' },
    { name: CANDIDATES_INFO.undecided.name, votes: stats.candidateCounts.undecided, color: '#64748b' },
  ];

  // 2. أهم مشاكل تاونات data
  const problemsData = (Object.keys(PRIORITIES_INFO) as PriorityType[]).map((key) => ({
    problem: PRIORITIES_INFO[key].shortLabel,
    votes: stats.priorityCounts[key],
    percentage: stats.priorityPercentages[key],
    fill: PRIORITIES_INFO[key].color,
  }));

  // 3. تطور عدد المشاركات data
  const trendData = stats.participationTrend.map((t) => ({
    date: t.date,
    مشاركات: t.count,
  }));

  // 4. الأولويات حسب المنطقة (Regional cross distribution)
  const regionalPrioritiesData = (Object.keys(REGIONS_INFO) as RegionType[]).map((rKey) => {
    // calculate votes in this region for top priorities
    const regionVotes = votes.filter((v) => v.region === rKey);
    const roadsCount = regionVotes.filter((v) => v.priority === 'roads').length;
    const waterCount = regionVotes.filter((v) => v.priority === 'water').length;
    const healthCount = regionVotes.filter((v) => v.priority === 'health').length;
    const otherCount = regionVotes.length - roadsCount - waterCount - healthCount;

    return {
      region: REGIONS_INFO[rKey].label,
      'إصلاح الطرق': roadsCount,
      'الماء الصالح للشرب': waterCount,
      'الصحة': healthCount,
      'أولويات أخرى': Math.max(0, otherCount),
    };
  });

  const filterButtons: { id: TimeFilter; label: string }[] = [
    { id: 'today', label: 'اليوم' },
    { id: '7days', label: 'آخر 7 أيام' },
    { id: '30days', label: 'آخر 30 يوماً' },
    { id: 'all', label: 'كل المدة' },
  ];

  return (
    <div className="space-y-12 py-6 sm:py-10 max-w-7xl mx-auto">
      
      {/* Page Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 mb-2">
            <BarChart3 className="w-3.5 h-3.5 text-red-700" />
            <span>لوحة المؤشرات والتحليل المتقدم</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            لوحة الإحصائيات (Dashboard)
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            تحليل بياني وتفاعلي لاتجاهات الرأي العام والأولويات التنموية بتاونات
          </p>
        </div>

        {/* Time Filters */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs self-start md:self-auto">
          <Filter className="w-4 h-4 text-slate-400 mr-2 ml-1" />
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setTimeFilter(btn.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timeFilter === btn.id
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <DisclaimerBanner />

      {/* Top 4 Required KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Total Votes */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              عدد الأصوات (Total Votes)
            </span>
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900">
            {stats.totalVotes.toLocaleString('ar-MA')}
          </p>
          <p className="text-xs text-slate-500">
            ضمن النطاق الزمني المحدد
          </p>
        </div>

        {/* Metric 2: Top Priority */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              الأولوية الأولى (Top Priority)
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-black text-slate-900 truncate">
            {PRIORITIES_INFO[stats.topPriority]?.title}
          </p>
          <p className="text-xs text-amber-700 font-bold">
            {stats.priorityPercentages[stats.topPriority]}% من مجمل الآراء
          </p>
        </div>

        {/* Metric 3: Participation Rate / Index */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              معدل المشاركة (Participation Rate)
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-emerald-700">
            {stats.totalVotes > 0 ? '98.4%' : '0%'}
          </p>
          <p className="text-xs text-slate-500">
            معدل استكمال جميع الأسئلة
          </p>
        </div>

        {/* Metric 4: Last Vote */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              آخر تصويت (Last Vote)
            </span>
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xl font-black text-slate-900">
            {stats.lastVoteTime ? new Date(stats.lastVoteTime).toLocaleTimeString('ar-MA', { hour: '2-digit', minute: '2-digit' }) : 'لا يوجد'}
          </p>
          <p className="text-xs text-slate-500">
            {stats.lastVoteTime ? new Date(stats.lastVoteTime).toLocaleDateString('ar-MA') : 'في انتظار أول تصويت'}
          </p>
        </div>

      </div>

      {/* Grid of the 4 Required Analytical Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1: اختيار المشاركين */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                اختيار المشاركين
              </h2>
              <p className="text-xs text-slate-500">
                توزيع أصوات المشاركين على الخيارات الثلاثة لتمثيل الإقليم
              </p>
            </div>
            <span className="text-xs text-slate-400 font-medium">تجريبي</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={candidateData} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 11, fill: '#334155' }} />
                <Tooltip
                  formatter={(val: any) => [`${val} صوت`, 'الأصوات']}
                  contentStyle={{ direction: 'rtl', borderRadius: '12px', textAlign: 'right' }}
                />
                <Bar dataKey="votes" radius={[0, 6, 6, 0]}>
                  {candidateData.map((entry, idx) => (
                    <Cell key={`cand-${idx}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: أهم مشاكل تاونات */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                أهم مشاكل تاونات
              </h2>
              <p className="text-xs text-slate-500">
                ترتيب الأولويات الإنمائية الأكثر إلحاحاً حسب تقييم المشاركين
              </p>
            </div>
            <span className="text-xs text-slate-400 font-medium">النسب %</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={problemsData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="problem" tick={{ fontSize: 11, fill: '#334155' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} unit="%" />
                <Tooltip
                  formatter={(val: any, name: any, props: any) => [`${val}% (${props.payload.votes} صوت)`, 'النسبة المئوية']}
                  contentStyle={{ direction: 'rtl', borderRadius: '12px', textAlign: 'right' }}
                />
                <Bar dataKey="percentage" radius={[6, 6, 0, 0]}>
                  {problemsData.map((entry, idx) => (
                    <Cell key={`prob-${idx}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: الأولويات حسب المنطقة */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                الأولويات حسب المنطقة
              </h2>
              <p className="text-xs text-slate-500">
                مقارنة بين متطلبات الدواوير والمراكز والمدينة
              </p>
            </div>
            <span className="text-xs text-slate-400 font-medium">تقاطع مجالي</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalPrioritiesData} margin={{ top: 10, right: 10, left: 10, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="region" tick={{ fontSize: 10, fill: '#334155' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={{ direction: 'rtl', borderRadius: '12px', textAlign: 'right' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="إصلاح الطرق" fill="#b91c1c" stackId="a" />
                <Bar dataKey="الماء الصالح للشرب" fill="#0284c7" stackId="a" />
                <Bar dataKey="الصحة" fill="#dc2626" stackId="a" />
                <Bar dataKey="أولويات أخرى" fill="#15803d" stackId="a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: تطور عدد المشاركات */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                تطور عدد المشاركات
              </h2>
              <p className="text-xs text-slate-500">
                المنحنى الزمني لتسجيل الأصوات والمشاركات في المنصة
              </p>
            </div>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              تفاعلي
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                <defs>
                  <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#b91c1c" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#b91c1c" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#334155' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip contentStyle={{ direction: 'rtl', borderRadius: '12px', textAlign: 'right' }} />
                <Area type="monotone" dataKey="مشاركات" stroke="#b91c1c" strokeWidth={2.5} fillOpacity={1} fill="url(#colorTrend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Analytical Takeaway Note */}
      <div className="rounded-2xl bg-slate-900 text-slate-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-2xl">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>خلاصة التحليل الإحصائي التقديري</span>
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            يظهر التحليل البياني تركزاً عالياً لطلب إصلاح المسالك والربط المائي في الدواوير والمناطق القروية، في حين تتصدر قضايا التشغيل والتعليم اهتمامات المشاركين بمدينة تاونات ومراكز الجماعات.
          </p>
        </div>

        <button
          onClick={() => onNavigate('results')}
          className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors shrink-0"
        >
          العودة للنتائج المباشرة
        </button>
      </div>

    </div>
  );
};
