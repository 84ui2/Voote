import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PageId } from '../components/Header';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { CandidateChoice, PriorityType, RegionType } from '../types';
import { CANDIDATES_INFO, PRIORITIES_INFO, REGIONS_INFO } from '../data/pollData';
import { castVote } from '../services/storageService';
import { usePoll } from '../hooks/usePoll';
import { InfoTooltip } from '../components/InfoTooltip';
import { 
  Vote, 
  CheckCircle, 
  AlertTriangle, 
  ArrowLeft, 
  ShieldCheck, 
  PieChart, 
  Sparkles, 
  RotateCcw,
  UserCheck,
  HelpCircle
} from 'lucide-react';

interface VotePageProps {
  onNavigate: (page: PageId) => void;
  preselectedPriority?: PriorityType;
}

export const VotePage: React.FC<VotePageProps> = ({ onNavigate, preselectedPriority }) => {
  const { userVoted, userVoteData, refresh, resetMyVote } = usePoll('all');

  const [candidate, setCandidate] = useState<CandidateChoice>('abdeldayem');
  const [priority, setPriority] = useState<PriorityType>(preselectedPriority || 'roads');
  const [region, setRegion] = useState<RegionType>('taounate_city');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    // Subtle simulated processing delay
    setTimeout(() => {
      const result = castVote(candidate, priority, region);
      setIsSubmitting(false);

      if (result.success) {
        setSubmissionSuccess(true);
        refresh();
        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#b91c1c', '#15803d', '#d97706', '#0284c7'],
          });
        } catch {
          // ignore if canvas not supported
        }
      } else {
        setErrorMessage(result.message);
      }
    }, 450);
  };

  const candidateKeys: CandidateChoice[] = ['abdeldayem', 'other', 'undecided'];
  const priorityKeys: PriorityType[] = ['roads', 'water', 'education', 'health', 'employment', 'agriculture'];
  const regionKeys: RegionType[] = ['taounate_city', 'village_douar', 'commune_center', 'other_provincial', 'prefer_not_to_say'];

  return (
    <div className="space-y-10 py-6 sm:py-10 max-w-4xl mx-auto">
      
      {/* Title & Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold border border-red-200">
          <Vote className="w-4 h-4 text-red-700" />
          <span>استمارة المشاركة المواطنة</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          شارك في الاستطلاع
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          عبر عن رأيك واختياراتك بكل حرية وشفافية في هذا الاستطلاع التجريبي الموجه لإقليم تاونات.
        </p>
      </div>

      {/* Mandatory Top Disclaimer for Vote Page */}
      <div 
        id="vote-top-disclaimer" 
        className="rounded-2xl bg-amber-500/10 border-2 border-amber-400 p-4 text-center text-amber-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs"
      >
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
        <span>هذا استطلاع رأي تجريبي وغير رسمي، ولا يمثل النتائج الرسمية لأي انتخابات.</span>
      </div>

      {/* If already voted or just voted */}
      {(userVoted || submissionSuccess) ? (
        <div className="bg-white rounded-3xl border border-emerald-200 p-8 sm:p-12 shadow-lg space-y-6 text-center animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              شكراً لمشاركتك في الاستطلاع التجريبي.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto">
              تم تسجيل تصويتك بنجاح وبشكل مجهول الهوية بالكامل. صوتك ساهم في تحديث نسب وتوزيعات الاستطلاع المباشرة.
            </p>
          </div>

          {/* Submitted details summary */}
          {userVoteData && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-lg mx-auto text-right space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center justify-between">
                <span>ملخص مشاركتك المسجلة:</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                  تم التوثيق
                </span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                  <span className="text-slate-400 block mb-1">المرشح التجريبي:</span>
                  <span className="font-bold text-slate-900">
                    {CANDIDATES_INFO[userVoteData.candidate]?.name}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                  <span className="text-slate-400 block mb-1">الأولوية الأولى:</span>
                  <span className="font-bold text-slate-900">
                    {PRIORITIES_INFO[userVoteData.priority]?.title}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                  <span className="text-slate-400 block mb-1">المنطقة:</span>
                  <span className="font-bold text-slate-900">
                    {REGIONS_INFO[userVoteData.region]?.label}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              id="view-results-after-vote"
              onClick={() => onNavigate('results')}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white font-bold text-sm shadow-md hover:shadow-lg flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <PieChart className="w-4 h-4 text-amber-300" />
              <span>شاهد نتائج وتفاصيل الاستطلاع</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              id="reset-my-vote-btn"
              onClick={() => {
                resetMyVote();
                setSubmissionSuccess(false);
              }}
              className="px-5 py-3.5 rounded-2xl bg-white border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>إعادة التصويت وتغيير الخيارات (للتجربة)</span>
            </button>
          </div>
        </div>
      ) : (
        /* Voting Form */
        <form onSubmit={handleSubmit} className="space-y-10">
          
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-sm flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Exploratory Info Hint Banner */}
          <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 leading-relaxed shadow-2xs">
            <HelpCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>تلميحات توضيحية:</strong> اضغط أو مرر الفأرة على أيقونة التلميح (<span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] mx-0.5">ℹ</span>) بجانب أي خيار للاطلاع على نبذة ملخصة وأهمية هذا الخيار لتطوير وتنمية إقليم تاونات.
            </span>
          </div>

          {/* Question 1: Candidate Choice */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-red-700 text-white font-black flex items-center justify-center text-sm">
                1
              </span>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">
                  من ستختار في هذا الاستطلاع التجريبي لتمثيل تاونات؟
                </h2>
                <p className="text-xs text-slate-500">
                  اختر خياراً واحداً يعبر عن توجهك ضمن هذا السيناريو التجريبي المحايد
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {candidateKeys.map((cKey) => {
                const info = CANDIDATES_INFO[cKey];
                const isSelected = candidate === cKey;
                return (
                  <label
                    key={cKey}
                    id={`candidate-opt-${cKey}`}
                    className={`relative cursor-pointer rounded-2xl border-2 p-5 transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-red-700 bg-red-50/40 shadow-md ring-2 ring-red-700/20'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="candidate"
                      value={cKey}
                      checked={isSelected}
                      onChange={() => setCandidate(cKey)}
                      className="sr-only"
                    />

                    <div>
                      <div className="flex items-center justify-between mb-3 gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                            cKey === 'abdeldayem' 
                              ? 'bg-red-100 text-red-800 border-red-200' 
                              : cKey === 'other'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                              : 'bg-slate-100 text-slate-800 border-slate-200'
                          }`}>
                            {cKey === 'abdeldayem' ? '🔴 حزب الاستقلال' : info.badge}
                          </span>
                          <InfoTooltip
                            title={info.name}
                            text={info.tooltipText}
                            importance={info.importance}
                          />
                        </div>
                        
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-red-700 bg-red-700 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                        {info.name}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {info.subtitle}
                      </p>
                    </div>

                    {cKey === 'abdeldayem' && (
                      <div className="mt-4 pt-3 border-t border-red-100 flex items-center gap-1.5 text-[11px] text-red-700 font-semibold">
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>الشخصية المحلية محور الاستطلاع</span>
                      </div>
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Question 2: Primary Priority */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-red-700 text-white font-black flex items-center justify-center text-sm">
                2
              </span>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">
                  ما الأولوية الأولى بالنسبة لك في تاونات؟
                </h2>
                <p className="text-xs text-slate-500">
                  حدد القضية الأكثر إلحاحاً التي ينبغي التركيز عليها والتعجيل بإصلاحها
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
              {priorityKeys.map((pKey) => {
                const info = PRIORITIES_INFO[pKey];
                const isSelected = priority === pKey;
                return (
                  <label
                    key={pKey}
                    id={`priority-opt-${pKey}`}
                    className={`cursor-pointer rounded-2xl border-2 p-4 transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'border-red-700 bg-red-50/40 shadow-sm ring-2 ring-red-700/20'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={pKey}
                      checked={isSelected}
                      onChange={() => setPriority(pKey)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 mt-0.5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-red-700 bg-red-700 text-white' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between gap-1.5">
                        <h3 className="text-sm font-bold text-slate-900 leading-snug">
                          {info.title}
                        </h3>
                        <InfoTooltip
                          title={info.title}
                          text={info.tooltipText}
                          importance={info.importance}
                        />
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {info.description}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Question 3: Geographic Region */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-red-700 text-white font-black flex items-center justify-center text-sm">
                3
              </span>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">
                  ما المنطقة التي تنتمي إليها؟
                </h2>
                <p className="text-xs text-slate-500">
                  لتحديد التوزيع الجغرافي للاحتياجات بدون أي جمع لبيانات شخصية
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {regionKeys.map((rKey) => {
                const info = REGIONS_INFO[rKey];
                const isSelected = region === rKey;
                return (
                  <label
                    key={rKey}
                    id={`region-opt-${rKey}`}
                    className={`cursor-pointer rounded-2xl border-2 p-3.5 transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'border-red-700 bg-red-50/40 shadow-sm ring-1 ring-red-700/20'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="region"
                      value={rKey}
                      checked={isSelected}
                      onChange={() => setRegion(rKey)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-red-700 bg-red-700 text-white' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div className="flex-1 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-sm font-bold text-slate-900 block leading-tight">
                          {info.label}
                        </span>
                        <span className="text-[11px] text-slate-500 block">
                          {info.subtext}
                        </span>
                      </div>
                      <InfoTooltip
                        title={info.label}
                        text={info.tooltipText}
                        importance={info.importance}
                      />
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Privacy Guarantee Note */}
          <div className="bg-slate-100/80 rounded-2xl p-4 border border-slate-200 flex items-center gap-3 text-xs text-slate-600">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <div>
              <strong className="text-slate-800">ضمان الخصوصية التامة:</strong> هذا الاستطلاع لا يطلب أبداً اسمك الكامل، ولا رقم هاتفك، ولا بطاقة التعريف الوطنية (CIN)، أو أي بيانات شخصية حساسة.
            </div>
          </div>

          {/* Big Submit Button */}
          <div className="pt-2 text-center">
            <button
              id="submit-vote-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-2/3 py-4 px-8 rounded-2xl bg-gradient-to-r from-red-700 via-red-800 to-red-700 hover:from-red-800 hover:to-red-900 text-white font-black text-lg shadow-xl shadow-red-900/25 hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 flex items-center justify-center gap-3 mx-auto"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>جارٍ تسجيل تصويتك التجريبي...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>إرسال التصويت</span>
                  <ArrowLeft className="w-5 h-5" />
                </>
              )}
            </button>
            <p className="text-xs text-slate-400 mt-2">
              بضغطك على إرسال التصويت، فأنت تشارك في محاكاة استطلاع رأي رقمي لأغراض دراسية وتجريبية.
            </p>
          </div>

        </form>
      )}

      {/* Bottom General Disclaimer */}
      <DisclaimerBanner compact={false} />

    </div>
  );
};
