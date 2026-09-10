import React from 'react';
import { PageId } from '../components/Header';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { TaounateHeroIllustration } from '../components/TaounateHeroIllustration';
import { PriorityCard } from '../components/PriorityCard';
import { SloganCard } from '../components/SloganCard';
import { PartySection } from '../components/PartySection';
import { SLOGANS_DATA, PRIORITIES_INFO } from '../data/pollData';
import { PriorityType } from '../types';
import { usePoll } from '../hooks/usePoll';
import { 
  Vote, 
  PieChart, 
  Users, 
  Award, 
  CheckCircle, 
  ArrowLeft, 
  TrendingUp, 
  Sparkles, 
  MapPin 
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { stats, userVoted } = usePoll('all');

  const priorityKeys: PriorityType[] = ['roads', 'water', 'education', 'health', 'employment', 'agriculture'];

  return (
    <div className="space-y-16 py-6 sm:py-10">
      
      {/* 1. Hero Section */}
      <section id="hero-section" className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left / Arabic Right text block */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-red-800 text-xs sm:text-sm font-bold">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              <span>محاكاة استطلاع رأي إقليم تاونات {new Date().getFullYear()}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              صوت تاونات... <br />
              <span className="text-red-700 bg-gradient-to-l from-red-700 via-red-800 to-amber-700 bg-clip-text text-transparent">
                من أجل مستقبل أفضل
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              استطلاع رأي تجريبي يتيح لسكان تاونات التعبير عن أولوياتهم وتصورهم لمستقبل الإقليم.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-vote-btn"
                onClick={() => onNavigate('vote')}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white font-bold text-base shadow-lg shadow-red-900/25 hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Vote className="w-5 h-5 text-amber-300" />
                <span>{userVoted ? 'عرض خيارات استطلاعك' : 'شارك في الاستطلاع'}</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                id="hero-results-btn"
                onClick={() => onNavigate('results')}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white border border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-base shadow-sm hover:shadow transition-all hover:bg-slate-50"
              >
                <PieChart className="w-5 h-5 text-emerald-700" />
                <span>شاهد النتائج</span>
              </button>
            </div>

            {/* Quick highlight micro bar */}
            <div className="pt-4 border-t border-slate-200/80 flex items-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>تصويت مجهول الهوية 100%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>نتائج وإحصائيات فورية</span>
              </div>
            </div>
          </div>

          {/* Right / Visual Illustration representing Taounate Rif Mountains & Reservoir */}
          <div className="lg:col-span-6">
            <TaounateHeroIllustration />
          </div>

        </div>
      </section>

      {/* 2. Top prominent Legal Disclaimer */}
      <DisclaimerBanner />

      {/* 3. Live Indicator Numbers Ribbon */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-700/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-slate-700/60">
          
          <div className="pt-4 md:pt-0">
            <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs font-semibold mb-1">
              <Users className="w-4 h-4 text-amber-400" />
              <span>إجمالي الأصوات التجريبية</span>
            </div>
            <p className="text-3xl sm:text-4xl font-black text-white">
              {stats.totalVotes.toLocaleString('ar-MA')}
            </p>
            <p className="text-[11px] text-emerald-400 font-medium mt-1">مشاركة مواطنة نشطة</p>
          </div>

          <div className="pt-4 md:pt-0">
            <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs font-semibold mb-1">
              <Award className="w-4 h-4 text-red-400" />
              <span>الأولوية الأكثر طلباً</span>
            </div>
            <p className="text-xl sm:text-2xl font-black text-amber-300 truncate px-2">
              {PRIORITIES_INFO[stats.topPriority]?.title || 'إصلاح الطرق'}
            </p>
            <p className="text-[11px] text-slate-400 font-medium mt-1">
              بنسبة {stats.priorityPercentages[stats.topPriority] || 0}% من المشاركين
            </p>
          </div>

          <div className="pt-4 md:pt-0">
            <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs font-semibold mb-1">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>خيار المرشح التجريبي</span>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white">
              {stats.candidatePercentages.abdeldayem}%
            </p>
            <p className="text-[11px] text-slate-400 font-medium mt-1">عبد الدايم الحدوشي</p>
          </div>

          <div className="pt-4 md:pt-0">
            <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs font-semibold mb-1">
              <MapPin className="w-4 h-4 text-sky-400" />
              <span>تغطية المجالات الترابية</span>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-sky-300">
              5 مناطق
            </p>
            <p className="text-[11px] text-slate-400 font-medium mt-1">مدن، مراكز، ودواوير الإقليم</p>
          </div>

        </div>
      </section>

      {/* 4. Priorities Section ("ما الذي تحتاجه تاونات؟") */}
      <section id="priorities-section" className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>المحاور التنموية الستة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              ما الذي تحتاجه تاونات؟
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              حدد الاستطلاع 6 أولويات أساسية يطالب بها سكان إقليم تاونات لتحقيق تنمية شاملة وعادلة.
            </p>
          </div>

          <button
            onClick={() => onNavigate('priorities')}
            className="self-start md:self-auto text-sm font-bold text-red-700 hover:text-red-800 flex items-center gap-1.5 group"
          >
            <span>عرض تفاصيل جميع الأولويات</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6 Priority Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {priorityKeys.map((key) => (
            <PriorityCard
              key={key}
              priorityKey={key}
              votePercentage={stats.priorityPercentages[key]}
              voteCount={stats.priorityCounts[key]}
              showVoteAction={false}
            />
          ))}
        </div>
      </section>

      {/* 5. Party & Candidate Section (حزب الاستقلال) */}
      <PartySection onGoToVote={() => onNavigate('vote')} />

      {/* 6. Slogans Section (الشعارات) */}
      <section id="slogans-section" className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
            شعارات مقترحة لهذا المشروع التجريبي
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            شعارات من نبض الشارع والتطلعات المحلية
          </h2>
          <p className="text-sm text-slate-600">
            رسائل مكثفة تعكس المطالب الجوهرية لأبناء تاونات وقراها ومراكزها.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SLOGANS_DATA.map((slogan, idx) => (
            <SloganCard
              key={idx}
              index={idx}
              text={slogan.text}
              category={slogan.category}
              highlight={slogan.highlight}
            />
          ))}
        </div>

        <p className="text-center text-xs text-slate-400">
          * هذه الشعارات مقترحة لأغراض هذا المشروع التجريبي ومحاكاة الاستطلاع وليست شعارات رسمية معتمدة.
        </p>
      </section>

      {/* 7. Bottom Call To Action Banner */}
      <section className="rounded-3xl bg-gradient-to-br from-red-800 via-red-900 to-emerald-950 p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-5">
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-amber-300 backdrop-blur-sm">
            صوتك مهم ومسموع
          </span>
          <h2 className="text-2xl sm:text-4xl font-black leading-tight">
            هل أنت مستعد للتعبير عن أولويات إقليم تاونات؟
          </h2>
          <p className="text-sm sm:text-base text-red-100 leading-relaxed">
            المشاركة سهلة وسريعة ولا تتطلب إدخال أي معلومات شخصية أو حساسة. تستغرق أقل من 30 ثانية.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('vote')}
              className="px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
            >
              <Vote className="w-5 h-5 text-red-900" />
              <span>انتقل إلى صفحة التصويت الآن</span>
            </button>
            <button
              onClick={() => onNavigate('results')}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-sm border border-white/20 transition-colors"
            >
              استعراض الإحصائيات الكاملة
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
