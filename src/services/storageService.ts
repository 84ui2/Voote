import { CandidateChoice, PollStats, PriorityType, RegionType, TimeFilter, VoteRecord } from '../types';
import { INITIAL_SAMPLE_VOTES } from '../data/pollData';

const STORAGE_KEY_VOTES = 'taounate_poll_votes_v2';
const STORAGE_KEY_VOTER_TOKEN = 'taounate_voter_device_token';
const STORAGE_KEY_USER_SUBMISSION = 'taounate_user_submission_data';

// Helper to get or create unique voter token
export function getOrCreateVoterToken(): string {
  let token = localStorage.getItem(STORAGE_KEY_VOTER_TOKEN);
  if (!token) {
    token = 'voter_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
    localStorage.setItem(STORAGE_KEY_VOTER_TOKEN, token);
  }
  return token;
}

// Retrieve votes list from storage
export function getVotes(): VoteRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_VOTES);
    if (!raw) {
      // Seed with initial sample votes
      localStorage.setItem(STORAGE_KEY_VOTES, JSON.stringify(INITIAL_SAMPLE_VOTES));
      return INITIAL_SAMPLE_VOTES;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error loading votes from storage:', err);
    return INITIAL_SAMPLE_VOTES;
  }
}

// Save votes list to storage and notify listeners
function saveVotes(votes: VoteRecord[]) {
  localStorage.setItem(STORAGE_KEY_VOTES, JSON.stringify(votes));
  window.dispatchEvent(new CustomEvent('taounate_poll_updated'));
}

// Check if current user/device has already cast a vote
export function hasUserVoted(): boolean {
  const submission = localStorage.getItem(STORAGE_KEY_USER_SUBMISSION);
  if (!submission) return false;
  try {
    const parsed = JSON.parse(submission);
    return Boolean(parsed && parsed.timestamp);
  } catch {
    return false;
  }
}

// Get the user's previously cast vote
export function getUserVote(): VoteRecord | null {
  const submission = localStorage.getItem(STORAGE_KEY_USER_SUBMISSION);
  if (!submission) return null;
  try {
    return JSON.parse(submission) as VoteRecord;
  } catch {
    return null;
  }
}

