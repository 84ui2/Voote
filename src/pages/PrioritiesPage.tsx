import React from 'react';
import { PageId } from '../components/Header';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { PriorityCard } from '../components/PriorityCard';
import { PRIORITIES_INFO } from '../data/pollData';
import { PriorityType } from '../types';
import { usePoll } from '../hooks/usePoll';
import { Compass, Vote, CheckCircle2, TrendingUp, HelpCircle } from 'lucide-react';

interface PrioritiesPageProps {
  onNavigate: (page: PageId) => void;
  onPreselectPriority?: (priority: PriorityType) => void;
}

export const PrioritiesPage: React.FC<PrioritiesPageProps> = ({ onNavigate, onPreselectPriority }) => {
  const { stats } = usePoll('all');
  const priorityKeys: PriorityType[] = ['roads', 'water', 'education', 'health', 'employment', 'agriculture'];

  const handleSelectPriority = (p: PriorityType) => {
    if (onPreselectPriority) {
      onPreselectPriority(p);
    }
    onNavigate('vote');
  };

  return (
    <div className="space-y-12 py-6 sm:py-10 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold border border-red-200">
          <Compass className="w-4 h-4" />
          <span>التشخيص التنموي لإقليم تاونات</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          أولويات تاونات: المحاور الستة الكبرى
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          استناداً إلى احتياجات الساكنة المعبر عنها في مختلف جماعات ودواوير الإقليم، نضع بين أيديكم تحليلاً مفصلاً للأولويات الست التي تشكل عصب النهوض بتاونات.
        </p>
      </div>

      <DisclaimerBanner />

      {/* Priority Cards Grid with Live Percentages & Action Buttons */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-red-700" />
            <span>ترتيب الأولويات وفق تصويت المشاركين</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            محدث آنياً بحسب قاعدة بيانات الاستطلاع
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {priorityKeys.map((key) => (
            <PriorityCard
              key={key}
              priorityKey={key}
              votePercentage={stats.priorityPercentages[key]}
              voteCount={stats.priorityCounts[key]}
              showVoteAction={true}
              onSelectForVote={handleSelectPriority}
            />
          ))}
        </div>
      </div>

      {/* Deep-Dive Analytical Section */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-8">
        <h2 className="text-2xl font-black text-slate-900">
          لماذا هذه المحاور تحديداً؟
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-600 leading-relaxed">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
              <CheckCircle2 className="w-5 h-5 text-red-700 shrink-0" />
              <span>الطرق والمسالك: فك العزلة كمدخل لأي تنمية</span>
            </div>
            <p>
              تتميز جغرافيا إقليم تاونات بطابع جبلي معقد يضم مئات الدواوير المتباعدة. ربط هذه الدواوير بالمراكز الصحية والمؤسسات التعليمية والأسواق الأسبوعية يظل المطلب الأكثر إلحاحاً لإيقاف النزوح القروي وتنشيط الدورة الاقتصادية.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
              <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0" />
              <span>الماء الصالح للشرب: مفارقة السدود والعطش</span>
            </div>
            <p>
              رغم احتضان إقليم تاونات لأحد أكبر السدود في إفريقيا (سد الوحدة) إلى جانب سدود أخرى، فإن العديد من الدواوير لا تزال تعاني من إجهاد مائي وضعف شبكات الإيصال المنزلي، ما يجعل تأمين الربط بالماء حقاً لا يحتمل التأجيل.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
              <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
              <span>التعليم والتأهيل المدرسي: حماية مستقبل الناشئة</span>
            </div>
            <p>
              محاربة الهدر المدرسي وخاصة لدى الفتيات القرويات، وتوفير النقل المدرسي وداخليات مجهزة، وإصلاح المدارس الفرعية وتزويدها بالتدفئة في فصل الشتاء الجبلي القارس، ركيزة أساسية لأي نهضة حقيقية.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>الفلاحة والتشغيل: تنويع مصادر الدخل القروي</span>
            </div>
            <p>
              تشجيع زراعة الزيتون وتثمينه عبر وحدات عصر عصرية، ودعم الزراعات البديلة ذات القيمة المضافة، وتحفيز الشباب المقاول على الاستقرار في الإقليم من خلال حزم تمويلية موجهة.
            </p>
          </div>
        </div>

        {/* CTA to vote */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
            <span>لديك وجهة نظر أخرى؟ يمكنك تحديد أولويتك في استمارة التصويت التجريبية.</span>
          </div>
          <button
            onClick={() => onNavigate('vote')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Vote className="w-4 h-4" />
            <span>شارك برأيك في التصويت الآن</span>
          </button>
        </div>
      </section>

    </div>
  );
};
