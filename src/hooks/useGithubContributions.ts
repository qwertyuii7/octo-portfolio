import { useEffect, useMemo, useState } from "react";
import { profile } from "../data/mockData";

export type ContributionDay = Readonly<{
  date: string;
  count: number;
  level: number;
}>;

type ContributionApiResponse = Readonly<{
  total?: Readonly<{ lastYear?: number }>;
  contributions?: readonly ContributionDay[];
}>;

const fallbackDays: readonly ContributionDay[] = Array.from({ length: 371 }, (_, index) => ({
  date: "",
  count: 0,
  level: index % 17 === 0 ? 1 : 0,
}));

export function useGithubContributions() {
  const [days, setDays] = useState<readonly ContributionDay[]>(fallbackDays);
  const [total, setTotal] = useState(412);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const controller = new AbortController();

    async function syncContributions() {
      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${profile.githubUsername}?y=last`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("GitHub contribution sync failed");
        }

        const data = (await response.json()) as ContributionApiResponse;
        if (!data.contributions?.length) {
          throw new Error("GitHub contribution payload was empty");
        }

        setDays(data.contributions);
        setTotal(data.total?.lastYear ?? data.contributions.reduce((sum, day) => sum + day.count, 0));
        setStatus("ready");
      } catch (error) {
        if (!controller.signal.aborted) {
          setStatus("error");
        }
      }
    }

    syncContributions();
    return () => controller.abort();
  }, []);

  const stats = useMemo(() => {
    const activeDays = days.filter((day) => day.count > 0).length;
    const bestDay = days.reduce((best, day) => (day.count > best.count ? day : best), days[0]);

    return { activeDays, bestDay, total } as const;
  }, [days, total]);

  return { days, stats, status } as const;
}
