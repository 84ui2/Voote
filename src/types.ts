export type CandidateChoice = 'abdeldayem' | 'other' | 'undecided';

export type PriorityType = 
  | 'roads' 
  | 'water' 
  | 'education' 
  | 'health' 
  | 'employment' 
  | 'agriculture';

export type RegionType = 
  | 'taounate_city' 
  | 'village_douar' 
  | 'commune_center' 
  | 'other_provincial' 
  | 'prefer_not_to_say';

export interface VoteRecord {
  id: string;
  timestamp: number; // unix ms
  candidate: CandidateChoice;
  priority: PriorityType;
  region: RegionType;
  voterToken?: string; // local client token to prevent accidental duplicate submits
}

export interface PollStats {
  totalVotes: number;
  lastVoteTime: number | null;
  candidateCounts: Record<CandidateChoice, number>;
  candidatePercentages: Record<CandidateChoice, number>;
  priorityCounts: Record<PriorityType, number>;
  priorityPercentages: Record<PriorityType, number>;
  regionCounts: Record<RegionType, number>;
  regionPercentages: Record<RegionType, number>;
  topPriority: PriorityType;
  participationTrend: { date: string; count: number }[];
}

export type TimeFilter = 'today' | '7days' | '30days' | 'all';
