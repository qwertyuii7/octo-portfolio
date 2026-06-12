import { useEffect, useState } from "react";
import { profile } from "../data/mockData";

export type LeetCodeStats = Readonly<{
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSubmissions: number;
}>;

type LeetCodeApiResponse = Readonly<{
  solvedProblem?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
  totalSubmissionNum?: readonly Readonly<{ difficulty: string; submissions: number }>[];
}>;

export function useLeetCodeStats() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const controller = new AbortController();

    async function syncStats() {
      try {
        const response = await fetch(
          `https://alfa-leetcode-api.onrender.com/${profile.leetcodeUsername}/solved`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("LeetCode sync failed");
        }

        const data = (await response.json()) as LeetCodeApiResponse;
        const totalSubmissions =
          data.totalSubmissionNum?.find((item) => item.difficulty === "All")?.submissions ?? 0;

        setStats({
          totalSolved: data.solvedProblem ?? 135,
          easySolved: data.easySolved ?? 49,
          mediumSolved: data.mediumSolved ?? 81,
          hardSolved: data.hardSolved ?? 5,
          totalSubmissions,
        });
        setStatus("ready");
      } catch (error) {
        if (!controller.signal.aborted) {
          setStats({
            totalSolved: 135,
            easySolved: 49,
            mediumSolved: 81,
            hardSolved: 5,
            totalSubmissions: 323,
          });
          setStatus("error");
        }
      }
    }

    syncStats();
    return () => controller.abort();
  }, []);

  return { stats, status } as const;
}
