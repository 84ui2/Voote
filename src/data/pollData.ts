import { CandidateChoice, PriorityType, RegionType, VoteRecord } from '../types';

export const CANDIDATES_INFO: Record<CandidateChoice, {
  id: CandidateChoice;
  name: string;
  subtitle: string;
  badge?: string;
  color: string;
  accent: string;
  tooltipText: string;
  importance: string;
}> = {
  abdeldayem: {
    id: 'abdeldayem',
    name: 'عبد الدايم الحدوشي',
    subtitle: 'حزب الاستقلال (ضمن سيناريو الاستطلاع التجريبي)',
    badge: 'حزب الاستقلال',
    color: '#b91c1c', // Moroccan Crimson Red
    accent: '#fee2e2',
    tooltipText: 'شخصية محلية مدرجة ضمن سيناريو الاستطلاع التجريبي لقياس مدى تجاوب وتأييد الساكنة.',
    importance: 'الترافع القوي داخل البرلمان والمؤسسات الحكومية لتسريع إنجاز المشاريع الإنمائية الكبرى بتاونات.',
  },
  other: {
    id: 'other',
    name: 'مرشح آخر',
    subtitle: 'خيار محايد للمشاركين في الاستطلاع التجريبي',
    badge: 'خيار بديل',
    color: '#15803d', // Moroccan Deep Green
    accent: '#dcfce7',
    tooltipText: 'خيار ديمقراطي محايد يتيح التعبير عن تأييد بدائل حزبية أخرى أو كفاءات مستقلة.',
    importance: 'تعزيز التعددية الحزبية والتنافس الإيجابي بين مختلف الفاعلين لخدمة الصالح العام للإقليم.',
  },
  undecided: {
    id: 'undecided',
    name: 'لم أحسم اختياري',
    subtitle: 'موقف غير محدد حالياً أو في انتظار المزيد من المعطيات',
    badge: 'في طور الحسم',
    color: '#64748b', // Slate Neutral
    accent: '#f1f5f9',
    tooltipText: 'موقف للمشاركين الذين يفضلون التريث والاطلاع على البرامج الانتخابية قبل حسم خيارهم.',
    importance: 'تنبيه الفاعلين إلى حجم الكتلة الناخبة التي تنتظر برامج ملموسة ومقنعة للنهوض بتاونات.',
  },
};

