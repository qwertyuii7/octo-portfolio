import { useState, useEffect, useRef, useCallback } from 'react';

export interface LiveStats {
  github: {
    publicRepos: string | number;
    profileSince: string;
    recentPush: string;
  } | null;
  leetcode: {
    totalSolved: number;
    easy: number;
    easyPct: number;
    medium: number;
    mediumPct: number;
    hard: number;
    hardPct: number;
  } | null;
}

export function useLiveStats(githubUsername: string, leetcodeUsername: string) {
  const [stats, setStats] = useState<LiveStats>({ github: null, leetcode: null });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Keep track of mounted state across async polling requests
  const isMountedRef = useRef(true);

  const fetchStats = useCallback(async () => {
    try {
      // Append a timestamp parameter and use no-store to bypass browser caching
      // Fetch both profile AND actual repositories list in parallel to guarantee real-time accuracy
      const timestamp = Date.now();
      const [ghUserRes, ghReposRes, lcRes] = await Promise.all([
        fetch(`https://api.github.com/users/${githubUsername}?_t=${timestamp}`, { cache: 'no-store' }).catch(() => null),
        fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated&_t=${timestamp}`, { cache: 'no-store' }).catch(() => null),
        fetch(`https://leetcode-stats-api.herokuapp.com/${leetcodeUsername}?_t=${timestamp}`, { cache: 'no-store' }).catch(() => null)
      ]);

      const ghUserData = (ghUserRes && ghUserRes.ok) ? await ghUserRes.json() : null;
      const ghReposData = (ghReposRes && ghReposRes.ok) ? await ghReposRes.json() : null;
      const lcData = (lcRes && lcRes.ok) ? await lcRes.json() : null;

      if (isMountedRef.current) {
        let newGithub: LiveStats['github'] = null;
        let newLeetcode: LiveStats['leetcode'] = null;

        // Process GitHub Data
        if (ghUserData || Array.isArray(ghReposData)) {
          // Calculate real-time repo count: take the maximum of user profile public_repos and actual fetched repos list length
          let reposCount = 0;
          if (Array.isArray(ghReposData)) {
            reposCount = ghReposData.length;
          }
          if (ghUserData && typeof ghUserData.public_repos === 'number') {
            reposCount = Math.max(reposCount, ghUserData.public_repos);
          }

          // Determine profile creation year
          const sinceYear = ghUserData?.created_at ? new Date(ghUserData.created_at).getFullYear() : 2024;

          // Determine most recent push/update date
          const recentDateStr = (Array.isArray(ghReposData) && ghReposData[0]?.updated_at)
            ? ghReposData[0].updated_at
            : (ghUserData?.updated_at || new Date().toISOString());
          const recentDate = new Date(recentDateStr);
          const recentMonth = recentDate.toLocaleString('default', { month: 'short' });
          const recentYear = recentDate.getFullYear();

          if (reposCount > 0) {
            newGithub = {
              publicRepos: reposCount,
              profileSince: sinceYear.toString(),
              recentPush: `${recentMonth} ${recentYear}`,
            };
          }
        }

        // Process LeetCode Data
        if (lcData && lcData.status === "success") {
          const total = lcData.totalSolved;
          const easy = lcData.easySolved;
          const medium = lcData.mediumSolved;
          const hard = lcData.hardSolved;

          const safeTotal = total > 0 ? total : 1;

          newLeetcode = {
            totalSolved: total,
            easy: easy,
            easyPct: Math.round((easy / safeTotal) * 100),
            medium: medium,
            mediumPct: Math.round((medium / safeTotal) * 100),
            hard: hard,
            hardPct: Math.round((hard / safeTotal) * 100),
          };
        }

        // Preserve previous valid stats if a polling request temporarily fails or gets rate-limited
        setStats((prev) => ({
          github: newGithub || prev.github,
          leetcode: newLeetcode || prev.leetcode,
        }));
        setIsLoading(false);
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError(err instanceof Error ? err : new Error('Failed to fetch live stats'));
        setIsLoading(false);
      }
    }
  }, [githubUsername, leetcodeUsername]);

  useEffect(() => {
    isMountedRef.current = true;

    // Initial fetch
    fetchStats();

    // Set up real-time continuous polling every 15 seconds
    const intervalId = setInterval(fetchStats, 15000);

    // Also update immediately when the user switches back to this browser tab or window focus
    const handleFocus = () => {
      fetchStats();
    };
    window.addEventListener('focus', handleFocus);
    window.addEventListener('online', handleFocus);

    return () => {
      isMountedRef.current = false;
      clearInterval(intervalId);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('online', handleFocus);
    };
  }, [fetchStats]);

  return { stats, isLoading, error };
}
