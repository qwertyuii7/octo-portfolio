import { useState, useEffect } from 'react';

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

  useEffect(() => {
    let isMounted = true;
    
    async function fetchStats() {
      try {
        // Fetch GitHub
        // We use the basic user API which provides public_repos and dates
        const ghRes = await fetch(`https://api.github.com/users/${githubUsername}`);
        const ghData = ghRes.ok ? await ghRes.json() : null;

        // Fetch LeetCode using a popular community proxy API
        const lcRes = await fetch(`https://leetcode-stats-api.herokuapp.com/${leetcodeUsername}`);
        const lcData = lcRes.ok ? await lcRes.json() : null;

        if (isMounted) {
          const newStats: LiveStats = { github: null, leetcode: null };
          
          // Process GitHub Data
          if (ghData) {
            const sinceYear = new Date(ghData.created_at).getFullYear();
            const recentDate = new Date(ghData.updated_at);
            const recentMonth = recentDate.toLocaleString('default', { month: 'short' });
            const recentYear = recentDate.getFullYear();
            
            newStats.github = {
              publicRepos: ghData.public_repos,
              profileSince: sinceYear.toString(),
              recentPush: `${recentMonth} ${recentYear}`,
            };
          }
          
          // Process LeetCode Data
          if (lcData && lcData.status === "success") {
            const total = lcData.totalSolved;
            const easy = lcData.easySolved;
            const medium = lcData.mediumSolved;
            const hard = lcData.hardSolved;
            
            // Calculate percentages relative to total solved (like the mock data)
            const safeTotal = total > 0 ? total : 1; 
            
            newStats.leetcode = {
              totalSolved: total,
              easy: easy,
              easyPct: Math.round((easy / safeTotal) * 100),
              medium: medium,
              mediumPct: Math.round((medium / safeTotal) * 100),
              hard: hard,
              hardPct: Math.round((hard / safeTotal) * 100),
            };
          }
          
          setStats(newStats);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch live stats'));
          setIsLoading(false);
        }
      }
    }

    fetchStats();
    return () => { isMounted = false; };
  }, [githubUsername, leetcodeUsername]);

  return { stats, isLoading, error };
}