export const PRIORITIES_INFO: Record<PriorityType, {
  id: PriorityType;
  title: string;
  description: string;
  shortLabel: string;
  color: string;
  iconName: string;
  tooltipText: string;
  importance: string;
}> = {
  roads: {
    id: 'roads',
    title: 'إصلاح الطرق',
    shortLabel: 'الطرق والمسالك',
    description: 'تحسين وإصلاح الطرق الرئيسية والمسالك القروية وربط الدواوير بالمراكز.',
    color: '#b91c1c',
    iconName: 'Route',
    tooltipText: 'تعبيد الطرق الإقليمية والمسالك الجبلية الرابطة بين الدواوير والأسواق ومراكز الجماعات.',
    importance: 'فك العزلة الشتوية، إنقاذ الأرواح بتسريع الإسعاف، وخفض تكاليف نقل المنتجات الفلاحية والتنقل اليومي.',
  },
  water: {
    id: 'water',
    title: 'الماء الصالح للشرب',
    shortLabel: 'الماء الصالح للشرب',
    description: 'العمل على تحسين وتوسيع شبكات تزويد الساكنة بالماء الصالح للشرب، خصوصاً بالمناطق القروية.',
    color: '#0284c7',
    iconName: 'Droplets',
    tooltipText: 'تعميم شبكات الربط الفردي بالماء الصالح للشرب وبناء السدود التلية وحماية الفرشة المائية.',
    importance: 'القضاء على أزمة العطش صيفاً والاستفادة العادلة والمباشرة من ثروة سدود الإقليم مثل سد الوحدة.',
  },
  education: {
    id: 'education',
    title: 'إصلاح التعليم',
    shortLabel: 'التعليم والتأهيل',
    description: 'تحسين ظروف المؤسسات التعليمية، دعم التلاميذ، وتقوية البنية التحتية المدرسية.',
    color: '#d97706',
    iconName: 'GraduationCap',
    tooltipText: 'تأهيل المدارس القروية، تعميم المدارس الجماعاتية، وتوفير أسطول نقل مدرسي كافٍ ومجاني.',
    importance: 'القضاء على الهدر المدرسي وبخاصة لدى الفتيات القرويات، وبناء أجيال مؤهلة للمستقبل.',
  },
  health: {
    id: 'health',
    title: 'الصحة',
    shortLabel: 'الخدمات الصحية',
    description: 'تحسين الخدمات الصحية وتقريب العلاج من سكان المناطق القروية.',
    color: '#dc2626',
    iconName: 'HeartPulse',
    tooltipText: 'توفير الأطباء والمعدات الطبية بالمستشفى الإقليمي والمراكز الصحية القروية وتأمين سيارات الإسعاف.',
    importance: 'تقريب العلاج من الساكنة وإنهاء مشقة التنقل الاضطراري ومصاريف السفر نحو مستشفيات فاس.',
  },
  employment: {
    id: 'employment',
    title: 'التشغيل والتنمية',
    shortLabel: 'التشغيل والشباب',
    description: 'دعم فرص الشغل والمشاريع المحلية وتشجيع الشباب على الاستثمار.',
    color: '#15803d',
    iconName: 'Briefcase',
    tooltipText: 'إحداث مناطق للأنشطة الاقتصادية، دعم المقاولات الصغرى والتعاونيات، وتسهيل تمويل مشاريع الشباب.',
    importance: 'خلق فرص شغل كريمة ومستدامة داخل الإقليم للحد من هجرة الشباب نحو كبريات المدن.',
  },
  agriculture: {
    id: 'agriculture',
    title: 'الفلاحة',
    shortLabel: 'الفلاحة والتنمية القروية',
    description: 'دعم الفلاحين والاقتصاد القروي وتحسين البنية التحتية المرتبطة بالفلاحة.',
    color: '#166534',
    iconName: 'Tractor',
    tooltipText: 'تثمين سلاسل إنتاج الزيتون والتين، دعم الفلاحين الصغار لمواجهة الجفاف، وتحديث وسائل الري.',
    importance: 'حماية العمود الفقري للاقتصاد المحلي بتاونات ورفع المداخيل المعيشية لآلاف الأسر الفلاحية.',
  },
};

export const REGIONS_INFO: Record<RegionType, {
  id: RegionType;
  label: string;
  subtext: string;
  tooltipText: string;
  importance: string;
}> = {
  taounate_city: {
    id: 'taounate_city',
    label: 'مدينة تاونات',
    subtext: 'المجال الحضري للمدينة ومحيطه المباشر',
    tooltipText: 'المركز الحضري والإداري الرئيسي لإقليم تاونات.',
    importance: 'رصد متطلبات التأهيل الحضري، المرافق الثقافية والرياضية، وتطوير الخدمات الإدارية والتجارية.',
  },
  village_douar: {
    id: 'village_douar',
    label: 'قرية / دوار',
    subtext: 'الدواوير والقرى الجبلية والسهلية بإقليم تاونات',
    tooltipText: 'القرى والدواوير الجبلية والسهلية الممتدة عبر تراب الإقليم.',
    importance: 'توجيه البرامج نحو فك العزلة بالمسالك وتوفير الماء الصالح للشرب والخدمات الأساسية للدواوير.',
  },
  commune_center: {
    id: 'commune_center',
    label: 'مركز جماعة',
    subtext: 'مراكز الجماعات الترابية والبلدات التابعة للإقليم',
    tooltipText: 'مراكز الجماعات الترابية والبلدات التي تشكل نقاط التقاء وخدمات للقرى المجاورة.',
    importance: 'تأهيل الأسواق الأسبوعية والمراكز الصحية والخدمات الإدارية القريبة لتعزيز جاذبية الاستقرار.',
  },
  other_provincial: {
    id: 'other_provincial',
    label: 'منطقة أخرى داخل الإقليم',
    subtext: 'مناطق وجماعات أخرى بالإقليم',
    tooltipText: 'المناطق الحدودية والسهلية المتنوعة داخل النطاق الترابي للإقليم.',
    importance: 'ضمان عدالة مجالية تشمل كافة تراب تاونات دون إغفال أي منطقة أو جماعة ترابية.',
  },
  prefer_not_to_say: {
    id: 'prefer_not_to_say',
    label: 'أفضل عدم الإجابة',
    subtext: 'مشاركة عامة بدون تحديد الانتماء الجغرافي',
    tooltipText: 'مشاركة مواطنة حرة دون تحديد الموقع الجغرافي.',
    importance: 'احترام السرية التامة وتشجيع الجميع على التعبير عن أولوياتهم بكل أريحية وثقة.',
  },
};