// Submit a new vote (prevents duplicate submissions)
export function castVote(
  candidate: CandidateChoice,
  priority: PriorityType,
  region: RegionType,
  forceOverride: boolean = false
): { success: boolean; message: string; vote?: VoteRecord } {
  if (!forceOverride && hasUserVoted()) {
    return {
      success: false,
      message: 'لقد قمت بالمشاركة مسبقاً في هذا الاستطلاع التجريبي من هذا الجهاز.',
    };
  }

  const token = getOrCreateVoterToken();
  const newVote: VoteRecord = {
    id: `vote_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestamp: Date.now(),
    candidate,
    priority,
    region,
    voterToken: token,
  };

  const currentVotes = getVotes();
  currentVotes.unshift(newVote);
  saveVotes(currentVotes);

  // Store user's submission locally
  localStorage.setItem(STORAGE_KEY_USER_SUBMISSION, JSON.stringify(newVote));

  return {
    success: true,
    message: 'شكراً لمشاركتك في الاستطلاع التجريبي.',
    vote: newVote,
  };
}

// Filter votes based on time range
export function filterVotesByTime(votes: VoteRecord[], filter: TimeFilter): VoteRecord[] {
  const now = Date.now();
  switch (filter) {
    case 'today': {
      const oneDayAgo = now - 24 * 60 * 60 * 1000;
      return votes.filter((v) => v.timestamp >= oneDayAgo);
    }
    case '7days': {
      const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
      return votes.filter((v) => v.timestamp >= sevenDaysAgo);
    }
    case '30days': {
      const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
      return votes.filter((v) => v.timestamp >= thirtyDaysAgo);
    }
    case 'all':
    default:
      return votes;
  }
}

// Calculate comprehensive statistics from a set of votes
export function calculateStats(votes: VoteRecord[], filter: TimeFilter = 'all'): PollStats {
  const filtered = filterVotesByTime(votes, filter);
  const totalVotes = filtered.length;

  const candidateCounts: Record<CandidateChoice, number> = {
    abdeldayem: 0,
    other: 0,
    undecided: 0,
  };

  const priorityCounts: Record<PriorityType, number> = {
    roads: 0,
    water: 0,
    education: 0,
    health: 0,
    employment: 0,
    agriculture: 0,
  };

  const regionCounts: Record<RegionType, number> = {
    taounate_city: 0,
    village_douar: 0,
    commune_center: 0,
    other_provincial: 0,
    prefer_not_to_say: 0,
  };

  let lastVoteTime: number | null = null;

  filtered.forEach((v) => {
    if (v.candidate in candidateCounts) candidateCounts[v.candidate]++;
    if (v.priority in priorityCounts) priorityCounts[v.priority]++;
    if (v.region in regionCounts) regionCounts[v.region]++;
    if (!lastVoteTime || v.timestamp > lastVoteTime) {
      lastVoteTime = v.timestamp;
    }
  });

  // Calculate percentages rounded to 1 decimal
  const candidatePercentages: Record<CandidateChoice, number> = {
    abdeldayem: totalVotes > 0 ? Math.round((candidateCounts.abdeldayem / totalVotes) * 1000) / 10 : 0,
    other: totalVotes > 0 ? Math.round((candidateCounts.other / totalVotes) * 1000) / 10 : 0,
    undecided: totalVotes > 0 ? Math.round((candidateCounts.undecided / totalVotes) * 1000) / 10 : 0,
  };

  const priorityPercentages: Record<PriorityType, number> = {
    roads: totalVotes > 0 ? Math.round((priorityCounts.roads / totalVotes) * 1000) / 10 : 0,
    water: totalVotes > 0 ? Math.round((priorityCounts.water / totalVotes) * 1000) / 10 : 0,
    education: totalVotes > 0 ? Math.round((priorityCounts.education / totalVotes) * 1000) / 10 : 0,
    health: totalVotes > 0 ? Math.round((priorityCounts.health / totalVotes) * 1000) / 10 : 0,
    employment: totalVotes > 0 ? Math.round((priorityCounts.employment / totalVotes) * 1000) / 10 : 0,
    agriculture: totalVotes > 0 ? Math.round((priorityCounts.agriculture / totalVotes) * 1000) / 10 : 0,
  };

  const regionPercentages: Record<RegionType, number> = {
    taounate_city: totalVotes > 0 ? Math.round((regionCounts.taounate_city / totalVotes) * 1000) / 10 : 0,
    village_douar: totalVotes > 0 ? Math.round((regionCounts.village_douar / totalVotes) * 1000) / 10 : 0,
    commune_center: totalVotes > 0 ? Math.round((regionCounts.commune_center / totalVotes) * 1000) / 10 : 0,
    other_provincial: totalVotes > 0 ? Math.round((regionCounts.other_provincial / totalVotes) * 1000) / 10 : 0,
    prefer_not_to_say: totalVotes > 0 ? Math.round((regionCounts.prefer_not_to_say / totalVotes) * 1000) / 10 : 0,
  };

  // Find top priority
  let topPriority: PriorityType = 'roads';
  let maxCount = -1;
  (Object.keys(priorityCounts) as PriorityType[]).forEach((p) => {
    if (priorityCounts[p] > maxCount) {
      maxCount = priorityCounts[p];
      topPriority = p;
    }
  });

  // Build participation trend (by date in Arabic formatted or YYYY-MM-DD)
  const dateMap: Record<string, number> = {};
  filtered.forEach((v) => {
    const d = new Date(v.timestamp);
    const key = `${d.getMonth() + 1}/${d.getDate()}`;
    dateMap[key] = (dateMap[key] || 0) + 1;
  });

  const participationTrend = Object.entries(dateMap).map(([date, count]) => ({
    date,
    count,
  })).slice(-10);

  return {
    totalVotes,
    lastVoteTime,
    candidateCounts,
    candidatePercentages,
    priorityCounts,
    priorityPercentages,
    regionCounts,
    regionPercentages,
    topPriority,
    participationTrend: participationTrend.length > 0 ? participationTrend : [{ date: 'اليوم', count: totalVotes }],
  };
}

// Reset votes to the initial realistic sample dataset
export function resetToSampleData(): void {
  saveVotes(INITIAL_SAMPLE_VOTES);
  localStorage.removeItem(STORAGE_KEY_USER_SUBMISSION);
}

// Clear all votes to 0
export function clearAllVotes(): void {
  saveVotes([]);
  localStorage.removeItem(STORAGE_KEY_USER_SUBMISSION);
}

// Reset only current user vote state (allows user to re-test voting flow)
export function resetUserVoteStatus(): void {
  localStorage.removeItem(STORAGE_KEY_USER_SUBMISSION);
  window.dispatchEvent(new CustomEvent('taounate_poll_updated'));
}

// Export raw votes to CSV formatted with UTF-8 BOM for Microsoft Excel / Arabic support
export function exportVotesToCSV(votes: VoteRecord[]): void {
  const candidateNames: Record<CandidateChoice, string> = {
    abdeldayem: 'عبد الدايم الحدوشي (حزب الاستقلال)',
    other: 'مرشح آخر',
    undecided: 'لم أحسم اختياري',
  };

  const priorityNames: Record<PriorityType, string> = {
    roads: 'إصلاح الطرق',
    water: 'الماء الصالح للشرب',
    education: 'إصلاح التعليم',
    health: 'الصحة',
    employment: 'التشغيل والتنمية',
    agriculture: 'الفلاحة',
  };

  const regionNames: Record<RegionType, string> = {
    taounate_city: 'مدينة تاونات',
    village_douar: 'قرية / دوار',
    commune_center: 'مركز جماعة',
    other_provincial: 'منطقة أخرى داخل الإقليم',
    prefer_not_to_say: 'أفضل عدم الإجابة',
  };

  const headers = ['المعرف', 'التاريخ والوقت', 'خيار المرشح التجريبي', 'الأولوية الأولى', 'المنطقة'];
  const rows = votes.map((v) => [
    v.id,
    new Date(v.timestamp).toLocaleString('ar-MA'),
    candidateNames[v.candidate] || v.candidate,
    priorityNames[v.priority] || v.priority,
    regionNames[v.region] || v.region,
  ]);

  const csvContent = '\uFEFF' + [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `taounate_poll_results_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
