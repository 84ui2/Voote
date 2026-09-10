import { useEffect, useState, useCallback } from 'react';
import { PollStats, TimeFilter, VoteRecord } from '../types';
import {
  calculateStats,
  getUserVote,
  getVotes,
  hasUserVoted,
  resetToSampleData,
  clearAllVotes,
  resetUserVoteStatus,
} from '../services/storageService';

export function usePoll(filter: TimeFilter = 'all') {
  const [votes, setVotes] = useState<VoteRecord[]>(() => getVotes());
  const [userVoted, setUserVoted] = useState<boolean>(() => hasUserVoted());
  const [userVoteData, setUserVoteData] = useState<VoteRecord | null>(() => getUserVote());
  const [stats, setStats] = useState<PollStats>(() => calculateStats(getVotes(), filter));

  const refresh = useCallback(() => {
    const freshVotes = getVotes();
    setVotes(freshVotes);
    setUserVoted(hasUserVoted());
    setUserVoteData(getUserVote());
    setStats(calculateStats(freshVotes, filter));
  }, [filter]);

  useEffect(() => {
    refresh();

    const handleUpdate = () => {
      refresh();
    };

    window.addEventListener('taounate_poll_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('taounate_poll_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [refresh]);

  return {
    votes,
    userVoted,
    userVoteData,
    stats,
    refresh,
    resetToSample: () => {
      resetToSampleData();
      refresh();
    },
    clearVotes: () => {
      clearAllVotes();
      refresh();
    },
    resetMyVote: () => {
      resetUserVoteStatus();
      refresh();
    },
  };
}