export const SLOGANS_DATA = [
  {
    text: 'طريق أفضل... حياة أفضل',
    category: 'البنية التحتية',
    highlight: 'الطرقات وفك العزلة',
  },
  {
    text: 'الماء حق للجميع',
    category: 'الماء الصالح للشرب',
    highlight: 'الربط المائي المستدام',
  },
  {
    text: 'تعليم قوي... مستقبل أفضل',
    category: 'التربية والتكوين',
    highlight: 'أجيال الغد بتاونات',
  },
  {
    text: 'تاونات تستحق التنمية',
    category: 'التنمية الشاملة',
    highlight: 'مشاريع حقيقية وواعدة',
  },
  {
    text: 'معاً من أجل قرى ومراكز أفضل',
    category: 'العدالة المجالية',
    highlight: 'تكامل الحواضر والقرى',
  },
  {
    text: 'صوتك يصنع الفرق',
    category: 'المشاركة المواطنة',
    highlight: 'التعبير الديمقراطي الحر',
  },
];

export const PARTY_INFO = {
  name: 'حزب الاستقلال',
  foundingYear: 1944,
  description: 'حزب سياسي مغربي تاريخي تأسس سنة 1944، ويشارك في الحياة السياسية والانتخابية المغربية.',
  visionTitle: 'من أجل تاونات',
  prioritiesPillars: 'إصلاح الطريق • الماء الصالح للشرب • التعليم • الصحة • التشغيل • التنمية القروية',
};

// Realistic initial sample votes generated with dates across the past 14 days
export const INITIAL_SAMPLE_VOTES: VoteRecord[] = [
  // Distribution roughly: Abdeldayem ~42%, Other ~31%, Undecided ~27%
  // Road & Water leading priorities, diverse regions
  ...Array.from({ length: 42 }, (_, i) => ({
    id: `vote-init-ad-${i + 1}`,
    timestamp: Date.now() - (i * 2800000) - 86400000 * (i % 8),
    candidate: 'abdeldayem' as CandidateChoice,
    priority: (['roads', 'water', 'health', 'agriculture', 'education', 'employment'][i % 6]) as PriorityType,
    region: (['village_douar', 'taounate_city', 'commune_center', 'other_provincial'][i % 4]) as RegionType,
  })),
  ...Array.from({ length: 31 }, (_, i) => ({
    id: `vote-init-ot-${i + 1}`,
    timestamp: Date.now() - (i * 3600000) - 86400000 * (i % 9),
    candidate: 'other' as CandidateChoice,
    priority: (['roads', 'water', 'employment', 'education', 'health'][i % 5]) as PriorityType,
    region: (['commune_center', 'village_douar', 'taounate_city', 'prefer_not_to_say'][i % 4]) as RegionType,
  })),
  ...Array.from({ length: 27 }, (_, i) => ({
    id: `vote-init-un-${i + 1}`,
    timestamp: Date.now() - (i * 4200000) - 86400000 * (i % 10),
    candidate: 'undecided' as CandidateChoice,
    priority: (['water', 'roads', 'health', 'agriculture'][i % 4]) as PriorityType,
    region: (['village_douar', 'taounate_city', 'prefer_not_to_say', 'other_provincial'][i % 4]) as RegionType,
  })),
];
