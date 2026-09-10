import React from 'react';
import { PageId } from '../components/Header';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { 
  Info, 
  ShieldCheck, 
  MapPin, 
  Target, 
  HelpCircle, 
  Vote, 
  CheckCircle2, 
  FileText, 
  AlertTriangle 
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 py-6 sm:py-10 max-w-5xl mx-auto">
      
      {/* Top Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
          <Info className="w-4 h-4 text-red-700" />
          <span>الوثيقة الإطار والتعريف بالمشروع</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          حول منصة "تاونات تستحق الأفضل"
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          مشروع تجريبي مستقل لمحاكاة استطلاع رأي رقمي حول الأولويات التنموية والمستقبل المحلي لإقليم تاونات.
        </p>
      </div>

      <DisclaimerBanner />

      {/* Main Narrative Content */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-10">
        
        {/* Section 1: Core Objective */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-700 flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              سياق المشروع وأهدافه
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            يأتي هذا المشروع كمنصة رقمية مواطنة تجريبية تهدف إلى محاكاة استطلاع الرأي العام المحلي بإقليم تاونات. يسعى الاستطلاع إلى تسليط الضوء على الانتظارات الكبرى للساكنة، ولا سيما في مجالات البنية التحتية، والماء الصالح للشرب، والصحة، والتعليم، والتشغيل، ودعم الفلاحة القروية.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            المشروع ليس حملة انتخابية رسمية ولا يتبع لأي مؤسسة دستورية أو حزبية، بل يقدم نموذجاً تقنياً معاصراً لكيفية إشراك المواطنين في التعبير عن أولوياتهم بطريقة تفاعلية، شفافة ومحترمة لمعايير الخصوصية.
          </p>
        </section>

        {/* Section 2: Framework & Neutrality */}
        <section className="space-y-4 border-t border-slate-100 pt-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              الحياد والضوابط القانونية
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>طبيعة الشخصيات والخيارات</span>
              </h3>
              <p>
                تم إدراج اسم "عبد الدايم الحدوشي" ضمن سيناريو الاستطلاع التجريبي لقياس التفاعل المحلي، مع توفير خيارات بديلة محايدة ("مرشح آخر"، "لم أحسم اختياري") لضمان الحياد والموضوعية التامة.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>استقلالية تامة عن المؤسسات</span>
              </h3>
              <p>
                الموقع لا يدّعي ولا يمثل وزارة الداخلية، ولا اللجنة الوطنية للإشراف على الانتخابات، ولا الهياكل الرسمية لحزب الاستقلال. النتائج المنشورة ذات طابع استطلاعي وتجريبي محض.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Data & Privacy Policy */}
        <section className="space-y-4 border-t border-slate-100 pt-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              سياسة الخصوصية وحماية المعطيات
            </h2>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            احتراماً للخصوصية وللقانون المغربي رقم 09-08 المتعلق بحماية الأشخاص الذاتيين تجاه معالجة المعطيات ذات الطابع الشخصي:
          </p>

          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc list-inside pr-2">
            <li>لا نطلب إدخال الأسماء أو الألقاب العائلية أو رقم بطاقة التعريف الوطنية (CIN).</li>
            <li>لا نطلب أرقام الهواتف أو العناوين البريدية أو الحسابات الاجتماعية.</li>
            <li>تستخدم المنصة معرفات تقنية مجهولة محلياً (Device Tokens) لمنع تكرار التصويت العشوائي.</li>
            <li>جميع الأصوات تسجل مشفرة ومصنفة بحسب النطاق الجغرافي العام للإقليم فقط.</li>
          </ul>
        </section>

        {/* Section 4: About Taounate Province */}
        <section className="space-y-4 border-t border-slate-100 pt-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              إقليم تاونات: طاقات واعدة وتحديات تنموية
            </h2>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            يقع إقليم تاونات في مقدمة جبال الريف بجهة فاس - مكناس، ويتميز بغطاء نباتي متنوع وموارد مائية استراتيجية تشمل سد الوحدة وسدوداً أخرى، فضلاً عن ثروة فلاحية تعتمد أساساً على أشجار الزيتون والتين والحبوب.
          </p>

          <p className="text-sm text-slate-600 leading-relaxed">
            ورغم هذه المؤهلات، تواجه الساكنة تحديات تتعلق بوعورة التضاريس، وضرورة استكمال ربط الدواوير بالمسالك المعبدة وشبكات الماء الصالح للشرب، وتقوية المرافق الصحية والمدرسية، وخلق فرص عمل مستدامة للشباب للحد من الهجرة نحو المدن الكبرى.
          </p>
        </section>

        {/* Action Button */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
            <span>صوتك وتطلعاتك لبنة أساسية في نجاح هذه التجربة المواطنة.</span>
          </div>

          <button
            onClick={() => onNavigate('vote')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Vote className="w-4 h-4" />
            <span>شارك الآن في الاستطلاع التجريبي</span>
          </button>
        </div>

      </div>

    </div>
  );
};
